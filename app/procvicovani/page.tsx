"use client"
import RoundedCard from "../components/UI/RoundedCard"
import { FaCircleArrowRight } from "react-icons/fa6";
import SelectionCard from "../components/procvicovani/SelectionCard";

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

    const handleFilter = () => {

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
                    <SelectionCard title="PŘIJÍMACÍ ZKOUŠKA" options={options['PZ']} handleFilter={handleFilter} />
                </div>
                <div className="container mb-1">
                    <SelectionCard title="MATURITNÍ ZKOUŠKA" options={options['MZ']} handleFilter={handleFilter} />
                </div>
            </div>
        </div>
    )
}

export default ProcvicovaniPage