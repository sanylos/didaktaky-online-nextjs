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
                Rok
                <input type="number" />
            </div>
            <div>
                Typ testu
                <select onChange={e => saveTest("type", e.target.value)}>
                    <option value="PZ">PZ</option>
                    <option value="MZ">MZ</option>
                </select>
            </div>
            <div>
                Předmět
                <select onChange={e => saveTest("subject", e.target.value)}>
                    <option value="CJL">Čeština</option>
                    <option value="MAT">Matika</option>
                    <option value="ANJ">Angličtina</option>
                </select>
            </div>
            <div>
                Varianta testu / Termín
                <select onChange={e => saveTest("type", e.target.value)}>
                    <option value="1">První řádný</option>
                    <option value="2">Druhý řádný</option>
                    <option value="3">První náhradní</option>
                    <option value="4">Druhý náhradní</option>
                    <option value="5">Ilustrační</option>
                </select>
            </div>
            <div>
                Čas testu
                <input type="number" onChange={e => saveTest("duration", e.target.value)} />
            </div>
            <div>
                Počet cvičení
                <input type="number" onChange={e => saveTest("exerciseCount", e.target.value)} />
            </div>
        </div>
    )
}

export default AddTestPage