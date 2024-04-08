//@ts-nocheck
"use client"

import { supabase } from "@/api";
import { useEffect, useState } from "react"

const CategoryAddPage = () => {
    const [subcategory, setSubcategory] = useState({});
    const [categories, setCategories] = useState([]);
    const saveSubcategory = (key, value) => {
        setSubcategory({ ...test, [key]: value })
    }
    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('ucebnice_categories')
            .select('*')
        if (error) alert(error.message);
        setCategories(data);
    }
    useEffect(() => {
        fetchCategories();
    }, [])
    return (
        <div>
            <h1>Přidat subkategorii</h1>
            ID<input type="text" onChange={e => saveSubcategory("id", e.target.value)} />(zobrazí se jako URL - sanyl.cz/nová-kategorie/) <br />
            Název <input type="text" onChange={e => saveSubcategory("name", e.target.value)} /> <br />

        </div>
    )
}

export default CategoryAddPage