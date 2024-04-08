//@ts-nocheck
"use client"

import { useState } from "react"

const CategoryAddPage = () => {
    const [subcategory, setSubcategory] = useState();
    const saveSubcategory = (key, value) => {
        setSubcategory({ ...test, [key]: value })
    }
    return (
        <div>
            <h1>Přidat subkategorii</h1>

        </div>
    )
}

export default CategoryAddPage