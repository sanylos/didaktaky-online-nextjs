//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";

const Prehled = () => {
    const { userData } = useUser();
    const [exercises, setExercises] = useState([]);

    async function getData() {
        const res = await fetch('/api/user/' + userData.user.id + '/tests',
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