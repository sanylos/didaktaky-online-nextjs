export const getNameByShortcut = (shortcut: string) => {
    switch (shortcut) {
        case "PZ": return "Přijímací zkouška"
        case "MZ": return "Maturitní zkouška"
        case "CJL": return "Český jazyk a literatura"
        case "MAT": return "Matematika"
        case "ANJ": return "Anglický jazyk"
        case "testVariant-1": return "1. řádný"
        case "testVariant-2": return "2. řádný"
        case "testVariant-3": return "1. náhradní"
        case "testVariant-4": return "2. náhradní"
        case "testVariant-5": return "Ilustrační"
    }
}