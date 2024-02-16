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
    const [groupedTests, setGroupedTests] = useState<any>(null);

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

    const groupByTypeSubjectYear = () => {
        let groupedData: any = {};

        availableTests.forEach(item => {
            const { type, subject, year } = item;
            if (!groupedData[type]) {
                groupedData[type] = {};
            }
            if (!groupedData[type][subject]) {
                groupedData[type][subject] = [];
            }
            if (!groupedData[type][subject].includes(year)) {
                groupedData[type][subject].push(year);
            }
        });
        console.log(groupedData);
        console.log(groupedData['PZ'])
        return groupedData;
    }
    useEffect(() => {
        setGroupedTests(groupByTypeSubjectYear());
    }, [availableTests])
    useEffect(() => {
        fetchAvailableTests();
        //getFilteredTest();
    }, [])

    return <>
        <div className="">
            <div className="">
                {groupedTests && Object.keys(groupedTests).map(type => (
                    <div className="bg-success" key={type}>
                        <h2>{type}</h2>
                        {Object.keys(groupedTests[type]).map(subject => (
                            <div key={subject}>
                                <h3>{subject}</h3>
                                {groupedTests[type][subject].map(year => (
                                    <div key={year} className="mb-1 rounded bg-secondary">{year}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

                {/*getFilteredTests("PZ", "CJL", "2023").map((test, index) => (
                    <div key={index} className="mb-1 rounded bg-secondary">{test.year}|{test.variant}</div>
                ))}
                {getFilteredTests("PZ", "CJL", "2022").map((test, index) => (
                    <div key={index} className="mb-1 rounded bg-secondary">{test.year}|{test.variant}</div>
                ))*/}
            </div>
        </div>
    </>
}