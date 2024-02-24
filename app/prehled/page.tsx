//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { getNameByShortcut } from "../utils/shortcutHandler";
import { GrDocumentUser } from "react-icons/gr";

const Prehled = () => {
    const { userData } = useUser();
    const [tests, setTests] = useState([]);

    async function getData() {
        if (userData) {
            const res = await fetch('/api/user/' + userData.user.id + '/tests',
                {
                    method: 'GET',
                    next: { revalidate: 30 }
                })
            const { data } = await res.json();
            return data;
        }
    }
    useEffect(() => {
        getData().then(data => setTests(data));

    }, [userData])

    return <div>
        <div className="container bg-secondary-subtle mt-1 rounded p-2">
            <div className="fs-3 m-1 fw-bold d-flex align-items-center"><GrDocumentUser className="me-2 fs-5" /> Vaše testy</div>
            <table className="table table-secondary table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">TYP TESTU</th>
                        <th scope="col">PŘEDMĚT</th>
                        <th scope="col">ZÍSKÁNO/MAXIMUM BODŮ</th>
                        <th scope="col">ČAS</th>
                    </tr>
                </thead>
                <tbody>
                    {tests && tests.map((test, index) => (
                        <tr key={index}>
                            <td>{test.id}</td>
                            <td>{getNameByShortcut(test.type)}</td>
                            <td>{getNameByShortcut(test.subject)}</td>
                            <td>{test.points}/{test.maxPoints}</td>
                            <td>{((new Date(test.submitted_at).getTime() - new Date(test.created_at).getTime())/60000).toFixed(1)} min</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default Prehled;