"use client"

import { useState } from "react";
import AllTestsList from "../components/AllTestsList"

const Test = () => {
    const [testState, setTestState] = useState("selection");
    return (
        <div>
            {testState == "selection" &&
                <div>
                    <AllTestsList />
                </div>
            }
        </div>
    )
}
export default Test;