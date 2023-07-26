import useWindowSize from "@/hooks/useWindowSize";


export default function Footer() {
    const { width, height } = useWindowSize();

    return (
        <footer className="flex items-center justify-between tracking-[0.3rem] w-full px-6 pb-2 text-2xl sm:text-3xl text-gray-800">
            <p className="text-2xl text-gray-800 xs:pr-2 max-xs:text-center max-xs:w-full max-xs:pl-4">
                Cybearl
            </p>

            <p className="-mr-2 text-2xl text-gray-800 max-xs:hidden">
                {width}&nbsp;x&nbsp;{height}
            </p>
        </footer>
    );
}