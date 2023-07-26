import { useContext, useEffect, useState } from "react";

import { MatrixContext } from "@/components/Contexts/MatrixContext";
import MatrixInput from "@/components/Matrix/MatrixInput";
import MatrixText from "@/components/Matrix/MatrixText";
import ScrollToBottom from "@/components/Utils/ScrollToBottom";
import config from "@/configs/main.config";
import useIpAddress from "@/hooks/useIpAddress";


export default function Matrix() {
    const { history } = useContext(MatrixContext);

    const ipAddress = useIpAddress();

    const [username, setUsername] = useState(`[${ipAddress}@SEVRIL]$ `);

    // Generate formatted username
    useEffect(() => {
        setUsername(`[${ipAddress}@SEVRIL]$ `);
    }, [ipAddress]);

    return (
        <div className="fixed inset-0 flex flex-col px-6 pt-10 space-y-2 overflow-x-hidden overflow-y-scroll no-scrollbar">
            {history.map((text, index) => (
                <MatrixText
                    username={username}
                    text={text}
                    key={index}
                />
            ))}

            {history.length <= config.terminalMaxEntries && (
                <MatrixInput
                    username={username}
                />
            )}

            <ScrollToBottom />
        </div>
    );
}