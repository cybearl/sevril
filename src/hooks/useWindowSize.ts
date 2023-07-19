import { useEffect, useState } from "react";


type IsWindowSize = {
    width: number;
    height: number;
};

/**
 * Get the current window size.
 * @returns The current window size.
 */
export default function useWindowSize(): IsWindowSize {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    } as IsWindowSize);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}