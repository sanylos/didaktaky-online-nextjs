//@ts-nocheck
import { LuPartyPopper } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { IoRepeat } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TestOverview = ({ submittedExercises, userDBTest, test, exercises }) => {
    const router = useRouter();
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
        <div className="container-fluid d-flex flex-column align-items-center">
            <span className="fs-1 fw-bold mb-2"><LuPartyPopper /> Gratulujeme!</span>
            <div className="d-flex justify-content-center container-fluid fs-5">
                <div className="text-end col">
                    <div className="me-1">Úspěšnost </div>
                    <div className="me-1">Získáno </div>
                    <div className="me-1">Maximum </div>
                    <div className="me-1">Správných </div>
                    <div className="me-1">Špatných </div>
                    <div className="me-1">Dostupný čas </div>
                    <div className="me-1">Čas </div>
                </div>
                <div className="text-start col fw-bold">
                    <div>{((getEarnedPointsCount() / getMaxPointsCount()) * 100).toFixed(1)} %</div>
                    <div>{getEarnedPointsCount()} bodů</div>
                    <div>{getMaxPointsCount()} bodů</div>
                    <div>{getAnswerCountByCorrectness().correctAnswers} odpovědí</div>
                    <div>{getAnswerCountByCorrectness().incorrectAnswers} odpovědí</div>
                    <div>{test.duration}m</div>
                    <div>
                        <span>{((new Date(userDBTest.submitted_at).getTime() - new Date(userDBTest.created_at).getTime()) / 60000).toFixed(0)}m </span>
                        <span> {Math.floor(((new Date(userDBTest.submitted_at).getTime() - new Date(userDBTest.created_at).getTime()) / 60000 - Math.floor((new Date(userDBTest.submitted_at).getTime() - new Date(userDBTest.created_at).getTime()) / 60000)) * 60)}s</span>
                    </div>
                </div>
            </div>
            <div>
                <Link href={"/test/" + userDBTest.id}>
                    <button className="btn btn-dark mx-1"><GoChecklist className="fs-5" /> Podrobnosti</button>
                </Link>
                <Link href={'/test'} onClick={router.reload}>
                    <button className="btn btn-success mx-1"><IoRepeat className="fs-5" /> Zkusit další</button>
                </Link>
            </div>
        </div>
    )
}

export default TestOverview