import type { Metadata } from "next";
import "@/app/prehled/layout.scss"
import { MdQueryStats } from "react-icons/md";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { RiHistoryFill } from "react-icons/ri";
import { AiOutlineTrophy } from "react-icons/ai";
import { sidebarLinks } from "./sidebarLinks";

export default function PrehledLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="d-flex flex-row">
            <div className="bg-secondary-subtle col-2 sidebar p-2 min-vh-100">
                {sidebarLinks.map((cathegory, index) => (
                    <div key={index}>
                        <Link href={"/prehled" + cathegory.href}>
                            <button className="btn p-2 my-1 text-start fw-bold w-100">
                                <span className="ms-1">{cathegory.title}</span>
                                <IoIosArrowForward className="fs-4" />
                            </button>
                        </Link>
                        {cathegory.items.map((link, index) => (
                            <Link key={index} href={"/prehled" + link.href}>
                                <button className="btn p-2 my-1 text-start">
                                    <span>{link.icon}</span>
                                    <span className="ms-1">{link.title}</span>
                                </button>
                            </Link>
                        ))}
                        <hr />
                    </div>
                ))}
            </div>
            <div className="col-10 children p-2" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div >
    );
}
