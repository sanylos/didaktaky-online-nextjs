//@ts-nocheck
"use client";

import { supabase } from "@/api";
import { useUser } from "@/app/UserContext";
import { getNameByShortcut } from "@/app/utils/shortcutHandler";
import { useEffect, useState } from "react";
import Exercise from "@/app/components/Exercise";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { FaLink } from "react-icons/fa";

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

    const handleAccessToggle = async () => {
        const { data, error } = await supabase
            .from('userTests')
            .update({
                is_public: !test.is_public
            })
            .eq('id', params.id)
            .select().single()
        if (error) console.log(error);
        if (data) {
            setTest(data);
        }
    }

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
                            <div>
                                <div className="ms-3">
                                    <div>Úspěšnost: <span className="fw-bold">{(test.points / test.maxPoints) * 100}%</span></div>
                                    <div>Získáno: <span className="fw-bold">{test.points} bodů</span></div>
                                    <div>Maximum: <span className="fw-bold">{test.maxPoints} bodů</span></div>
                                    <div>Čas: <span className="fw-bold">{((new Date(test.submitted_at).getTime() - new Date(test.created_at).getTime()) / 60000).toFixed(1)} min</span></div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div class="input-group flex-nowrap w-auto me-1">
                                        <span className="btn btn-light shadow"><FaLink className="me-2" /><span className="user-select-all">{window.location.href}</span></span>
                                    </div>
                                    <div className="fs-6">
                                        {
                                            test.is_public ?
                                                <span onClick={handleAccessToggle} className="btn btn-light shadow me-3">
                                                    <HiLockOpen className="text-success" />
                                                    <span className="text-success fw-bold">Veřejný</span>
                                                </span>
                                                :
                                                <span onClick={handleAccessToggle} className="btn btn-light shadow me-3">
                                                    <HiLockClosed className="text-danger" />
                                                    <span className="text-danger fw-bold">Soukromý</span>
                                                </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        {exercises?.length > 0 ?
                            <div>
                                {exercises && exercises.map((exercise, index) => (
                                    <div key={index}>
                                        <hr />
                                        <Exercise exercise={exercise.exercises} answer={exercise.answer} handleAnswer={() => { }} isAnswered={true} showExerciseNumber={true} />
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