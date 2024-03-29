import RoundedCard from "../components/UI/RoundedCard"
import { FaCircleArrowRight } from "react-icons/fa6";


const ProcvicovaniPage = () => {
    const pros = [
        { title: 'Zvýšení šancí na úspěch', text: 'Naše platforma vám pomůže dosáhnout vynikajících výsledků v přijímacích zkouškách a maturitách.' },
        { title: 'Získání sebejistoty', text: 'Trénink s reálnými otázkami a pod tlakem časového limitu vám dodá potřebnou jistotu pro zvládnutí zkoušky.' },
        { title: 'Efektivní příprava', text: 'Přizpůsobitelné testy a filtry vám umožní optimalizovat trénink a využít čas co nejefektivněji.' },
        { title: 'Lepší zvládnutí stresu', text: 'Simulace reálných podmínek zkoušky vám pomůže zvládat stres a lépe se soustředit v kritické situaci.' },
    ]
    const options = {
        PZ: ['Český jazyk a literatura', 'Matematika'],
        MZ: ['Český jazyk a literatura', 'Matematika', 'Anglický jazyk']
    }

    return (
        <div>
            <div className="container-fluid">
                <h1 className="m-0">Získejte náskok na přijímací zkoušky a maturity s naší platformou.</h1>
                <hr className="m-0 text-danger bg-danger" style={{ height: '2px' }} />
                <h3 className='fw-normal fs-4'>Přijímací zkoušky a maturity představují důležité milníky v životě studenta. Úspěšné zvládnutí těchto testů otevírá dveře k vysněným oborům a kariérám. Naše webová aplikace vám pomůže dosáhnout vašich cílů a snů s maximální efektivitou a pohodlím.</h3>
            </div>
            <div className="container-fluid">
                {pros.map((item, index) => (
                    <RoundedCard key={index} title={item.title} text={item.text} />
                ))}
            </div>
            <div className="d-flex justify-content-around flex-wrap flex-lg-nowrap mt-5">
                <div className="container mb-1">
                    <div className="card bg-secondary-subtle border-0 w-auto" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">PŘIJÍMACÍ ZKOUŠKY</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">PŘEDMĚTY</h6>
                            <div>
                                {options['PZ'].map((option, index) => (
                                    <div key={index} className="bg-light mb-1 rounded p-1 d-flex justify-content-between align-items-center">
                                        <span className="fs-3">{option}</span><FaCircleArrowRight className="fs-4 me-2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mb-1">
                    <div className="card bg-secondary-subtle border-0 w-auto" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">PŘIJÍMACÍ ZKOUŠKY</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">PŘEDMĚTY</h6>
                            <div>
                                {options['MZ'].map((option, index) => (
                                    <div key={index} className="bg-light mb-1 rounded p-1">
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcvicovaniPage