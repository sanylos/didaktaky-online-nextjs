import { FaCheck } from "react-icons/fa";
import './RoundedCard.scss'
const RoundedCard = ({ title, text }: { title: string, text: string }) => {
    return (
        <div className="box text-white mb-1 mx-1">
            <div className="ms-1 box__icon">
                <FaCheck className='text-success fs-4' />
            </div>
            <div className='d-flex flex-column'>
                <h5 className="box__title ms-1 mb-0">{title}</h5>
                <p className="ms-1 mb-0">{text}</p>
            </div>
        </div>
    )
}

export default RoundedCard