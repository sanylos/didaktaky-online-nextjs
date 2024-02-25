//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { getNameByShortcut } from "../utils/shortcutHandler";
import { LuHistory } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Prehled = () => {
    const { userData } = useUser();
    const [tests, setTests] = useState([]);

    async function getData() {
        if (userData) {
            const res = await fetch('/api/user/' + userData.user.id + '/tests?range=3',
                {
                    method: 'GET',
                    next: { revalidate: 30 }
                })
            const { data } = await res.json();
            console.log(data);
            return data;
        }
    }
    useEffect(() => {
        getData().then(data => setTests(data));

    }, [userData])

    return <div>
        <div className="container bg-secondary-subtle mt-1 rounded p-2">
            <div className="d-flex align-items-center"><LuHistory className="me-2 fs-4" /><span className="fw-bold fs-4">Poslední vyplněné testy</span></div>
            <div className="d-flex flex-nowrap" style={{ overflowX: 'auto' }}>
                {tests && tests.map((test, index) => (
                    <div key={test.id} className="me-1">
                        <div className="card bg-secondary-subtle border-secondary shadow-lg" style={{ width: '20rem' }}>
                            <div className="card-body">
                                <div className="card-title d-flex justify-content-between">
                                    <div className="">
                                        <span className="fs-5">Test</span>
                                        <span class="badge text-bg-secondary">#{test.id}</span>
                                    </div>
                                    <div className="text-end fs-5">
                                        <span class="badge text-bg-primary fw-normal me-1">{getNameByShortcut(test.subject)}</span>
                                        <span class="badge text-bg-primary fw-normal me-1">{getNameByShortcut(test.type)}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div>
                                        <span className="card-text">Úspěšnost: {(test.points / test.maxPoints) * 100}%</span>
                                    </div>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="me-1">
                    <div className="card" style={{ width: '20rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

            </div>
            {/*<div className="table-responsive">
                <table className="table table-secondary table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">TYP TESTU</th>
                            <th scope="col">PŘEDMĚT</th>
                            <th scope="col">ZÍSKÁNO/MAXIMUM BODŮ</th>
                            <th scope="col">ČAS</th>
                            <td scope="col"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {tests && tests.map((test, index) => (
                            <tr key={index}>
                                <td>{test.id}</td>
                                <td>{getNameByShortcut(test.type)}</td>
                                <td>{getNameByShortcut(test.subject)}</td>
                                <td>{test.points}/{test.maxPoints}</td>
                                <td>{((new Date(test.submitted_at).getTime() - new Date(test.created_at).getTime()) / 60000).toFixed(1)} min</td>
                                <td><Link href={'/test/' + test.id}><button className="btn btn-secondary btn-sm"><FaArrowRight /></button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>*/}
        </div>
    </div>
}

export default Prehled;