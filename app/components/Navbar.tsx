'use client';
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';

const links = [
    { label: 'Procvičování', href: '/procvicovani' },
    { label: 'Přehled', href: '/prehled' },
    { label: 'Generování testů', href: '/test' },
];

const Navbar = () => {
    const path = usePathname();
    const isLinkActive = (href: string) => { // returns true if pathname is equal to passed href
        return path === href;
    }

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-secondary-subtle">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">DIDAKTAKY - ONLINE</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {links.map(({ href, label }) => (
                                <li className="nav-item mx-1" key={href}>
                                    <Link className={`nav-link ${isLinkActive(href) ? 'bg-dark rounded text-light' : ''}`} href={href}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;