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
            <Exercise exercise={exercises[currentExerciseIndex]} answer={answers[currentExerciseIndex]} handleAnswer={handleAnswer} isAnswered={false} />
        </div>
    )
}

export default Test