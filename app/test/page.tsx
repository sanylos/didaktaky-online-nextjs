//@ts-nocheck
"use client"

import { useState } from "react";
import AllTestsList from "../components/AllTestsList"
import Test from "../components/Test";

const Test = () => {
    const [testState, setTestState] = useState("selection");
    const [exercises, setExercises] = useState([]);

    const createTestSession = (test) => {
        console.log(test);
        
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
                    <Test />
                </div>
            }
        </div>
    )
}
export default Test;