"use client"
import { supabase } from "@/api";
import { useEffect, useState } from "react";

interface Test {
    id: number,
    year: string,
    subject: string,
    variant: number,
    type: string
}

export default function Test() {
    const [availableTests, setAvailableTests] = useState<Array<Test>>([]);

    const fetchAvailableTests = async () => {
        const { data, error } = await supabase
            .from('tests')
            .select('*');
        if (error) {
            console.error(error);
            return;
        }
        setAvailableTests(data);
        console.log(data);
    }

    const getFilteredTests = (type: string, subject: string, year: string) => {
        const filteredTests = availableTests.filter((test) => test.type == type && test.subject == subject && test.year == year);
        return filteredTests;
    }

    const getTestsGroups = () => {
        let types: string[] = [];
        let subjects: string[] = [];
        let years: string[] = [];
        availableTests.forEach((test) => {
            if (!types.includes(test.type)) {
                types.push(test.type);
            }
            if (!subjects.includes(test.subject)) {
                subjects.push(test.subject);
            }
            if (!years.includes(test.year)) {
                years.push(test.year);
            }
        })
        console.log(types);
        return { types, subjects, years }
    }

    useEffect(() => {
        fetchAvailableTests();
    }, [])

    return <>
        <div className="">
            <div className="">
                {getTestsGroups().types.map((type, index) => (
                    <div key={index} className="mb-1 rounded bg-secondary">{type}</div>
                ))}
            </div>
        </div>
    </>
}