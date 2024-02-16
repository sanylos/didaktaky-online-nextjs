"use client"
import { supabase } from "@/api";
import { FaArrowRight } from "react-icons/fa";
import { LiaHourglassStartSolid } from "react-icons/lia";
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

    const getNameByShortcut = (shortcut: string) => {
        switch (shortcut) {
            case "PZ": return "Přijímací zkouška"
            case "MZ": return "Maturitní zkouška"
            case "CJL": return "Český jazyk a literatura"
            case "MAT": return "Matematika"
            case "ANJ": return "Anglický jazyk"
            case "testVariant-1": return "1. řádný"
            case "testVariant-2": return "2. řádný"
            case "testVariant-3": return "1. náhradní"
            case "testVariant-4": return "2. náhradní"
            case "testVariant-5": return "Ilustrační"
        }
    }

    useEffect(() => {
        setGroupedTests(groupByTypeSubjectYear());
    }, [availableTests])
    useEffect(() => {
        fetchAvailableTests();
    }, [])

    return <>
        <div className="container mt-1">
            <div className="">
                {groupedTests && Object.keys(groupedTests).map(type => (
                    <div className="bg-secondary-subtle rounded p-1 m-1" key={type}>
                        <div>{getNameByShortcut(type)}</div>

                        {Object.keys(groupedTests[type]).map(subject => (
                            <div key={subject} className="bg-light rounded p-1 m-1">
                                <div>{getNameByShortcut(subject)}</div>

                                {groupedTests[type][subject].map(year => (
                                    <div key={year} className="rounded bg-secondary-subtle p-1 m-1">
                                        <div>{year}</div>

                                        {getFilteredTests(type, subject, year).map(test => (
                                            <div key={test.id} className="bg-light rounded p-1 m-1 d-flex justify-content-between align-items-center">
                                                <span>{getNameByShortcut('testVariant-' + test.variant)} termín</span>
                                                <div className="d-flex flex-row align-items-center">
                                                    <div className="bg-secondary-subtle rounded mx-1 px-2">
                                                        <LiaHourglassStartSolid className="fs-3"/>
                                                        <span>{test.duration ? test.duration : "?"} min</span>
                                                    </div>
                                                    <button className="btn btn-secondary btn-sm"><FaArrowRight /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </>
}