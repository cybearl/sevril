import { useEffect, useState } from "react";


export default function useIpAddress() {
    const [ipAddress, setIPAddress] = useState("unknown");

    useEffect(() => {
        fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(data => setIPAddress(data.ip))
            .catch((err) => {
                setIPAddress("unknown");
                console.error(err);
            });
    }, []);

    return ipAddress;
}