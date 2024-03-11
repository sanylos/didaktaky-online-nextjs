// @ts-nocheck
"use client"

import "@/app/prehled/layout.scss"
import { MdQueryStats } from "react-icons/md";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { RiHistoryFill } from "react-icons/ri";
import { AiOutlineTrophy } from "react-icons/ai";
import { supabase } from "@/api";
import { useEffect, useState } from "react";

export default function UcebniceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [data, setData] = useState();

    const getSidebarContent = async () => {
        const { data, error } = await supabase
            .from('ucebnice_categories')
            .select('*, ucebnice_subcategories(*, ucebnice_category_content(*))')
        console.log(error);
        console.log(data);
        setData(data);

    }

    useEffect(() => {
        getSidebarContent();
    }, [])

    return (
        <div className="d-flex flex-row">
            <div className="bg-secondary-subtle col-2 sidebar p-2 min-vh-100">
                {data && data.map(subject => (
                    <div key={subject.id}>
                        <button className="fs-3 fw-bold btn p-0" data-bs-toggle="collapse" href="#collapseCathegories" role="button" aria-expanded="false" aria-controls="collapseExample">
                            {subject.name}
                        </button>
                        <div className="collapse" id="collapseCathegories">
                            {subject.cathegories.map(cathegory => (
                                <div key={cathegory.id}>
                                    <button className="fs-5 fw-bold btn p-0" data-bs-toggle="collapse" href="#collapseCathegoryContent" role="button" aria-expanded="false" aria-controls="collapseExample">
                                        {cathegory.name}
                                    </button>
                                    <div className="collapse" id="collapseCathegoryContent">
                                        {cathegory.cathegory_content.map(content => (
                                            <div key={content.id}>
                                                <Link href={'/ucebnice/' + content.id}>{content.name}</Link>
                                            </div>
                                        ))}
                                    </div>
                                    <hr></hr>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-10 children p-2" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div >
    );
}
