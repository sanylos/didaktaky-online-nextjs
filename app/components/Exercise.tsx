const Exercise = ({exercise}) => {

    /*return (
        <div className="exercise-options" v-if="exercises.type == 'Výběr z možností'">
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
            </div >
    )*/
}

export default Exercise;