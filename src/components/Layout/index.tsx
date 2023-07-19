import { ReactNode } from "react";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";


export default function Layout({ children }: { children: ReactNode; }) {
    return (
        <div className="flex flex-col w-screen h-screen crt bg-main text-primary-default">
            <Header />

            <main className="w-full h-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}