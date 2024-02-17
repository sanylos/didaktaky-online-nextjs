//@ts-nocheck
"use client"

import { useEffect, useState } from "react";
import AllTestsList from "../components/AllTestsList"
import Test from "../components/Test";
import { supabase } from "@/api";

const TestPage = () => {
    const [testState, setTestState] = useState("selection");
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState("");
    const [test, setTest] = useState(null);
    const [loadedExercises, setLoadedExercises] = useState(0);

    const cancelTestSession = () => {
        setError("");
        setLoadedExercises(0);
        setExercises([]);
    }

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
                return;
            }
            if (data) {
                let allExercises = exercises;
                allExercises.push(data);
                setExercises(allExercises);
                setLoadedExercises(exercises.length);
            }
        }
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

            <div className="modal fade" id="loadingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loadingModalLabel">Příprava testu</h1>
                        </div>
                        <div className="modal-body">
                            Test se připravuje ({loadedExercises}/{test?.exerciseCount ? test.exerciseCount : "0"})
                            <div className="progress" role="progressbar" aria-label="testWaitingProgressBar">
                                <div className="progress-bar" style={{ width: `${(exercises.length / test?.exerciseCount) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" onClick={cancelTestSession} disabled={!error && (!test?.exerciseCount || (loadedExercises < test?.exerciseCount))} data-bs-dismiss="modal">Zrušit</button>
                            <button type="button" className="btn btn-success" onClick={e => setTestState("running")} disabled={!test?.exerciseCount || (loadedExercises < test?.exerciseCount)} data-bs-dismiss="modal">Začít</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestPage;