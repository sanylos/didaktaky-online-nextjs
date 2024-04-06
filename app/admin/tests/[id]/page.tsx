//@ts-nocheck
"use client"
import Exercise from "@/app/components/Exercise"
import { supabase } from "@/api"
import { useEffect, useState } from "react"

const TestPreviewPage = ({ params }) => {
    const [exercises, setExercises] = useState([]);
    const fetchExercises = async () => {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .eq('test_id', params.id)
            .order('number', { ascending: true })
        if (error) console.log(error);
        console.log(data)
        setExercises(data);
    }

    useEffect(() => {
        fetchExercises();
    }, [])
    return (
        <div>
            <h1>Náhled testu #{params.id}</h1>
            {exercises && exercises.map((exercise, index) => (
                <div key={index}>
                    <hr />
                    <Exercise exercise={exercise} answer={exercise.correct_answer} handleAnswer={() => { }} showExerciseNumber={true} />
                </div>
            ))}
        </div>
    )
}

export default TestPreviewPage