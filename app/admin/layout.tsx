//@ts-nocheck
"use client"
import { supabase } from "@/api";
import Link from "next/link";
import { notFound, redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) console.log(error);
            else return data;
            return null;
        }
        checkUser().then((data) => {
            if (data?.user?.email !== 'admin@sanyl.cz') {
                router.replace('/');
            };
        });
    }, [])
    return (
        <div className="d-flex flex-row">
            <div className="bg-secondary-subtle col-2 sidebar p-2 min-vh-100 d-flex flex-column">
                <Link href="/admin">Přehled</Link>
                <Link href="/admin/tests">Testy</Link>
                <Link href="/admin/exercises">Cvičení</Link>
                <Link href="/admin/textbook">Učebnice</Link>
            </div>
            <div className="col-10 children" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div >
    );
}
