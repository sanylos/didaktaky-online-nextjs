//@ts-nocheck
const TestOverview = ({ submittedExercises, userDBTest, test }) => {
    const getEarnedPointsCount = () => {
        let points = 0;
        for (let i = 0; i < submittedExercises.length; i++) {
            points += submittedExercises[i].points[0];
        }
        return points;
    }
    const getMaxPointsCount = () => {
        let points = 0;
        for (let i = 0; i < submittedExercises.length; i++) {
            points += submittedExercises[i].points[1];
        }
        return points;
    }
    const getAnswerCountByCorrectness = () => {
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        for (let i = 0; i < submittedExercises.length; i++) {
            if (submittedExercises[i].isCorrect) {
                correctAnswers++;
            }
            if (!submittedExercises[i].isCorrect) {
                incorrectAnswers++;
            }
        }
        return { correctAnswers, incorrectAnswers }
    }
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
                <div className="text-end col">
                    <div className="me-1">Úspěšnost </div>
                    <div className="me-1">Získáno </div>
                    <div className="me-1">Maximum </div>
                    <div className="me-1">Správných </div>
                    <div className="me-1">Špatných </div>
                    <div className="me-1">Dostupný čas </div>
                    <div className="me-1">Čas </div>
                </div>
                <div className="text-start col">
                    <div>{((getEarnedPointsCount() / getMaxPointsCount()) * 100).toFixed(1)} %</div>
                    <div>{getEarnedPointsCount()} bodů</div>
                    <div>{getMaxPointsCount()} bodů</div>
                    <div>{getAnswerCountByCorrectness().correctAnswers} odpovědí</div>
                    <div>{getAnswerCountByCorrectness().incorrectAnswers} odpovědí</div>
                    <div>{test.duration}m</div>
                    <div>
                        <span v-if="getTimeDurationOfTest().hours > 0">{/*getTimeDurationOfTest().hours*/}h</span>
                        <span v-if="getTimeDurationOfTest().minutes > 0">{/*getTimeDurationOfTest().minutes*/}m </span>
                        <span v-if="getTimeDurationOfTest().seconds > 0"> {/*getTimeDurationOfTest().seconds*/}s</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestOverview