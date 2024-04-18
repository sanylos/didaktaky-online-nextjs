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
    <div className="d-flex flex-column main align-items-center">

      <section className="shadow-lg w-100">
        <div className="d-flex flex-column justify-content-center mobileImageWrapper"
          style={{ height: "100vh", position: "relative" }}>
          <div className="main-title" style={{ position: "absolute" }}>
            <div>
              <h1 className="fw-bold">{page.title}</h1>
              <h2>{page.description}</h2>
            </div>
            <div className="d-flex flex-row justify-content-start">
              <Link href="/procvicovani" className="btn btn-dark shadow-lg rounded-5 my-3 mx-1 p-2">Začít procvičovat</Link>
              <a className="btn btn-dark shadow-lg rounded-5 my-3 mx-1 p-2 w-auto px-3" href="#about">fsdfsdf</a>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "10vh" }}
            className="container-fluid d-flex align-items-center justify-content-start">
            <div className="mx-5" v-if="answeredExerciseCount">
              <span className="fs-1 fw-bold">fsdfsdf</span><span className="fs-6"> vyplněných cvičení</span>
            </div>
            <div className="mx-5" v-if="submittedTestCount">
              <span className="fs-1 fw-bold">fsdfsdf</span><span className="fs-6"> vyplněných testů</span>
            </div>
          </div>
        </div>
      </section>
    </div >
  )
}

export default ExamPage