//@ts-nocheck
"use client"
import Exercise from "@/app/components/Exercise"
import { useState } from "react"
const ExerciseAddPage = () => {
    const [exercise, setExercise] = useState({})
    return (
        <div>
            <h1>Přidat cvičení</h1>
            <div>
                <div>
                    
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