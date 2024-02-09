// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/api";
import Exercise from "../components/Exercise";

const Procvicovani = () => {
    const [exercise, setExercise] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const fetchNextQuestion = async () => {
        try {
            const { data, error } = await supabase.rpc('getrandomexercise', {
                in_years: ["2023"],
                in_subjects: ["CJL"],
                in_variants: ["1"],
                in_types: ["PZ"]
            });

            if (error) {
                console.log(error);
            }
            else {
                console.log(data);
                setExercise(data);
                setIsAnswered(false);
                const filledArray = Array(data.correct_answer.length).fill("");
                setAnswer(filledArray);

            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log("log z page z cviceni");
    useEffect(() => {
        console.log("log z useEffectu z cviceni");
        fetchNextQuestion();
    }, [])

    return <div>
        Procvicovani page
        <h1>odpoved:</h1>
        {JSON.stringify(answer)}
        <hr />
        <Exercise exercise={exercise}/>
    </div>
}

export default Procvicovani;