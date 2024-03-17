// @ts-nocheck
'use client';
import { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation';
import './Navbar.scss';
import { useUser } from '../UserContext';
import { links } from '@/app/data/links'

const Navbar = () => {
    const { userData, logout } = useUser();
    const path = usePathname();
    const isLinkActive = (href: string) => { // returns true if pathname is equal to passed href
        return path.split("/").includes(href);
    }

    const handleLogout = () => {
        logout();
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
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            {links.map(({ href, label }) => (
                                <li className="nav-item m-1" key={href}>
                                    <Link className={`nav-link p-1 rounded ${isLinkActive(href) ? 'active' : ''}`} href={"/" + href}>
                                        <span>{label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex flex-row">
                            <a className="bg-dark rounded rounded-pill btn btn-secondary btn-outline-secondary text-white px-3 mx-1"
                                href="https://www.buymeacoffee.com/sanyl"><i className="bi bi-cup-hot-fill"></i> PODPORA PROJEKTU</a>

                            {!userData &&
                                <Link href="/auth" type="button" className="btn btn-light rounded-pill px-3 mx-1">Přihlásit se</Link>
                            }
                            {userData &&
                                <div v-if="userStore.isLoggedIn" className="dropdown mx-1">
                                    <button className="text-white bg-dark rounded rounded-pill btn-secondary btn btn-outline-secondary px-3"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span><i className="bi bi-person-check"></i> {userData?.user?.email}</span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a onClick={handleLogout} className="dropdown-item text-danger" href="#">Odhlásit se</a></li>
                                    </ul>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </nav >
        </>
    )
}

export default Navbar;