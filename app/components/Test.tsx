//@ts-nocheck
import Exercise from "./Exercise";
import { useEffect, useState } from "react";

const Test = ({ exercises }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    console.log(exercises);
    const initializeAnswers = () => {
        let answersArray = [];
        for (let i = 0; i < exercises.length; i++) {
            let filledArray = Array(exercises[i].correct_answer.length).fill("");
            answersArray[i] = filledArray;
        }
        setAnswers(answersArray);
    }
    console.log(answers);
    useEffect(() => {
        initializeAnswers();
    }, [])

    const handleAnswer = (index, exerciseAnswer) => { //exercise answer is the passed answer from Exercise component
        let answerArray = [...answers];
        answerArray[currentExerciseIndex][index] = exerciseAnswer;
        setAnswers(answerArray);
    }
    return (
        <div>
            <div className="d-flex justify-content-between bg-secondary w-auto" style={{overflowX: "auto"}}>
                {Array.from({ length: exercises.length }, (_, i) => (
                    <div key={i} className="m-1 btn bg-secondary-subtle w-100 text-center">
                        <span>{i + 1}</span>
                    </div>
                ))}
            </div>
            <div>
                <Exercise exercise={exercises[currentExerciseIndex]} answer={answers[currentExerciseIndex]} handleAnswer={handleAnswer} isAnswered={false} />
            </div>
        </div>
    )
}

export default Test