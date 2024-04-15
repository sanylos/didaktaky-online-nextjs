export const links = [
    { label: 'Procvičování', href: 'procvicovani' },
    { label: 'Přehled', href: 'prehled' },
    { label: 'Generování testů', href: 'test' },
    { label: 'Učebnice', href: 'ucebnice' },
    { label: 'Maturitní četba', href: 'cetba' },
    {
        label: 'Maturitní zkouška', href: 'maturitni-zkouska', dropdown: [
            { label: 'Český jazyk a literatura', href: '/cesky-jazyk-a-literatura' },
            { label: 'Matematika', href: '/matematika' },
        ]
    },
];