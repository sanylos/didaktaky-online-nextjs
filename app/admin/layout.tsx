"use client"
import Link from "next/link";
export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="d-flex flex-row">
            <div className="bg-secondary-subtle col-2 sidebar p-2 min-vh-100 d-flex flex-column">
                <Link href="/admin">Přehled</Link>
                <Link href="/admin/tests">Testy</Link>
                <Link href="/admin/exercises">Cvičení</Link>
            </div>
            <div className="col-10 children" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div >
    );
}
