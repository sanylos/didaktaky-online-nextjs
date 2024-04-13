// @ts-nocheck
import Link from 'next/link';
import { FaAngleDown } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";

const Navigation = ({ data, name, isCollapsed = true }) => {
    return (
        <>
            {
                data && data.map(category => (
                    <div key={category.id} className="rounded bg-blue-4 p-1 mb-2 text-blue-1">
                        <div className="link rounded p-1 d-flex justify-content-between align-items-center">
                            <h2 className='fw-semibold m-0'>
                                <Link className='text-blue-1 fs-4 d-flex' style={{ textDecoration: 'none' }} href={'/ucebnice/' + category.id}>{category.name}</Link>
                            </h2>
                            <div className='btn btn-blue-3 rounded-5 p-1'>
                                <FaAngleDown className="fs-4" data-bs-toggle="collapse" href={"#collapseCategories-" + name + "-" + category.id} role="button" aria-expanded="false" aria-controls="collapseExample" />
                            </div>
                        </div>
                        <div className={"collapse " + (isCollapsed || "show")} id={"collapseCategories-" + name + "-" + category.id}>
                            {category.ucebnice_subcategories.map(subcategory => (
                                <div key={subcategory.id}>
                                    <div className="link rounded p-1 d-flex align-items-center" data-bs-toggle="collapse" href={"#collapseSubcategory-" + name + "-" + subcategory.id} role="button" aria-expanded="false" aria-controls="collapseExample">
                                        <h2 className="fs-6 fw-bold">
                                            {subcategory.name}
                                        </h2>
                                        <FaAngleDown className="fs-5 mb-1 ms-1 text-blue-3" />
                                    </div>
                                    <div className={"collapse " + (isCollapsed || "show")} id={"collapseSubcategory-" + name + "-" + subcategory.id}>
                                        {subcategory.ucebnice_category_content.map(content => (
                                            <div key={content.id}>
                                                <div className="d-flex align-items-center">
                                                    <LuArrowUpRight className='fs-4 text-blue-3' />
                                                    <h2><Link className='fs-4 text-blue-2 text-nowrap' style={{}} href={'/ucebnice/' + category.id + '/' + content.id}>{content.name}</Link></h2>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Navigation