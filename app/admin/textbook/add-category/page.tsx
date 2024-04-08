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
            ID<input type="text" onChange={saveSubcategory("id", e.target.value)} />(zobrazí se jako URL - sanyl.cz/nová-kategorie/)
        </div>
    )
}

export default CategoryAddPage