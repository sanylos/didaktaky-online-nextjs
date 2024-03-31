//@ts-nocheck
"use client"
import { supabase } from "@/api"
import Exercise from "@/app/components/Exercise"
import { ImageResponse } from "next/server"
import { useEffect, useState } from "react"
const ExerciseAddPage = () => {
    const [exercise, setExercise] = useState({})
    const [tests, setTests] = useState([])
    const [images, setImages] = useState(null)
    const fetchTests = async () => {
        const { data, error } = await supabase
            .from('tests')
            .select('*')
        if (error) console.log(error)
        setTests(data);
    }
    const fetchImages = async () => {


        const { data, error } = await supabase
            .storage
            .from('exercise-texts')
            .list('folder', {
                limit: 30,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            })
        console.log(error)
        console.log(data)
        setImages(data)
    }
    useEffect(() => {
        fetchTests();
        fetchImages();
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
                    <div className="d-flex" style={{ overflow: 'auto' }}>
                        <div className="bg-dark text-white m-1 p-1">
                            <button className="btn text-white d-flex align-items-center justify-content-center fs-1" style={{ height: '100%', width: '100px', objectFit: 'contain' }}>
                                +
                            </button>
                        </div>
                        {images?.map(image => (
                            <div key={image.name} className="bg-dark text-white m-1 p-1">
                                <img style={{ height: '200px', minWidth: '300px', objectFit: 'contain' }} src={'https://oggvmfflkusznxpohazs.supabase.co/storage/v1/object/public/exercise-texts/folder/' + image.name} alt="img" />
                                {image.name}
                            </div>
                        ))}
                        Nazev souboru TEXT 1
                        <input type="text" onChange={(e) => saveExercise("text1img", e.target.value)} />
                        Nazev souboru TEXT 2
                        <input type="text" onChange={(e) => saveExercise("text2img", e.target.value)} />
                    </div>
                    <div>
                        ID Testu
                        <select onChange={(e) => saveExercise("test_id", e.target.value)}>
                            {tests?.map(test => (
                                <option key={test.id} value={test.id}>{test.id} - {test.type} - {test.subject}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        Číslo cvičení
                        <input onChange={(e) => saveExercise("number", e.target.value)} type="number" min="1" max="30" />
                    </div>
                    <div>
                        Hlavní nadpis
                        <input type="text" onChange={(e) => saveExercise("title", e.target.value)} />
                    </div>
                    <div>
                        Popisek
                        <input type="text" onChange={(e) => saveExercise("description", e.target.value)} />
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