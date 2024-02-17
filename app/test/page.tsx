//@ts-nocheck
"use client"

import { useState } from "react";
import AllTestsList from "../components/AllTestsList"

const Test = () => {
    const [testState, setTestState] = useState("selection");
    const [testId, setTestId] = useState(null);

    const createTestSession = (test) => {
        console.log(test);
        setTestId(test.id);
    }

    return (
        <div>
            {testState == "selection" &&
                <div>
                    <AllTestsList createTestSession={createTestSession} />
                </div>
            }
        </div>
    )
}
export default Test;