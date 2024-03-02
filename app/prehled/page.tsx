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
import { IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/navigation";

const Prehled = () => {
    const { userData, logout } = useUser();
    const [tests, setTests] = useState([]);
    const router = useRouter();

    async function getUserTests() {
        if (userData) {
            const { data, error } = await supabase
                .from('userTests')
                .select('*')
                .eq('user_id', userData.user.id)
                .order('created_at', { ascending: false })
                .range(0, 20)
            return data;
        }
    }

    useEffect(() => {
        getUserTests().then(data => setTests(data));
    }, [userData])

    return <div>
        <div className="container bg-secondary-subtle mt-1 rounded p-2 d-flex">
            <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: "120px", height: "120px", backgroundColor: "gold" }}>
                <span className="text-white fs-1">{userData?.user.email.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="ms-3 d-flex flex-column justify-content-between">
                <div className="row">
                    <span className="fs-4 fw-bold">{userData?.user.email.split('@')[0].toUpperCase()}</span>
                    <span>{userData?.user.email}</span>
                </div>

                <div className="">
                    <button onClick={() => { logout(); router.push('/auth') }} className="btn btn-secondary rounded-pill btn-sm me-1">Přepnout účet</button>
                    <button onClick={() => { logout(); router.push('/') }} className="btn btn-secondary rounded-pill btn-sm">Odhlásit se</button>
                </div>
            </div>
        </div>
        <div className="container bg-secondary-subtle mt-1 rounded p-2">
            <div className="d-flex align-items-center justify-content-between mb-1">
                <div>
                    <LuHistory className="me-2 mb-2 fs-4" />
                    <span className="fw-bold fs-4">Poslední vyplněné testy</span>
                </div>
                <div>
                    <Link href={'/prehled/tests'}>
                        <span className="text-primary fw-bold btn border-0">Zobrazit vše</span>
                    </Link>
                </div>
            </div>
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
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="">
                                            <span className="fs-6">{test.is_public ? <HiLockOpen className="text-success" /> : <HiLockClosed className="text-danger" />}</span>
                                            {test.is_public ? <span className="text-success fw-bold">Veřejný</span> : <span className="text-danger fw-bold">Soukromý</span>}
                                        </div>
                                        <Link href={'/test/' + test.id}><button className="btn btn-sm btn-primary">Podrobnosti <IoIosArrowForward /></button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default Prehled;