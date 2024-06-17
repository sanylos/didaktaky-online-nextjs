//@ts-nocheck
"use client"

import { supabase } from "@/api";
import Link from "next/link";
import { useEffect, useState } from "react"

const TextbookPage = () => {
    const [categories, setCategories] = useState<any>([]);
    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('ucebnice_category_content')
            .select('*')
        if (error) alert(error.message);
        setCategories(data);
    }
    useEffect(() => {
        fetchCategories();
    }, [])
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h1>Subkategorie</h1>
                <Link href="/admin/textbook/add-category">
                    <button className='btn btn-info p-3 m-1'>Přidat novou subkategorii</button>
                </Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Název</th>
                        <th scope="col">ID Kategorie</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.category_id}</td>
                            <td><Link href={"/admin/textbook/subcathegory/" + category.id}><button className="btn btn-outline-secondary">-&qt;</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TextbookPage