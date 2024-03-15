import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./UserContext";
import "./layout.scss"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DIDAKTAKY - ONLINE",
  description: "Didaktické testy pro přijímací zkoušky a maturitu",
  openGraph: {
    title: "DIDAKTAKY-ONLINE",
    description: "Didaktické testy pro přijímací zkoušky a maturitu"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="XGFJGSt2UvIUIIJ8J032QN6UtaocNtuErve76F5NzKA" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <Navbar></Navbar>
          <div className="app">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
