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
            {articles?.map(article => (
                <Article key={article} article={article}></Article>
            ))}
        </div>
    )
}

export default SubcathegoryPage