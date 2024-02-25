//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { getNameByShortcut } from "../utils/shortcutHandler";
import { LuHistory } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { supabase } from "@/api";
import Link from "next/link";

const Prehled = () => {
    const { userData } = useUser();
    const [tests, setTests] = useState([]);

    async function getUserTests() {
        if (userData) {
            const { data, error } = await supabase
                .from('userTests')
                .select('*')
                .eq('user_id', userData.user.id)
                .order('created_at', { ascending: false })
                .range(0, 3)
            return data;
        }
    }
    useEffect(() => {
        getUserTests().then(data => setTests(data));

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
                                        <span className="badge text-bg-secondary">#{test.id}</span>
                                    </div>
                                    <div className="text-end fs-5">
                                        <span className="badge text-bg-primary fw-normal me-1">{getNameByShortcut(test.subject)}</span>
                                        <span className="badge text-bg-primary fw-normal me-1">{getNameByShortcut(test.type)}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="row">
                                        <span className="card-text">Úspěšnost: {(test.points / test.maxPoints) * 100}%</span>
                                        <span className="card-text">Čas: {((new Date(test.submitted_at).getTime() - new Date(test.created_at).getTime()) / 60000).toFixed(1)} min</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <span className="fs-4">{test.isPublic ? <HiLockOpen className="text-success" /> : <HiLockClosed className="text-danger" />}</span>
                                            {test.isPublic ? <span className="text-success fw-bold">Veřejný</span> : <span className="text-danger fw-bold">Soukromý</span>}
                                        </div>
                                        <Link href={'/test/' + test.id}><button className="btn btn-primary">Podrobnosti <IoIosArrowForward /></button></Link>
                                    </div>
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