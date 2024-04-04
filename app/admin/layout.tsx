"use client"
export default function UcebniceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="d-flex flex-row">
            <div className="bg-secondary-subtle col-2 sidebar p-2 min-vh-100">
                
            </div>
            <div className="col-10 children" style={{ maxWidth: '100vw' }}>
                {children}
            </div>
        </div >
    );
}
