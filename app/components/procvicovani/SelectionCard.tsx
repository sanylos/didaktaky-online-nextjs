"use client"

const SelectionCard = ({ options }: { options: Array<String> }) => {
    return (
        <div className="card bg-secondary-subtle border-0 w-auto" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">PŘIJÍMACÍ ZKOUŠKY</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">PŘEDMĚTY</h6>
                <div>
                    {options.map((option, index) => (
                        <div key={index} className="bg-light mb-1 rounded p-1">
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectionCard