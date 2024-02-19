//@ts-nocheck
import Exercise from "./Exercise";
import { useEffect, useState } from "react";

const Test = ({ exercises, setAnswers, answers, timeLeft }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    /*const [answers, setAnswers] = useState([]);
    const initializeAnswers = () => {
        let answersArray = [];
        for (let i = 0; i < exercises.length; i++) {
            let filledArray = Array(exercises[i].correct_answer.length).fill("");
            answersArray[i] = filledArray;
        }
        setAnswers(answersArray);
    }
    useEffect(() => {
        initializeAnswers();
    }, [])
*/
    const handleAnswer = (index, exerciseAnswer) => { //exercise answer is the passed answer from Exercise component
        let answerArray = [...answers];
        answerArray[currentExerciseIndex][index] = exerciseAnswer;
        setAnswers(answerArray);
        console.log(answerArray);
    }
    return (
        <div>
            <div className="d-flex justify-content-between bg-secondary w-auto m-2 rounded" style={{ overflowX: "auto" }}>
                {Array.from({ length: exercises.length }, (_, i) => (
                    <div key={i} className="m-1 btn bg-secondary-subtle w-100 text-center">
                        <span onClick={e => setCurrentExerciseIndex(i)}>{i + 1}</span>
                    </div>
                ))}
            </div>
            <div className="container">
                <div className="bg-secondary text-light m-1 rounded">
                    <div className="bg-danger text-end w-auto container rounded-5" style={{position: "absolute", right: "1rem"}}>{timeLeft}</div>
                    <Exercise exercise={exercises[currentExerciseIndex]} answer={answers[currentExerciseIndex]} handleAnswer={handleAnswer} isAnswered={false} />
                </div>
            </div>
        </div>
    )
}

export default Test