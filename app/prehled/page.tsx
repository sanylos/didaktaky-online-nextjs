//@ts-nocheck
"use client";
import { useEffect, useState } from "react";

const Prehled = () => {
    const [exercises, setExercises] = useState([]);

    async function getData() {
        const res = await fetch('/api/test/1',
            {
                method: 'GET',
                next: { revalidate: 30 }
            })
        const data = await res.json();
        return data;
    }
    useEffect(() => {
        getData().then(data => setExercises(data));
    }, [])

    return <div>
        {JSON.stringify(exercises)}
    </div>
}

export default Prehled;