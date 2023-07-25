import { useEffect, useState } from "react";

import config from "@/configs/main.config";


export default function useIpAddress() {
    const storedIpAddress = localStorage.getItem(config.ipAddressLocalStorageKey);
    const initialIpAddress = storedIpAddress || config.ipAddressPlaceholder;
    const [ipAddress, setIPAddress] = useState(initialIpAddress);

    useEffect(() => {
        if (!storedIpAddress) {
            fetch("https://api.ipify.org?format=json")
                .then(response => response.json())
                .then(data => {
                    const ipAddressFromAPI = data.ip;

                    setIPAddress(ipAddressFromAPI);
                    localStorage.setItem(config.ipAddressLocalStorageKey, ipAddressFromAPI);
                })
                .catch(() => {
                    setIPAddress(config.ipAddressPlaceholder);
                });
        }
    }, []);

    return ipAddress;
}