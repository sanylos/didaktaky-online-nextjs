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

            <div class="modal fade" id="loadingModal" tabindex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="loadingModalLabel">Příprava testu</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Test se připravuje ({exercises.length}/{test?.exerciseCount})
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Zrušit</button>
                            <button type="button" class="btn btn-success">Začít</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestPage;