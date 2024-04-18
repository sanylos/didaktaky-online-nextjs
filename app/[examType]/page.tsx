import Link from "next/link"
import Image from "next/image"

export const getContent = async (examType: string) => {
  const res = require('./content.json')
  return res[examType];
}

const ExamPage = async ({ params }: { params: { examType: string } }) => {
  const page = await getContent(params.examType);
  console.log(page);
  return (
    <div className="">
      <div className="main-title pb-5 ms-5 me-5 mt-3" style={{ position: "absolute" }}>
        <div>
          <h1 className="fw-bold text-blue-2">{page.title}</h1>
          <hr className="text-blue-1 w-auto" />
          <h2>{page.description}</h2>
        </div>
      </div>
    </div>
  )
}

export default ExamPage