import type { Metadata } from "next";
import "@/app/prehled/layout.scss"
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function PrehledLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="d-flex flex-row">
            <div className="bg-secondary-subtle col-2 sidebar">
                <div>Vy</div>
                <div>Historie testů</div>
                <div>Historie cvičení</div>
            </div>
            <div className="col-10 children p-2" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div>
    );
}
