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
            <h1>Kategorie</h1>
            {JSON.stringify(categories)}
        </div>
    )
}

export default TextbookPage