import { useEffect, useState } from "react";

import useIpAddress from "@/hooks/useIpAddress";


export default function Matrix() {
    const ipAddress = useIpAddress();

    const [username, setUsername] = useState<string>("[loading..]");

    useEffect(() => {
        setUsername(
            `[${ipAddress}@sevril]$ `
        );
    }, [ipAddress]);

    return (
        <div className="w-full h-full px-6 py-5 overflow-hidden text-2xl tracking-widest">
            {username}
        </div>
    );
}