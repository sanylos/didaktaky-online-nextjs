// @ts-nocheck

import "@/app/ucebnice/layout.scss"
import { supabase } from "@/api";
import Navigation from "../components/ucebnice/Navigation";

export async function getContent() {
    const { data, error } = await supabase
        .from('ucebnice_categories')
        .select('*, ucebnice_subcategories(*, ucebnice_category_content(*))')
    return data;
}

export const revalidate = 60;

export default async function UcebniceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = await getContent();
    return (
        <div className="d-flex flex-row">
            <div className="bg-blue-5 col-2 sidebar p-2 min-vh-100">
                <Navigation data={data} name="UcebniceLayout"></Navigation>
            </div>
            <div className="col-10 children" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div >
    );
}
