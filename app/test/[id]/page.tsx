//@ts-nocheck
"use client";

import { supabase } from "@/api";
import { useUser } from "@/app/UserContext";
import { getNameByShortcut } from "@/app/utils/shortcutHandler";
import { useEffect, useState } from "react";
import Exercise from "@/app/components/Exercise";

const UserTestPage = ({ params }: any) => {
    const [test, setTest] = useState({});
    const [exercises, setExercises] = useState([]);
    const { userData } = useUser();
    const getTestById = async () => {
        const { data, error } = await supabase
            .from('userTests')
            .select('*')
            .eq('id', params.id)
            .single()
        if (error) {
            console.log(error);
            return;
        }
        console.log("TEST:", data)
        return data;
    }

    const adjustExerciseObject = (data) => {
        let exercisesArray = [...data];
        for (let i = 0; i < exercisesArray.length; i++) {
            let obj = exercisesArray[i];
            obj.exercises.test_subject = test.subject;
        }
        console.log(exercisesArray);
        setExercises(exercisesArray);
    }

    const getExercisesByTestId = async () => {
        if (test && test.id) {
            const { data, error } = await supabase
                .from('userAnswers')
                .select(`
                *,
                exercises (*)
                `)
                .eq('userTest_id', test.id)
                .order('generated_at', { ascending: true })
            if (error) {
                console.log(error);
                return;
            }
            console.log(data);
            adjustExerciseObject(data);
        }
    }
    useEffect(() => {
        getTestById().then((data) => { setTest(data); });
    }, [])
    useEffect(() => {
        getExercisesByTestId();
    }, [test])
    return (
        <div>
            {test ?
                <div>
                    <div className="fs-3 m-2 d-flex justify-content-between">
                        <div>
                            Výsledek testu
                            <span className="ms-1 badge text-bg-secondary">#{params.id}</span>
                        </div>
                        <div className="text-end">
                            <span className="ms-1 badge text-bg-primary">{getNameByShortcut(test.type)}</span>
                            <span className="ms-1 badge text-bg-primary">{getNameByShortcut(test.subject)}</span>
                        </div>
                    </div>
                    <div>
                        {test &&
                            <div className="ms-3">
                                <div>Úspěšnost: <span className="fw-bold">{(test.points / test.maxPoints) * 100}%</span></div>
                                <div>Získáno: <span className="fw-bold">{test.points} bodů</span></div>
                                <div>Maximum: <span className="fw-bold">{test.maxPoints} bodů</span></div>
                                <div>Čas: <span className="fw-bold">{((new Date(test.submitted_at).getTime() - new Date(test.created_at).getTime()) / 60000).toFixed(1)} min</span></div>
                            </div>
                        }
                        {exercises?.length > 0 ?
                            <div>
                                {exercises && exercises.map((exercise, index) => (
                                    <div key={index}>
                                        <hr />
                                        <Exercise exercise={exercise.exercises} answer={exercise.answer} handleAnswer={() => { }} isAnswered={true} />
                                    </div>
                                ))}

                            </div>
                            :
                            <div>Loading...</div>}
                    </div>
                </div>
                :
                <div>
                    <div className="alert alert-danger" role="alert">
                        Tento test není veřejný! Pokud chcete tento test zobrazit, kontaktujte jeho vlastníka!
                    </div>
                </div>
            }

        </div>
    )
}

export default UserTestPage