//@ts-nocheck
"use client"

import { useState } from "react"

const AddTestPage = () => {
    const [test, setTest] = useState({});
    const saveTest = (key, value) => {
        setTest({ ...test, [key]: value })
    }
    return (
        <div>
            <h1>Přidat test</h1>
            {JSON.stringify(test)}
            <div>
                Typ testu
                <select onChange={e => saveTest("type", e.target.value)}>
                    <option value="PZ">PZ</option>
                    <option value="PZ">MZ</option>
                </select>
            </div>
            
        </div>
    )
}

export default AddTestPage