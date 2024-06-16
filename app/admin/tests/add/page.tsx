//@ts-nocheck
"use client"

import { supabase } from "@/api";
import { useRouter } from "next/navigation";
import { useState } from "react"

const AddTestPage = () => {
    const [test, setTest] = useState({});
    const router = useRouter();
    const saveTest = (key, value) => {
        setTest({ ...test, [key]: value })
    }
    const insertTest = async () => {
        const { error } = await supabase
            .from('tests')
            .insert({ ...test })
        if (error) alert(error.message);
        else router.replace('/admin/tests');
    }
    return (
        <div>
            <h1>Přidat test</h1>
            <div>
                Rok
                <input type="number" />
            </div>
            <div>
                Typ testu
                <select onChange={e => saveTest("type", e.target.value)} defaultValue={"null"}>
                    <option value="null">vyber možnost</option>
                    <option value="PZ">PZ</option>
                    <option value="MZ">MZ</option>
                </select>
            </div>
            <div>
                Předmět
                <select onChange={e => saveTest("subject", e.target.value)} defaultValue={"null"}>
                    <option value="null">vyber možnost</option>
                    <option value="CJL">Čeština</option>
                    <option value="MAT">Matika</option>
                    <option value="ANJ">Angličtina</option>
                </select>
            </div>
            <div>
                Varianta testu / Termín
                <select onChange={e => saveTest("variant", e.target.value)} defaultValue={"null"}>
                    <option value="null">vyber možnost</option>
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
            <button className="btn btn-success" onClick={insertTest}>Přidat</button>
        </div>
    )
}

export default AddTestPage