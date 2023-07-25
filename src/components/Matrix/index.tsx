import { useContext, useEffect, useRef, useState } from "react";

import { MatrixContext } from "@/components/Contexts/MatrixContext";
import MatrixInput from "@/components/Matrix/MatrixInput";
import MatrixText from "@/components/Matrix/MatrixText";
import useIpAddress from "@/hooks/useIpAddress";


export default function Matrix() {
    const { history } = useContext(MatrixContext);

    const ipAddress = useIpAddress();
    const terminalFooter = useRef<HTMLDivElement>(null);

    const [username, setUsername] = useState(`[${ipAddress}@SEVRIL]$ `);

    // Generate formatted username
    useEffect(() => {
        setUsername(`[${ipAddress}@SEVRIL]$ `);
    }, [ipAddress]);

    return (
        <div
            className="absolute left-0 right-0 flex flex-col px-6 space-y-2 overflow-x-hidden overflow-y-scroll border top-4 bottom-12"
            onKeyDown={e => {
                if (e.key === "Enter") {
                    e.preventDefault();

                    terminalFooter.current?.scrollIntoView({
                        behavior: "instant"
                    });
                }
            }}
        >
            {history.map((text, index) => (
                <MatrixText
                    username={username}
                    text={text}
                    key={index}
                />
            ))}

            <MatrixInput
                username={username}
            />
        </div>
    );
}