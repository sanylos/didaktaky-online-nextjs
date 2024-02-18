//@ts-nocheck
import Exercise from "./Exercise";
import { useState } from "react";

const Test = ({ exercises }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [answers, setAnswers] = useState([]);
    console.log(exercises);
    const handleAnswer = () => {

    }
    return (
        <div>
            <Exercise exercise={exercises[currentExerciseIndex]} answer={answer} handleAnswer={handleAnswer} isAnswered={false}/>
        </div>
    )
}

export default Test