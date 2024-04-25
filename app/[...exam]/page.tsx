import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = require('./content.json')
  const staticParams = [];

  for (const key in res) {
    if (Object.prototype.hasOwnProperty.call(res, key)) {
      const keys = Object.keys(res[key]).filter(subKey => subKey !== 'content');
      staticParams.push({
        [key]: keys
      });
    }
  }

  console.log(staticParams);
  return staticParams;
}

export async function generateMetadata({ params }: { params: { exam: string[] } }) {
  const data = await getContent(params.exam)
  if (!data) return null;
  return {
    title: data.content.title,
    description: data.content.description,
    openGraph: {
      title: data.content.title,
      description: data.content.description
    }
  }
}

export const getContent = async (exam: string[]) => {
  const res = require('./content.json')
  //console.log("res" + res[exam[0]][exam[1]])
  if (exam.length == 2) {
    return res[exam[0]][exam[1]];
  }
  if (exam.length == 1) {
    return res[exam[0]]
  }
  notFound();
}

const ExamPage = async ({ params }: { params: { exam: string[] } }) => {
  //console.log(params.exam)
  interface Article {
    title: string,
    content: string
  }
  interface Question {
    question: string,
    answer: string
  }
  const page = await getContent(params.exam);
  //console.log(page)
  return (
    <div className="">
      {page ?
        <div className="main-title pb-5 container mt-3">
          <div>
            <h1 className="fw-bold text-blue-2">{page.content.title}</h1>
            <hr className="text-blue-1 w-auto" />
            <h2 className="fs-4">{page.content.description}</h2>
          </div>

          <div className="mt-5">
            {page.content.articles?.map((article: Article) => (
              <div key={article.content} className="">
                <h2 className="fw-bold text-blue-2">{article.title}</h2>
                <hr className="text-blue-1 w-auto mt-0" />
                <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
              </div>
            ))}
          </div>


          {page.content.faq?.map((question: Question, index: number) => (
            <div key={index} className="accordion mb-1" id={'accordion' + index}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse' + index} aria-expanded="true" aria-controls={'collapse' + question.id}>
                    <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
                  </button>
                </h2>
                <div id={'collapse' + index} className="accordion-collapse collapse" data-bs-parent="#accordionQuestions">
                  <div className="accordion-body">
                    <p dangerouslySetInnerHTML={{ __html: question.answer }}></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div >
        : "Omouváme se, ale tato část je teprve ve vývoji."}
    </div >
  )
}

export default ExamPage