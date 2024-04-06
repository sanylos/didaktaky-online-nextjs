//@ts-nocheck
"use client"

import { supabase } from "@/api"
import { useState } from "react"

const TestPreviewPage = ({ params }) => {
    const [exercises, setExercises] = useState([]);
    const fetchExercises = async () => {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .eq('test_id', params.id)
    }
    fetchExercises();
    return (
        <div>TestPreviewPage
            
        </div>
    )
}

export default TestPreviewPage