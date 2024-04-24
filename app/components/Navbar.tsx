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
            <nav className="navbar navbar-expand-lg bg-blue-5 shadow-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-semibold text-blue-1 p-1" href="/">DIDAKTAKY <sub>ONLINE</sub></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav align-items-center">
                            {links.map(link => (
                                <li key={link.href} className={"nav-item m-1" + (link.dropdown?.length > 0 && ' dropdown')}>
                                    <Link data-bs-toggle={link.dropdown?.length > 0 && "dropdown"} className={`nav-link p-1 rounded ${isLinkActive(link.href) ? 'active' : ''} ${link.dropdown?.length > 0 && ' dropdown-toggle'}`} href={"/" + link.href}>
                                        <span>{link.label}</span>
                                    </Link>
                                    {link.dropdown?.length > 0 &&
                                        <ul className="dropdown-menu bg-blue-5">
                                            <li>
                                                <Link className='dropdown-item' href={"/" + link.href}>
                                                    <span>{link.label}</span>
                                                </Link>
                                            </li>
                                            <li><hr class="dropdown-divider" /></li>
                                            {link.dropdown?.map(dropdownLink => (
                                                <li key={dropdownLink.href}>
                                                    <Link className='dropdown-item' href={"/" + link.href + "/" + dropdownLink.href}>
                                                        <span>{dropdownLink.label}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </li>
                            ))}

                        </ul>
                        <div className="d-flex flex-row">
                            <a className="bg-blue-3 rounded rounded-pill btn btn-secondary btn-outline-blue-5 px-3 mx-1"
                                href="https://www.buymeacoffee.com/sanyl"><i className="bi bi-cup-hot-fill"></i> PODPORA PROJEKTU</a>

                            {!userData &&
                                <Link href="/auth" type="button" className="btn btn-light rounded-pill px-3 mx-1">Přihlásit se</Link>
                            }
                            {userData &&
                                <div v-if="userStore.isLoggedIn" className="dropdown mx-1">
                                    <button className="bg-blue-3 rounded rounded-pill btn-secondary btn btn-outline-blue-5 px-3"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span><i className="bi bi-person-check"></i> {userData?.user?.email}</span>
                                    </button>
                                    <ul className="dropdown-menu bg-blue-5">
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