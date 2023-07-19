import useWindowSize from "@/hooks/useWindowSize";


export default function Footer() {
    const { width, height } = useWindowSize();

    return (
        <footer className="absolute bottom-0 left-0 flex items-center justify-between tracking-[0.3rem] w-full px-6 pb-2 text-2xl sm:text-3xl text-gray-800">
            <p>
                Cybearl
            </p>

            <p className="-mr-1">
                {width}&nbsp;x&nbsp;{height}
            </p>
        </footer>
    );
}