//@ts-nocheck
import './Exercise.scss'
import DOMPurify from 'dompurify'
const Exercise = ({ exercise, answer, handleAnswer }) => {

    return (
        /*<div className="exercise-options" v-if="exercises.type == 'Výběr z možností'">
            <div>
                <div v-for="option, index in exercises.answers" :key="index"
                        className="question-option mb-1 d-flex flex-column align-content-start">
                <input type="radio" className="btn-check" name="options-base" :id="'option' + index" autocomplete="off"
                            :value="index" v-model="userStore.exerciseAnswer[0]" :disabled="answered">
                <label className="btn text-white text-start fw-normal bg-unanswered" :for="'option' + index" :className="{
                    'bg-success': index == exercises.correct_answer[0] && answered,
                'bg-danger': index === userStore.exerciseAnswer[0] && index != exercises.correct_answer[0] && answered,
                        }" v-html="option"></label>
        </div>
    </div >
            </div >*/
        <div className="container">
            <h1>Exercise component OK</h1>
            <div className="d-flex flex-column">
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
            </div>



            {
                exercise.type == "Výběr z možností" &&
                <div>
                    {JSON.stringify(exercise.answers)}
                    {exercise.answers.map((option, index) => (
                        <div key={index}>
                            <input className="btn-check"
                                id={"option" + index}
                                type="radio"
                                name="exerciseOptions"
                                value={index}
                                onChange={(e) => handleAnswer(0, e.target.value)}
                            />
                            <label className="btn text-start fw-normal"
                                htmlFor={"option" + index}
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option) }}
                            />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Exercise;