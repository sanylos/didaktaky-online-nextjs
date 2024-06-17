export type NavLink = { label: string, href: string, dropdown?: NavLink[] };

export const links = [
    { label: 'Procvičování', href: 'procvicovani' },
    { label: 'Přehled', href: 'prehled' },
    { label: 'Generování testů', href: 'test' },
    { label: 'Učebnice', href: 'ucebnice' },
    {
        label: 'Přijímací zkouška', href: 'prijimaci-zkouska', dropdown: [
            { label: 'Český jazyk a literatura', href: 'cesky-jazyk-a-literatura' },
            { label: 'Matematika', href: 'matematika' },
        ]
    },
    {
        label: 'Maturitní zkouška', href: 'maturitni-zkouska', dropdown: [
            { label: 'Český jazyk a literatura', href: 'cesky-jazyk-a-literatura' },
            { label: 'Matematika', href: 'matematika' },
            { label: 'Anglický jazyk', href: 'anglicky-jazyk' },
        ]
    },
];