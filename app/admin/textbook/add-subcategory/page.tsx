//@ts-nocheck
"use client"

import { supabase } from "@/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const SubcategoryAddPage = () => {
    const [subcategory, setSubcategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [priorities, setPriorities] = useState([]);
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
    const fetchPriorities = async () => {
        const { data, error } = await supabase
            .from('ucebnice_subcategories')
            .select('name, order_priority')
        if (error) alert(error.message);
        else setPriorities(data);
    }
    useEffect(() => {
        fetchCategories();
        fetchPriorities();
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
            Priorita <input type="number" onChange={e => saveSubcategory("order_priority", e.target.value)} />
            <select>
                {priorities?.map(category => (
                    <option key={category.name}>{category.name} - {category.order_priority}</option>
                ))}
            </select> <br />
            <button onClick={insertSubcategory} className="btn btn-success">Přidat</button>
        </div>
    )
}

export default SubcategoryAddPage