"use client"

import { supabase } from "@/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ArticleAddPage = () => {
    const [subcategory, setSubcategory] = useState({});
    const [contents, setContents] = useState([]);
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
    const fetchContents = async () => {
        const { data, error } = await supabase
            .from('ucebnice_category_content')
            .select('*')
        if (error) alert(error.message);
        setContents(data);
    }
    useEffect(() => {
        fetchContents();
    }, [])
    return (
        <div>
            <h1>Přidat subkategorii</h1>
            ID<input type="text" onChange={e => saveSubcategory("id", e.target.value)} />(zobrazí se jako href v URL - sanyl.cz/kateogorie<b>#nový-href</b>) <br />
            Název <input type="text" onChange={e => saveSubcategory("name", e.target.value)} /> <br />
            Rodič (parent) <select onChange={e => saveSubcategory("content_id", e.target.value)} defaultValue={null}>
                <option value="null">vyber možnost</option>
                {contents?.map(content => (
                    <option key={content.id} value={content.id}>{content.name}</option>
                ))}
            </select> <br />
            Nadpis <input type="text" onChange={e => saveSubcategory("title", e.target.value)} />
            <button onClick={insertSubcategory} className="btn btn-success">Přidat</button>
        </div>
    )
}

export default ArticleAddPage