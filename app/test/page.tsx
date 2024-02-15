"use client"
import { supabase } from "@/api";
import { useEffect, useState } from "react";
const Test = () => {
    const [availableTests, setAvailableTests] = useState<any[]>([]);

    const fetchAvailableTests = async () => {
        const { data, error } = await supabase
            .from('tests')
            .select('*');
        if (data) {
            setAvailableTests(data);
            console.log(data);
        }
    }

    useEffect(() => {
        fetchAvailableTests();
    }, []);

    return <>
        <div className="">
            <div>
                Test 1
            </div>
        </div>
    </>
}

export default Test;