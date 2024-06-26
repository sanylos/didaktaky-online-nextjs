//@ts-nocheck
"use client"

import { supabase } from "@/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const CategoryAddPage = () => {
    const [subcategory, setSubcategory] = useState({});
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const saveSubcategory = (key, value) => {
        setSubcategory({ ...subcategory, [key]: value })
    }
    const insertSubcategory = async () => {
        const { data, error } = await supabase
            .from('ucebnice_category_content')
            .insert({ ...subcategory })
        if (error) alert(error.message + JSON.stringify(subcategory));
        else router.replace('/admin/textbook');
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
            Kategorie <select onChange={e => saveSubcategory("category_id", e.target.value)} defaultValue={null}>
                <option value="null">vyber možnost</option>
                {categories?.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select> <br />
            Meta title <textarea type="text" onChange={e => saveSubcategory("meta_title", e.target.value)} /> ({subcategory["meta_title"]?.length}/60 znaků) <br />
            Meta description<textarea type="text" onChange={e => saveSubcategory("meta_description", e.target.value)} /> ({subcategory["meta_description"]?.length}/150 znaků) <br />
            <button onClick={insertSubcategory} className="btn btn-success">Přidat</button>
        </div>
    )
}

export default CategoryAddPage