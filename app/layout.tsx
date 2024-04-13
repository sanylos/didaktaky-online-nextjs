import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./UserContext";
import "./layout.scss"
import "@/app/scss/main.scss"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | DIDAKTAKY-ONLINE',
    default: 'DIDAKTAKY-ONLINE'
  },
  description: "Didaktické testy pro přijímací zkoušky a maturitu",
  keywords: ['Didaktické testy', 'Maturita', 'Přijímačky', 'Český jazyk a literatura', 'Matematika', 'Anglický jazyk'],
  openGraph: {
    title: "DIDAKTAKY-ONLINE",
    description: "Připravte se na přijímací zkoušky nebo maturitu online!"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
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
