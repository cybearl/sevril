import { GiHamburgerMenu } from "react-icons/gi";


export default function Header() {
    return (
        <header
            className="flex items-center justify-between h-8 tracking-[0.3rem] w-full px-6 bg-primary-default shadow-main"
        >
            <div className="text-2xl font-bold text-gray-800 sm:hidden">
                $SEVRIL::VIRTUAL
            </div>

            <div className="text-2xl font-bold text-gray-800 max-sm:hidden">
                $SEVRIL.NET::VIRTUAL
            </div>

            <div className="flex items-center justify-between w-full h-8 max-w-sm pl-4 max-md:hidden">
                <p className="text-2xl font-bold text-gray-800">...</p>
                <p className="text-2xl font-bold text-gray-800">...</p>
                <p className="text-2xl font-bold text-gray-800">...</p>
            </div>

            <div className="md:hidden">
                <GiHamburgerMenu
                    className="text-xl font-bold text-black"
                    style={{
                        filter: "drop-shadow(2px 0.5px 2px rgba(234, 54, 175, 0.6)) drop-shadow(-1px -0.5px 2px rgba(117, 250, 105, 1))"
                    }}
                />
            </div>
        </header>
    );
}