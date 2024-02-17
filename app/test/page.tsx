//@ts-nocheck
"use client"

import { useState } from "react";
import AllTestsList from "../components/AllTestsList"
import Test from "../components/Test";
import { supabase } from "@/api";

const TestPage = () => {
    const [testState, setTestState] = useState("selection");
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState("");
    const [test, setTest] = useState(null);

    const createTestSession = async (test) => {
        setTest(test);
        for (let i = 1; i <= test.exerciseCount; i++) {
            const { data, error } = await supabase
                .from('exercises')
                .select('*')
                .eq('test_id', test.id)
                .eq('number', i)
                .single();
            if (error) {
                console.log(error);
                setError("Tento test se nepodařilo načíst, zkuste to znovu nebo zvolte jiný!");
            }
            if (data) {
                let allExercises = exercises;
                allExercises.push(data);
                setExercises(allExercises);
            }
        }
        console.log(exercises);
    }

    return (
        <div>
            {testState == "selection" &&
                <div>
                    <AllTestsList createTestSession={createTestSession} />
                </div>
            }
            {testState == "running" &&
                <div>
                    <Test exercises={exercises} />
                </div>
            }
        </div>
    )
}
export default TestPage;