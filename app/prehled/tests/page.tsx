// @ts-nocheck
"use client"
import { supabase } from "@/api";
import { useUser } from "@/app/UserContext";
import { useEffect, useState } from "react";

const TestsPage = () => {
    const [tests, setTests] = useState([]);
    const { userData } = useUser();
    async function getUserTests() {
        if (userData) {
            const { data, error } = await supabase
                .from('userTests')
                .select('*')
                .eq('user_id', userData.user.id)
                .order('created_at', { ascending: false })
                .range(tests.length, tests.length + 10)

            let testsCopy = [...tests];
            testsCopy.push(...data);
            setTests(testsCopy);
            console.log(testsCopy);
        }
    }
    useEffect(() => {
        getUserTests();
    }, [userData])
    return (
        <div>{tests && tests.map((test, index) => (
            <div key={index}>
                {test.id}
            </div>
        ))}
            <button onClick={getUserTests}>load more</button>
        </div>
    )
}

export default TestsPage