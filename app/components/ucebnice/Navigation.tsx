// @ts-nocheck
import Link from 'next/link';
import { FaAngleDown } from "react-icons/fa6";
import { TbArrowRampRight3 } from "react-icons/tb";

const Navigation = ({ data, name }) => {
    return (
        <>
            {
                data && data.map(category => (
                    <div key={category.id} className="rounded bg-light p-1 mb-2">
                        <div className="link rounded p-1 d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href={"#collapseCategories-" + name + "-" + category.id} role="button" aria-expanded="false" aria-controls="collapseExample">
                            <h3 className="fw-bold">
                                {category.name}
                            </h3>
                            <FaAngleDown className="fs-3" />
                        </div>
                        <div className="collapse" id={"collapseCategories-" + name + "-" + category.id}>
                            {category.ucebnice_subcategories.map(subcategory => (
                                <div key={subcategory.id}>
                                    <div className="link rounded p-1 d-flex align-items-center" data-bs-toggle="collapse" href={"#collapseSubcategory-" + name + "-" + subcategory.id} role="button" aria-expanded="false" aria-controls="collapseExample">
                                        <h4 className="fs-5 fw-bold">
                                            {subcategory.name}
                                        </h4>
                                        <FaAngleDown className="fs-5 mb-1 ms-1" />
                                    </div>
                                    <div className="collapse" id={"collapseSubcategory-" + name + "-" + subcategory.id}>
                                        {subcategory.ucebnice_category_content.map(content => (
                                            <div key={content.id}>
                                                <div className="d-flex aling-items-center">
                                                    <TbArrowRampRight3 className="fs-4" />
                                                    <h5><Link style={{ textDecoration: 'none' }} href={'/ucebnice/' + category.id + "/" + subcategory.id + "/" + content.id}>{content.name}</Link></h5>
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