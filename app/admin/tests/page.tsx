//@ts-nocheck
"use client"
import { supabase } from '@/api';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

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
    const deleteTest = async (id) => {
        const { error } = await supabase
            .from('tests')
            .delete()
            .eq('id', id);
        if (error) alert(error.message);
        else fetchTests();
    }
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h1>Testy</h1>
                <Link href="/admin/tests/add">
                    <button className='btn btn-info p-3 m-1'>Přidat nový test</button>
                </Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">TYP</th>
                        <th score="col">ROK</th>
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
                            <td>{test.year}</td>
                            <td>{test.subject}</td>
                            <td>{test.variant}</td>
                            <td>{test.duration}</td>
                            <td>{test.exerciseCount}</td>
                            <td>{test.isPublic ? "DOSTUPNÝ" : "NEDOSTUPNÝ"}</td>
                            <td>
                                <button onClick={() => changeTestState(test.id, test.isPublic)} className='btn btn-warning'>Změnit stav</button>
                                <Link href={"/admin/tests/" + test.id}>
                                    <button onClick={() => changeTestState(test.id, test.isPublic)} className='btn btn-success ms-1'>Náhled</button>
                                </Link>
                                <button onClick={() => deleteTest(test.id)} className='btn btn-danger ms-1'>Smazat</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TestsPage