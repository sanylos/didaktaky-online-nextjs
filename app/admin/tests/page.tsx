//@ts-nocheck
"use client"
import { supabase } from '@/api';
import React, { useEffect, useState } from 'react'

const TestsPage = () => {
    const [tests, setTests] = useState<any>([]);
    const fetchTests = async () => {
        const { data, error } = await supabase
            .from('tests')
            .select('*')
            .order('id', { ascending: false })
        if (error) console.log(error)
        setTests(data);
    }
    useEffect(() => {
        fetchTests();
    }, [])
    const changeTestState = async (id, isPublic) => {
        const { error } = await supabase
            .from('tests')
            .update({
                isPublic: !isPublic
            })
            .eq('id', id)
        if (error) console.log(error);
        fetchTests();
    }
    return (
        <div>
            <h1>Testy</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">TYP</th>
                        <th scope="col">PŘEDMĚT</th>
                        <th scope="col">VARIANTA</th>
                        <th scope="col">ČAS</th>
                        <th scope="col">CVIČENÍ</th>
                        <th scope="col">DOSTUPNOST</th>
                    </tr>
                </thead>
                <tbody>
                    {tests?.map(test => (
                        <tr key={test.id}>
                            <td>{test.id}</td>
                            <td>{test.type}</td>
                            <td>{test.subject}</td>
                            <td>{test.variant}</td>
                            <td>{test.duration}</td>
                            <td>{test.exerciseCount}</td>
                            <td>{test.isPublic ? "DOSTUPNÝ" : "NEDOSTUPNÝ"}</td>
                            <td><button onClick={() => changeTestState(test.id, test.isPublic)} className='btn btn-danger'>Změnit stav</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TestsPage