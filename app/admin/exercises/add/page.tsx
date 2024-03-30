//@ts-nocheck
"use client"
import { supabase } from "@/api"
import Exercise from "@/app/components/Exercise"
import { useEffect, useState } from "react"
const ExerciseAddPage = () => {
    const [exercise, setExercise] = useState({})
    const [tests, setTests] = useState([])
    const fetchTests = async () => {
        const { data, error } = await supabase
            .from('tests')
            .select('*')
        if (error) console.log(error)
        setTests(data);
    }
    useEffect(() => {
        fetchTests();
    }, [])

    const saveExercise = (key, value) => {
        const exerciseCopy = exercise;
        setExercise({ ...exercise, [key]: value })
    }
    console.log(exercise)
    return (
        <div>
            {JSON.stringify(exercise)}
            <h1>Přidat cvičení</h1>
            <div>
                <div>
                    <div>
                        ID Testu
                        <select onChange={(e) => saveExercise("test_id", e.target.value)}>
                            {tests?.map(test => (
                                <option key={test.id} value={test.id}>{test.id} - {test.type} - {test.subject}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <h2>Náhled</h2>
                    <Exercise exercise={exercise} isAnswered={true} showExerciseNumber={true} />
                </div>
            </div>

        </div>
    )
}

export default ExerciseAddPage