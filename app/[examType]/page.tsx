import Link from "next/link"
import Image from "next/image"

export const getContent = async (examType: string) => {
  const res = require('./content.json')
  return res[examType];
}

const ExamPage = async ({ params }: { params: { examType: string } }) => {
  interface Article {
    title: string,
    content: string
  }
  const page = await getContent(params.examType);
  console.log(page);
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
      </div>
    </div>
  )
}

export default ExamPage