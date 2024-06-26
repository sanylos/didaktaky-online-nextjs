"use client"
import { getNameByShortcut } from "@/app/utils/shortcutHandler"
import { FaCircleArrowRight } from "react-icons/fa6"

const SelectionCard = ({ examType, options, title, handleFilter }: { examType: string, options: Array<string>, title: string, handleFilter: (examType: string, option: string) => void }) => {
    return (
        <div className="card bg-secondary-subtle border-0 w-auto" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">PŘEDMĚTY</h6>
                <div>
                    {options.map((option, index) => (
                        <div key={index} className="bg-light mb-1 rounded p-1 d-flex justify-content-between align-items-center">
                            <span className="fs-3">{getNameByShortcut(option)}</span><button className="btn p-1 btn-outline-light m-1 text-dark" onClick={() => handleFilter(examType, option)}><FaCircleArrowRight className="fs-3" /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectionCard