//@ts-nocheck
"use client";

import { supabase } from "@/api";
import { useUser } from "@/app/UserContext";
import { getNameByShortcut } from "@/app/utils/shortcutHandler";
import { useEffect, useState } from "react";
import { DiVim } from "react-icons/di";

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
        return data;
    }
    const getExercisesByTestId = async () => {
        if (test.id) {
            const { data, error } = await supabase
                .from('userAnswers')
                .select('*')
                .eq('userTest_id', test.id)
                .order('generated_at', { ascending: true })
            if (error) {
                console.log(error);
                return;
            }
            return data;
        }
    }
    useEffect(() => {
        getTestById().then((data) => { setTest(data) });
        getExercisesByTestId().then((data) => { setExercises(data) });
    }, [])
    return (
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
            {test ?
                <div>
                    {test &&
                        <div className="ms-3">
                            <div>Úspěšnost: <span className="fw-bold">{(test.points / test.maxPoints) * 100}%</span></div>
                            <div>Získáno: <span className="fw-bold">{test.points} bodů</span></div>
                            <div>Maximum: <span className="fw-bold">{test.maxPoints} bodů</span></div>
                            <div>Čas: <span className="fw-bold">{((new Date(test.submitted_at).getTime() - new Date(test.created_at).getTime()) / 60000).toFixed(1)} min</span></div>
                        </div>
                    }
                    {JSON.stringify(exercises)}
                </div>
                :
                <div>
                    <div className="alert alert-danger" role="alert">
                        Tento test není veřejný! Pokud chcete tento test zobrazit, kontaktujte jeho vlastníka!
                    </div>
                </div>}

        </div>
    )
}

export default UserTestPage