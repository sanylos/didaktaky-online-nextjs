//@ts-nocheck
"use client";

import { supabase } from "@/api";
import { useUser } from "@/app/UserContext";
import { useEffect, useState } from "react";

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
        <div>UserTestPage {params.id}
            {JSON.stringify(test)}</div>
    )
}

export default UserTestPage