// @ts-nocheck

import "@/app/ucebnice/layout.scss"
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";
import { TbArrowRampRight3 } from "react-icons/tb";
import { supabase } from "@/api";

export async function getContent() {
    const { data, error } = await supabase
        .from('ucebnice_categories')
        .select('*, ucebnice_subcategories(*, ucebnice_category_content(*))')
    return data;
}

export const revalidate = 60;

export default async function UcebniceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = await getContent();
    return (
        <div className="d-flex flex-row">
            <div className="bg-secondary-subtle col-2 sidebar p-2 min-vh-100">
                {data && data.map(category => (
                    <div key={category.id} className="rounded bg-light p-1 mb-2">
                        <div className="link rounded p-1 d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href={"#collapseCategories" + category.id} role="button" aria-expanded="false" aria-controls="collapseExample">
                            <h3 className="fw-bold">
                                {category.name}
                            </h3>
                            <FaAngleDown className="fs-3" />
                        </div>
                        <div className="collapse" id={"collapseCategories" + category.id}>
                            {category.ucebnice_subcategories.map(subcategory => (
                                <div key={subcategory.id}>
                                    <div className="link rounded p-1 d-flex align-items-center" data-bs-toggle="collapse" href={"#collapseSubcategory" + subcategory.id} role="button" aria-expanded="false" aria-controls="collapseExample">
                                        <h4 className="fs-5 fw-bold">
                                            {subcategory.name}
                                        </h4>
                                        <FaAngleDown className="fs-5 mb-1 ms-1" />
                                    </div>
                                    <div className="collapse" id={"collapseSubcategory" + subcategory.id}>
                                        {subcategory.ucebnice_category_content.map(content => (
                                            <div key={content.id}>
                                                <div className="d-flex aling-items-center">
                                                    <TbArrowRampRight3 className="fs-4" />
                                                    <h5><Link style={{ textDecoration: 'none' }} href={'/ucebnice/' + content.id}>{content.name}</Link></h5>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-10 children" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div >
    );
}
