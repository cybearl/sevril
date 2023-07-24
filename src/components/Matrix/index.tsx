import { useContext, useEffect, useState } from "react";

import { MatrixContext } from "@/components/Contexts/MatrixContext";
import MatrixInput from "@/components/Matrix/MatrixInput";
import MatrixText from "@/components/Matrix/MatrixText";
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
        <div className="flex flex-col px-6 mt-5 space-y-2">
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