import type { Metadata } from "next";
import "@/app/prehled/layout.scss"
import { MdQueryStats } from "react-icons/md";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { RiHistoryFill } from "react-icons/ri";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function PrehledLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const sidebarLinks = [
        {
            title: "Váš přehled",
            href: "/",
            icon: <MdQueryStats />
        },
        {
            title: "Historie testů",
            href: "/tests",
            icon: <RiHistoryFill />
        }
    ]

    return (
        <div className="d-flex flex-row">
            <div className="bg-secondary-subtle col-2 sidebar p-2 min-vh-100">
                <Link href={"/prehled/"}>
                    <button className="btn p-2 my-1 fw-bold w-100 text-start">
                        <span className="me-2">Vy</span>
                        <IoIosArrowForward className="fs-4" />
                    </button>
                </Link>
                {sidebarLinks.map((link, index) => (
                    <Link key={index} href={"/prehled" + link.href}>
                        <button className="btn p-2 my-1">
                            <span>{link.icon}</span>
                            <span className="ms-1">{link.title}</span>
                        </button>
                    </Link>
                ))}
            </div>
            <div className="col-10 children p-2" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div >
    );
}
