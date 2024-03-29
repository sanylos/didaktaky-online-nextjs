// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/api";
import Exercise from "../../components/Exercise";
import { upsertExercise } from "../../utils/exerciseInsertion";
import { useUser } from "../../UserContext";

const PracticeWindow = ({ examType, examSubject }) => {
    const { userData } = useUser();
    const [exercise, setExercise] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userAnswerId, setUserAnswerId] = useState(null);
    const [exerciseHistory, setExerciseHistory] = useState([]);
    const [answerHistory, setAnswerHistory] = useState([]);
    const [exerciseHistoryIndex, setExerciseHistoryIndex] = useState(0);

    const handleExerciseSubmit = async () => { //
        if (exercise && !answer.includes("")) {
            setIsAnswered(true);
            setAnswerHistory([answer, ...answerHistory]);
            setExerciseHistory([exercise, ...exerciseHistory]);
            if (userData) {
                const { data, error } = await upsertExercise(exercise, answer, userAnswerId);
                if (error) {
                    console.log(error);
                }
            }
        }
        else alert("Cvičení nebylo zodpovězeno");
    }

    const fetchNextQuestion = async () => {
        let filledArray; // Array filled with empty strings waiting to be answered
        try {
            const { data, error } = await supabase.rpc('getrandomexercise', {
                in_years: ["2021", "2022", "2023", "2024"],
                in_subjects: [examSubject],
                in_variants: ["1", "2", "3", "4", "5"],
                in_types: [examType]
            });

            if (error) {
                console.log(error);
            }
            else {
                console.log(data);
                setExercise(data);
                setIsAnswered(false);
                filledArray = Array(data.correct_answer.length).fill("");
                setAnswer(filledArray);
            }
            if (userData) {
                const { data: upsertData, error: upsertError } = await upsertExercise(data, filledArray);
                if (upsertError) {
                    console.log(error);
                }
                if (upsertData) {
                    console.log(upsertData)
                    setUserAnswerId(upsertData.id);
                }
            }
        } catch (error) {
            console.log(error);
        }


    }

    const handleAnswer = (index, exerciseAnswer) => { //exercise answer is the passed answer from Exercise component
        if (!isAnswered) {
            let answerArray = [...answer];
            answerArray[index] = exerciseAnswer;
            //console.log("answer handled: " + answerArray);
            setAnswer(answerArray);
            //console.log(answer);
        }
    }

    const handlePreviousExercise = () => {
        if (exerciseHistoryIndex + 1 < exerciseHistory.length) {
            setExerciseHistoryIndex(exerciseHistoryIndex + 1);
            setExercise(exerciseHistory[exerciseHistoryIndex + 1]);
            setAnswer(answerHistory[exerciseHistoryIndex + 1]);
        }
    }

    const handleNextExercise = () => {
        if (exerciseHistoryIndex >= 1) {
            setExerciseHistoryIndex(exerciseHistoryIndex - 1);
            setExercise(exerciseHistory[exerciseHistoryIndex - 1]);
            setAnswer(answerHistory[exerciseHistoryIndex - 1]);
        } else {
            fetchNextQuestion();
        }
    }
    console.log(examType)
    useEffect(() => {
        console.log("log z useEffectu z cviceni");
        fetchNextQuestion();
    }, [])

    return <div className="d-flex justify-content-center">
        <div>
            <div className="container-fluid rounded p-3 bg-secondary-subtle shadow m-1 w-auto">
                {exercise?.exercise_id ?
                    <div>
                        <Exercise exercise={exercise} answer={answer} handleAnswer={handleAnswer} isAnswered={isAnswered} />
                        <div className="d-flex justify-content-between">
                            <button disabled={!isAnswered} className="btn btn-light" onClick={handlePreviousExercise}>Předchozí</button>
                            {

                                isAnswered ?
                                    <button className="btn btn-light" onClick={handleNextExercise}>Další</button>
                                    :
                                    <button className="btn btn-light" onClick={handleExerciseSubmit}>Zkontrolovat</button>

                            }
                        </div>
                    </div>
                    :
                    <div className="d-flex flex-column align-items-center">
                        <span>Načítání...</span>
                        <span className="mt-5">Pokud načítání trvá příliš dlouho, pravděpodobně nebylo nalezeno žádné vyhovující cvičení.</span>
                    </div>
                }
            </div>
        </div>
    </div>
}

export default PracticeWindow;