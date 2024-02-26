//@ts-nocheck
"use client";

import { supabase } from "@/api";
import { useUser } from "@/app/UserContext";
import { useEffect, useState } from "react";
import { DiVim } from "react-icons/di";

const UserTestPage = ({ params }: any) => {
    const [test, setTest] = useState();
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
    useEffect(() => {
        const data = getTestById().then((data) => { setTest(data) });
    }, [])
    return (
        <div>
            <div className="fs-3 m-2">
                Výsledek testu
                <span class="ms-1 badge text-bg-secondary">#{params.id}</span>
            </div>
            {test ?
                <div>
                    {JSON.stringify(test)}
                </div>
                :
                <div>
                    <div class="alert alert-danger" role="alert">
                        Tento test není veřejný! Pokud chcete tento test zobrazit, kontaktujte jeho vlastníka!
                    </div>
                </div>}

        </div>
    )
}

export default UserTestPage