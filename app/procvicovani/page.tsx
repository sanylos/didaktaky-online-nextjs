import RoundedCard from "../components/UI/RoundedCard"

const ProcvicovaniPage = () => {
    const pros = [
        { title: 'Zvýšení šancí na úspěch', text: 'Naše platforma vám pomůže dosáhnout vynikajících výsledků v přijímacích zkouškách a maturitách.' },
        { title: 'Získání sebejistoty', text: 'Trénink s reálnými otázkami a pod tlakem časového limitu vám dodá potřebnou jistotu pro zvládnutí zkoušky.' },
        { title: 'Efektivní příprava', text: 'Přizpůsobitelné testy a filtry vám umožní optimalizovat trénink a využít čas co nejefektivněji.' },
        { title: 'Lepší zvládnutí stresu', text: 'Simulace reálných podmínek zkoušky vám pomůže zvládat stres a lépe se soustředit v kritické situaci.' },
    ]
    return (
        <div>
            <h1>Získejte náskok na přijímací zkoušky a maturity s naší platformou.</h1>
            <h3 className='fw-normal fs-4'>Přijímací zkoušky a maturity představují důležité milníky v životě studenta. Úspěšné zvládnutí těchto testů otevírá dveře k vysněným oborům a kariérám. Naše webová aplikace vám pomůže dosáhnout vašich cílů a snů s maximální efektivitou a pohodlím.</h3>
            <div className="">
                {pros.map((item, index) => (
                    <RoundedCard key={index} title={item.title} text={item.text} />
                ))}
            </div>
        </div>
    )
}

export default ProcvicovaniPage