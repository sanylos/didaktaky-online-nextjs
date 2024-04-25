"use client"

import { supabase } from "@/api";
import { useEffect, useState } from "react"

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
            <h1>SubcathegoryPage</h1>
            {JSON.stringify(articles)}
        </div>
    )
}

export default SubcathegoryPage