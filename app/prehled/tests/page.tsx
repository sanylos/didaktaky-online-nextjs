// @ts-nocheck
"use client"
import { supabase } from "@/api";
import { useUser } from "@/app/UserContext";
import { useEffect, useState } from "react";
import { getNameByShortcut } from "@/app/utils/shortcutHandler";
import { LuHistory } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import Link from "next/link";

const TestsPage = () => {
    const [tests, setTests] = useState([]);
    const { userData } = useUser();
    async function getUserTests() {
        if (userData) {
            console.log("fetching")
            const { data, error } = await supabase
                .from('userTests')
                .select('*')
                .eq('user_id', userData.user.id)
                .order('created_at', { ascending: false })
                .range(tests.length, tests.length + 5)

            let testsCopy = [...tests];
            testsCopy.push(...data);
            setTests(testsCopy);
        }
    }
    const days = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
    useEffect(() => {
        getUserTests();
    }, [userData])

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >
                document.documentElement.offsetHeight
            ) {
                getUserTests();
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [tests]);

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <div>
                    <span className="fw-bold fs-2">Poslední vyplněné testy</span>
                </div>
                {tests && tests.map((test, index) => (
                    <div key={index} className="my-2">
                        <span>
                            {
                                (new Date(test.created_at).getFullYear() === new Date().getFullYear() &&
                                    new Date(test.created_at).getMonth() === new Date().getMonth() &&
                                    new Date(test.created_at).getDay() === new Date().getDay()) ?
                                    <span className="fs-3 fw-bold">Dnes</span>
                                    :
                                    <span className="fs-3 fw-bold">
                                        <span className="me-1">{days[new Date(test.submitted_at).getDay()-1].slice(0, 2)}</span>
                                        <span className="me-1">{new Date(test.submitted_at).getDate()}.</span>
                                        <span className="me-1">{new Date(test.submitted_at).getMonth()+1}.</span>
                                    </span>
                            }
                        </span>
                        <div className="card bg-secondary-subtle border-secondary shadow-lg" style={{ width: '25rem' }}>
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
                            <div className="card-footer">
                                <small className="text-body-secondary d-flex justify-content-between">
                                    <div>
                                        <span className="me-1">{days[new Date(test.submitted_at).getDay()-1]},</span>
                                        <span className="me-1">{new Date(test.submitted_at).getDate()}.</span>
                                        <span className="me-1">{new Date(test.submitted_at).getMonth()+1}.</span>
                                    </div>
                                    <span className="me-1">
                                        {new Date(test.submitted_at).getHours()}:
                                        {new Date(test.submitted_at).getMinutes()}
                                    </span>
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TestsPage