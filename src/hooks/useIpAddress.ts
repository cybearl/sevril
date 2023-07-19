import { useEffect, useState } from "react";


export default function useIpAddress() {
    const [ipAddress, setIPAddress] = useState("");

    useEffect(() => {
        fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(data => setIPAddress(data.ip))
            .catch(() => setIPAddress("unknown"));
    }, []);

    return ipAddress;
}