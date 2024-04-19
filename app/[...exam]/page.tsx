import Link from "next/link"
import Image from "next/image"

export const getContent = async (exam: string) => {
  const res = require('./content.json')
  //console.log("res" + res[exam[0]][exam[1]])
  if (exam.length == 2) {
    return res[exam[0]][exam[1]];
  }
  if (exam.length == 1) {
    return res[exam[0]]
  }
}

const ExamPage = async ({ params }: { params: { examType: string } }) => {
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
  console.log(page)
  return (
    <div className="">
      <div className="main-title pb-5 ms-5 me-5 mt-3">
        <div>
          <h1 className="fw-bold text-blue-2">{page.title}</h1>
          <hr className="text-blue-1 w-auto" />
          <h2 className="fs-4">{page.description}</h2>
        </div>

        <div className="mt-5">
          {page.articles?.map((article: Article) => (
            <div key={article.title} className="">
              <h2 className="fw-bold text-blue-2">{article.title}</h2>
              <hr className="text-blue-1 w-auto mt-0" />
              <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
            </div>
          ))}
        </div>


        {page.faq?.map((question: Question, index: number) => (
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
    </div >
  )
}

export default ExamPage