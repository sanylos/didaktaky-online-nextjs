//@ts-nocheck
"use client"
import { FaSearch } from "react-icons/fa";
import Navigation from "./Navigation"
import { useEffect, useState } from "react";
import Link from "next/link";

const NavigationSearch = ({ data }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [filter, setFilter] = useState("");
    const getFilteredContent = () => {
        let contentArray = [];
        data.map((category) => (
            category.ucebnice_subcategories.map((subcategory) => (
                subcategory.ucebnice_category_content.map((content) => (
                    content.name.includes(filter) ?
                        contentArray.push(content) : console.log("neobsahuje " + filter)
                ))
            ))
        ))
        return contentArray;
    }
    useEffect(() => {
        setFilteredData(getFilteredContent());
    }, [filter])
    return (
        <div className="mb-1 bg-light rounded">
            <div className="input-group">
                <input onChange={e => setFilter(e.target.value)} type="text" className="form-control" placeholder="Hledat" aria-label="Vyhledavani" aria-describedby="button-addon1" />
                <button className="btn btn-light" type="button" id="button-addon1"><FaSearch /></button>
            </div>
            {!filter == "" &&
                <div className="mt-1">
                    {filteredData.map(content => (
                        <div key={content.id}>
                            <div className="d-flex aling-items-center">
                                <h5><Link style={{ textDecoration: 'none' }} href={'/ucebnice/' + content.id}>{content.name}</Link></h5>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default NavigationSearch