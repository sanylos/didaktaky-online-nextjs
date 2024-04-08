//@ts-nocheck
"use client"

import { supabase } from "@/api";
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
            <h1>Subkategorie</h1>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TextbookPage