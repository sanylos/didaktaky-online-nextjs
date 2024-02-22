//@ts-nocheck
"use client"
import { supabase } from "@/api";
import { FaArrowRight, FaCube } from "react-icons/fa";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { useEffect, useState } from "react";

interface Test {
    id: number,
    year: string,
    subject: string,
    variant: number,
    type: string
    exerciseCount: number,
    duration: number
}

export default function Test({ createTestSession, canStartTest }) {
    const [availableTests, setAvailableTests] = useState<Array<Test>>([]);
    const [groupedTests, setGroupedTests] = useState<any>(null);
    const [filter, setFilter] = useState({
        subjects: [],
        types: [],
    });

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
        let groupedData: { [type: string]: { [subject: string]: string[] } } = {};

        availableTests.forEach(item => {
            const { type, subject, year } = item;
            if ((filter["types"].length > 0 && filter["types"].includes(type)) && (filter["subjects"].length > 0 && filter["subjects"].includes(subject))) {
                if (!groupedData[type]) {
                    groupedData[type] = {};
                }
                if (!groupedData[type][subject]) {
                    groupedData[type][subject] = [];
                }
                if (!groupedData[type][subject].includes(year)) {
                    groupedData[type][subject].push(year);
                }
            }
        });

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
    }, [availableTests, filter])
    useEffect(() => {
        fetchAvailableTests();
    }, [])

    const handleFilter = (cathegory, newFilter) => {
        let filtersArray = { ...filter };
        console.log(filtersArray);
        if (cathegory == "types") {
            if (filtersArray["types"].includes(newFilter)) {
                filtersArray["types"] = filtersArray["types"].filter((filterItem) => filterItem != newFilter);
            } else {
                filtersArray["types"].push(newFilter);
            }
        }
        if (cathegory == "subjects") {
            if (filtersArray["subjects"].includes(newFilter)) {
                filtersArray["subjects"] = filtersArray["subjects"].filter((filterItem) => filterItem != newFilter);
            } else {
                filtersArray["subjects"].push(newFilter);
            }
        }
        setFilter(filtersArray);
    }

    return <>
        <div className="container mt-1">
            <input type="checkbox" onClick={e => handleFilter("types", e.target.value)} value="MZ" class="btn-check" id="btn-check-1" autocomplete="off" />
            <label class="btn mx-1" for="btn-check-1">Maturita</label>

            <input type="checkbox" onClick={e => handleFilter("types", e.target.value)} value="PZ" class="btn-check" id="btn-check-2" autocomplete="off" />
            <label class="btn mx-1" for="btn-check-2">Přijímačky</label>
            |
            <input type="checkbox" onClick={e => handleFilter("subjects", e.target.value)} value="CJL" class="btn-check" id="btn-check-3" autocomplete="off" />
            <label class="btn mx-1" for="btn-check-3">Čeština</label>

            <input type="checkbox" onClick={e => handleFilter("subjects", e.target.value)} value="MAT" class="btn-check" id="btn-check-4" autocomplete="off" />
            <label class="btn mx-1" for="btn-check-4">Matematika</label>
            <input type="checkbox" onClick={e => handleFilter("subjects", e.target.value)} value="ANJ" class="btn-check" id="btn-check-5" autocomplete="off" />
            <label class="btn mx-1" for="btn-check-5">Angličtina</label>
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
                                                        <FaCube className="fs-3 p-1" />
                                                        <span>{test.exerciseCount ? test.exerciseCount : "?"} cvičení</span>
                                                    </div>
                                                    <div className="bg-secondary-subtle rounded mx-1 px-2">
                                                        <LiaHourglassStartSolid className="fs-3" />
                                                        <span>{test.duration ? test.duration : "?"} min</span>
                                                    </div>
                                                    <button className="btn btn-secondary btn-sm" onClick={e => createTestSession(test)} data-bs-toggle="modal" data-bs-target="#loadingModal" disabled={!test.exerciseCount || !test.duration || !canStartTest}><FaArrowRight /></button>
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