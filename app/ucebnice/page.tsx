//@ts-nocheck
import './page.scss'
import { FaCheck } from "react-icons/fa";

const UcebnicePage = () => {
    const pros = [
        "Aktuální učební osnovy: Mějte přehled o tom, co se na zkouškách z češtiny, angličtiny a matematiky bude objevovat.",
        "Komplexní příprava: Nabízíme vše, co potřebujete pro úspěšné složení maturitních a přijímacích zkoušek.",
        "Spolehlivé a kvalitní materiály: Všechny materiály jsou pečlivě vybírány a kontrolovány odborníky.",
        "Flexibilní studium: Učte se svým tempem a způsobem, který vám vyhovuje.",

    ]
    return (
        <div className="d-flex flex-column main">
            <div className='p-1'>
                <h1 className='mb-0'>Elektronická učebnice</h1>
                <h5>Hledáte komplexní přípravu na maturitní a přijímací zkoušky z češtiny, angličtiny a matematiky? Pak jste na správném místě! Nabízíme rozsáhlou sbírku materiálů, učebních osnov a témat, která vám pomohou dosáhnout vašich cílů.</h5>
            </div>
            <div>
                {pros.map((item, index) => (
                    <div key={index} class="error text-white mb-1 mx-1">
                        <div class="error__icon d-flex align-items-center">
                            <FaCheck className='text-success fs-4' />
                        </div>
                        <div class="error__title">{item}</div>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default UcebnicePage