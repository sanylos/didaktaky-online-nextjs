const TestOverview = () => {
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
                    <div>{/*((getEarnedPointsCount() / getMaxPointsCount()) * 100).toFixed(1)*/} %</div>
                    <div>{/*getEarnedPointsCount()*/} bodů</div>
                    <div>{/*getMaxPointsCount()*/} bodů</div>
                    <div>{/*getAnswerCountByCorrectness.correct*/} odpovědí</div>
                    <div>{/*getAnswerCountByCorrectness.incorrect*/} odpovědí</div>
                    <div>{/*getTestDurationInMinutesBySubject(selectedFilter.examSubject[0])*/}m</div>
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