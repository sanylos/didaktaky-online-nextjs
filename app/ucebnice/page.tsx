//@ts-nocheck
import './page.scss'
import { FaCheck } from "react-icons/fa";
import { supabase } from '@/api';
import Navigation from '../components/ucebnice/Navigation';
import { FaSearch } from "react-icons/fa";
import NavigationSearch from '../components/ucebnice/NavigationSearch';

export async function getContent() {
    const { data, error } = await supabase
        .from('ucebnice_categories')
        .select('*, ucebnice_subcategories(*, ucebnice_category_content(*))')
    return data;
}

export const UcebnicePage = async () => {
    const data = await getContent();
    const pros = [
        { title: "Aktuální osnovy výuky", text: "Zaručujeme aktuální informace o obsahu zkoušek z češtiny, angličtiny a matematiky, abyste byli dobře připraveni." },
        { title: "Komplexní příprava na zkoušky", text: "Poskytujeme kompletní sadu materiálů a metod pro úspěšné absolvování maturity i přijímacích zkoušek." },
        { title: "Kvalitní studijní materiály", text: "Naše materiály pro výuku jsou pečlivě vybrány a ověřeny odborníky, abyste měli jistotu kvality." },
        { title: "Flexibilní výuka", text: "Možnost učit se podle vlastního tempa a přizpůsobit si studium svým potřebám a preferencím." },
    ]
    return (
        <div className="d-flex flex-column main">
            <div className='p-1 shadow-lg mb-2'>
                <h1 className='mb-0 fw-bold'>Elektronická učebnice</h1>
                <h5>Hledáte komplexní přípravu na maturitní a přijímací zkoušky z češtiny, angličtiny a matematiky? Pak jste na správném místě! Nabízíme rozsáhlou sbírku materiálů, učebních osnov a témat, která vám pomohou dosáhnout vašich cílů.</h5>
            </div>
            <div className='p-1'>
                {pros.map((item, index) => (
                    <div key={index} className="box text-white mb-1 mx-1">
                        <div className="ms-1 box__icon">
                            <FaCheck className='text-success fs-4' />
                        </div>
                        <div className='d-flex flex-column'>
                            <h5 className="box__title ms-1 mb-0">{item.title}</h5>
                            <p className="ms-1 mb-0">{item.text}</p>
                        </div>
                    </div>

                ))}
            </div>
            <div className='mt-3 p-1'>
                <h2 className='text-center'>Obsah učebnice</h2>
                <div className='container'>
                    <NavigationSearch data={data} />
                    <Navigation data={data} name="UcebnicePage"></Navigation>
                </div>
            </div>
        </div>
    )
}

export default UcebnicePage