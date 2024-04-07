"use client"

import Link from "next/link"

const ExercisesPage = () => {
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <h1>Cvičení</h1>
            <Link href="/admin/exercises/add">
                <button className='btn btn-info p-3 m-1'>Přidat nové cvičení</button>
            </Link>
        </div>
    )
}

export default ExercisesPage