"use client"

import { supabase } from "@/api"
import Link from "next/link"
import { useEffect } from "react"

const AdminPage = () => {
    return (
        <div>
            <h1>Přehled</h1>
            <h5>Co chceš přidat?</h5>
            <ul>
                <li><Link href="admin/tests/add">Test</Link></li>
                <li><Link href="admin/exercises/add">Cvičení</Link></li>
                <li><Link href="admin/textbook">Část učebnice</Link></li>
            </ul>
        </div>
    )
}

export default AdminPage