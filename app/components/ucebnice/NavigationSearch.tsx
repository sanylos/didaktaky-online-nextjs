//@ts-nocheck
import { FaSearch } from "react-icons/fa";
import Navigation from "./Navigation"

const NavigationSearch = ({ data }) => {
    return (
        <div className='container'>
            <div className="input-group mb-1">
                <input type="text" className="form-control" placeholder="Hledat" aria-label="Vyhledavani" aria-describedby="button-addon1" />
                <button className="btn btn-light" type="button" id="button-addon1"><FaSearch /></button>
            </div>
            <Navigation data={data} name="UcebnicePage"></Navigation>
        </div>
    )
}

export default NavigationSearch