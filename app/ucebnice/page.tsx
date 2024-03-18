//@ts-nocheck
import './page.scss'
import { FaCheck } from "react-icons/fa";

const UcebnicePage = () => {
    const pros = [
        "Aktuální osnovy výuky: Zaručujeme aktuální informace o obsahu zkoušek z češtiny, angličtiny a matematiky, abyste byli dobře připraveni.",
        "Komplexní příprava na zkoušky: Poskytujeme kompletní sadu materiálů a metod pro úspěšné absolvování maturity i přijímacích zkoušek.",
        "Kvalitní studijní materiály: Naše materiály pro výuku jsou pečlivě vybrány a ověřeny odborníky, abyste měli jistotu kvality.",
        "Flexibilní výuka: Možnost učit se podle vlastního tempa a přizpůsobit si studium svým potřebám a preferencím.",
    ]
    return (
        <div className="d-flex flex-column main">
            <div className='p-1'>
                <h1 className='mb-0'>Elektronická učebnice</h1>
                <h5>Hledáte komplexní přípravu na maturitní a přijímací zkoušky z češtiny, angličtiny a matematiky? Pak jste na správném místě! Nabízíme rozsáhlou sbírku materiálů, učebních osnov a témat, která vám pomohou dosáhnout vašich cílů.</h5>
            </div>
            <div>
                {pros.map((item, index) => (
                    <div key={index} class="box text-white mb-1 mx-1">
                        <div class="ms-1 box__icon">
                            <FaCheck className='text-success fs-4' />
                        </div>
                        <h5 class="box__title ms-1">{item}</h5>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default UcebnicePage