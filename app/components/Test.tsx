//@ts-nocheck
import Exercise from "./Exercise";
import { useState } from "react";

const Test = ({ exercises }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    console.log(exercises);
    const handleAnswer = (index, exerciseAnswer) => { //exercise answer is the passed answer from Exercise component
        let answerArray = [...answers];
        answerArray[index] = exerciseAnswer;
        setAnswers(answerArray);
    }
    return (
        <div>
            <Exercise exercise={exercises[currentExerciseIndex]} answer={answers[currentExerciseIndex]} handleAnswer={handleAnswer} isAnswered={false} />
        </div>
    )
}

export default Test