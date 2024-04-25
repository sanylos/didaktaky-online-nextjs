"use client"

import { supabase } from "@/api";
import { useEffect, useState } from "react"
import Article from "@/app/components/ucebnice/Article";

const SubcathegoryPage = ({ params }: { params: { id: number } }) => {
    const [articles, setArticles] = useState<Array<string>>([]);
    const fetchArticles = async () => {
        const { data, error } = await supabase
            .from('ucebnice_content_articles')
            .select('*')
            .eq('content_id', params.id)
        if (error) alert(error.message);
        if (data) setArticles(data);
    }
    useEffect(() => {
        fetchArticles();
    }, [])
    return (
        <div>
            <h1>Editace subkategorie <i>{params.id}</i></h1>
            <hr />
            {articles?.map(article => (
                <div key={article}>
                    <Article article={article}></Article>
                    <button className="btn w-100 btn-outline-secondary fs-2">Upravit</button>
                    <hr />
                </div>
            ))}
            <button className="btn w-100 btn-outline-secondary fs-2">Přidat</button>
        </div>
    )
}

export default SubcathegoryPage