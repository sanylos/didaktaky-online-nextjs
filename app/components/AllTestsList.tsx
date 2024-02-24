//@ts-nocheck
"use client"
import { supabase } from "@/api";
import { FaArrowRight, FaCube } from "react-icons/fa";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { FaFilter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getNameByShortcut } from "../utils/shortCutHandler";

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
        subjects: ["CJL", "MAT", "ANJ"],
        types: ["MZ", "PZ"],
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
            <div className="bg-secondary-subtle rounded m-1 p-1 d-flex justify-content-between align-items-center">
                <div>
                    <FaFilter className="mx-2 fs-4" />
                    <input type="checkbox" onChange={e => handleFilter("types", e.target.value)} checked={filter["types"].includes("MZ")} value="MZ" className="btn-check" id="btn-check-1" autoComplete="off" />
                    <label className={"btn mx-1 my-1 " + (filter["types"].includes("MZ") ? "btn-dark" : "btn-secondary")} htmlFor="btn-check-1">Maturita</label>
                    <input type="checkbox" onChange={e => handleFilter("types", e.target.value)} checked={filter["types"].includes("PZ")} value="PZ" className="btn-check" id="btn-check-2" autoComplete="off" />
                    <label className={"btn mx-1 my-1 " + (filter["types"].includes("PZ") ? "btn-dark" : "btn-secondary")} htmlFor="btn-check-2">Přijímačky</label>
                    |
                    <input type="checkbox" onChange={e => handleFilter("subjects", e.target.value)} checked={filter["subjects"].includes("CJL")} value="CJL" className="btn-check" id="btn-check-3" autoComplete="off" />
                    <label className={"btn mx-1 my-1 " + (filter["subjects"].includes("CJL") ? "btn-dark" : "btn-secondary")} htmlFor="btn-check-3">Čeština</label>
                    <input type="checkbox" onChange={e => handleFilter("subjects", e.target.value)} checked={filter["subjects"].includes("MAT")} value="MAT" className="btn-check" id="btn-check-4" autoComplete="off" />
                    <label className={"btn mx-1 my-1 " + (filter["subjects"].includes("MAT") ? "btn-dark" : "btn-secondary")} htmlFor="btn-check-4">Matematika</label>
                    <input type="checkbox" onChange={e => handleFilter("subjects", e.target.value)} checked={filter["subjects"].includes("ANJ")} value="ANJ" className="btn-check" id="btn-check-5" autoComplete="off" />
                    <label className={"btn mx-1 my-1 " + (filter["subjects"].includes("ANJ") ? "btn-dark" : "btn-secondary")} htmlFor="btn-check-5">Angličtina</label>
                </div>
                <span className="me-1 fst-italic">Výsledky pro {filter["types"].map((type, index) => (
                    <span key={type}>{getNameByShortcut(type)}
                        {filter["types"].length === index + 1 ? "" : <span> a </span>}
                    </span>
                ))}
                    {filter["subjects"].map((subject, index) => (
                        <span key={subject}>
                            {index == 0 ? <span> z </span> : <span>, z </span>}
                            {getNameByShortcut(subject)}
                        </span>
                    ))}
                </span>
            </div>
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