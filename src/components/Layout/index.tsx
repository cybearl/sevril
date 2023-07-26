import { ReactNode } from "react";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";


export default function Layout({ children }: { children: ReactNode; }) {
    return (
        <div className="relative w-full min-h-screen bg-main">
            <div className="flex flex-col text-primary-default crt">
                <Header />

                <main className="relative w-full h-[calc(100vh-2rem)] min-h-[24rem]">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}