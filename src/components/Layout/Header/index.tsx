import { GiHamburgerMenu } from "react-icons/gi";


export default function Header() {
    return (
        <header
            className="flex items-center justify-between tracking-[0.3rem] w-full px-6 text-2xl font-bold text-gray-800 bg-primary-default shadow-main"
        >
            <div className="sm:hidden">
                $sevril::terminal
            </div>

            <div className="max-sm:hidden">
                $sevril.net::terminal
            </div>

            <div className="flex items-center justify-between w-full h-8 max-w-sm pl-4 max-md:hidden">
                <p>AAAAAAA</p>
                <p>AAAAAAA</p>
                <p>AAAAAAA</p>
            </div>

            <div className="md:hidden">
                <GiHamburgerMenu
                    className="-mb-[1px]"
                    style={{
                        filter: "drop-shadow(2px 0.5px 2px rgba(234, 54, 175, 0.6)) drop-shadow(-1px -0.5px 2px rgba(117, 250, 105, 1))"
                    }}
                />
            </div>
        </header>
    );
}