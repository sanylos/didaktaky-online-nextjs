//@ts-nocheck
import { validateAnswer } from '../utils/answerValidation'
import './Exercise.scss'
import DOMPurify from 'dompurify'
const Exercise = ({ exercise, answer, handleAnswer, isAnswered }) => {

    return (
        <div className="container">
            <h1>Exercise component OK</h1>
            <div className="d-flex flex-column align-items-center">
                { //TEXT 1 IMAGE
                    exercise.text1imgPath &&
                    <div className="d-flex flex-column">
                        <span className="fw-bold">TEXT 1</span>
                        <img alt="TEXT1" src={"https://oggvmfflkusznxpohazs.supabase.co/storage/v1/object/public/exercise-texts/" + exercise.text1imgPath + ".PNG"} />
                    </div>
                }
                { //TEXT 2 IMAGE
                    exercise.text2imgPath &&
                    <div className="d-flex flex-column">
                        <span className="fw-bold">TEXT 2</span>
                        <img alt="TEXT2" src={"https://oggvmfflkusznxpohazs.supabase.co/storage/v1/object/public/exercise-texts/" + exercise.text2imgPath + ".PNG"} />
                    </div>
                }
            </div>
            {
                exercise.points && <div className='d-flex justify-content-end'>
                    <span className={'fw-bold rounded p-1 '
                        + (isAnswered && (validateAnswer(exercise, answer) == exercise.points ? "bg-success" : "bg-danger"))
                    }>
                        {
                            isAnswered && <span>
                                {validateAnswer(exercise, answer)} /
                            </span>
                        }
                        {
                            isAnswered ?
                                <span> {exercise.points}{exercise.points == 1 ? " bodu" : " bodů"}</span> : <span> {exercise.points}{exercise.points == 1 ? " bod" : " body"}</span>
                        }
                    </span>
                </div>
            }

            {
                exercise.claims && <div>
                    {exercise.claims.map((claim, index) => (
                        <div key={index}>
                            <span className="fw-bold">Tvrzení č. {index + 1}: </span><span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(claim) }}></span>
                        </div>
                    ))}
                </div>
            }
            {
                exercise.title && <div>
                    <span className="fw-bold" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exercise.title) }}></span>
                </div>
            }
            {
                exercise.description && <div>
                    (<span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exercise.description) }}></span>)
                </div>
            }

            {
                exercise.type == "Výběr z možností" &&
                <div>
                    {exercise.answers.map((option, index) => (
                        <div key={index}>
                            <input className="btn-check"
                                id={"option" + index}
                                type="radio"
                                name="exerciseOptions"
                                value={index}
                                onChange={(e) => handleAnswer(0, e.target.value)}
                            />
                            <label className={"btn text-start fw-normal mb-1 "
                                + (isAnswered && index == exercise.correct_answer[0] ? "bg-success" : "")
                                + ((isAnswered && index == answer[0] && index != exercise.correct_answer[0]) ? "bg-danger" : "")
                            }
                                htmlFor={"option" + index}
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option) }}
                            />
                        </div>
                    ))}
                </div>
            }
            {
                exercise.type == "Výběr mezi ANO/NE" && <div>
                    <div className="row text-center">
                        <div className="col-10"></div>
                        <div className="col-1">ANO</div>
                        <div className="col-1">NE</div>
                    </div>
                    <div>
                        {exercise.answers.map((option, index) => (
                            <div key={index}
                                className={"row align-items-center mb-1 rounded "
                                    + (isAnswered && answer[index] == exercise.correct_answer[index] ? "bg-success" : "")
                                    + ((isAnswered && answer[index] != exercise.correct_answer[index]) ? "bg-danger" : "")
                                }>
                                <p className="col-10" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option) }}></p>
                                <input type="radio"
                                    className="col radio-anone"
                                    name={"input" + index}
                                    id={"input" + index}
                                    value="ANO"
                                    onChange={(e) => handleAnswer(index, e.target.value)}
                                    disabled={isAnswered}
                                />
                                <input type="radio"
                                    className="col radio-anone"
                                    name={"input" + index}
                                    id={"input" + index}
                                    value="NE"
                                    onChange={(e) => handleAnswer(index, e.target.value)}
                                    disabled={isAnswered}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }
            {
                exercise.type == "Přiřazení" && <div>
                    {exercise.answers.map((option, index) => (
                        <div key={index}
                            className={"d-flex flex-row align-content-start justify-content-between "
                                + (isAnswered && answer[index] == exercise.correct_answer[index] ? "bg-success" : "")
                                + ((isAnswered && answer[index] != exercise.correct_answer[index]) ? "bg-danger" : "")
                            }>
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option) }}></span>
                            <input type="text"
                                style={{ width: 30 }}
                                className="text-center"
                                value={answer[index]}
                                onChange={(e) => handleAnswer(index, e.target.value.toUpperCase())}
                                maxLength="1"
                            />
                        </div>
                    ))}
                    {exercise.sentences.map((sentence, index) => (
                        <div key={index}>
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sentence) }}></span>
                        </div>
                    ))}
                </div>
            }
            {
                exercise.type == "Více textových odpovědí" && <div>
                    {exercise.answers.map((option, index) => (
                        <div key={index}
                            className={"d-flex flex-column justify-content-between align-items-cemter rounded m-1 p-1 "
                                + (isAnswered && answer[index] == exercise.correct_answer[index] ? "bg-success" : "")
                                + ((isAnswered && answer[index] != exercise.correct_answer[index]) ? "bg-danger" : "")
                            }>
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option) }}></span>
                            <input type="text"
                                value={answer[index]}
                                onChange={(e) => handleAnswer(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            }
            {
                exercise.type == "Textová odpověď" && <div className="d-flex flex-row flex-wrap">
                    {exercise.correct_answer.map((correctAnswer, index) => (
                        <div key={index} className={"m-1 p-1 rounded "
                            + (isAnswered && exercise.correct_answer.includes(answer[index]) ? "bg-success" : "")
                            + (isAnswered && !exercise.correct_answer.includes(answer[index]) ? "bg-danger" : "")
                        }>
                            <input type="text"
                                value={answer[index]}
                                onChange={(e) => handleAnswer(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            }
            {
                exercise.type == "Seřazení" && <div>
                    {exercise.answers.map((option, index) => (
                        <div key={index}>
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option) }}></span>
                        </div>
                    ))}
                    <div className="d-flex">
                        {exercise.correct_answer.map((correctAnswer, index) => (
                            <div key={index} className={"mx-1 p-1 "
                                + ((isAnswered && exercise.correct_answer[index] == answer[index]) ? "bg-success" : "")
                                + ((isAnswered && exercise.correct_answer[index] != answer[index]) ? "bg-danger" : "")
                            }>
                                <input type="text"
                                    className="text-center"
                                    style={{ width: 30 }}
                                    value={answer[index]}
                                    onChange={(e) => handleAnswer(index, e.target.value.toUpperCase())}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div >
    )
}

export default Exercise;