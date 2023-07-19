import { useEffect, useState } from "react";

import useIpAddress from "@/hooks/useIpAddress";


export default function Matrix() {
    const ipAddress = useIpAddress();

    const [username, setUsername] = useState("[loading..]");
    const [caret, setCaret] = useState(" █");
    const [input, setInput] = useState("");

    useEffect(() => {
        setUsername(`[${ipAddress}@SEVRIL]$`);
    }, [ipAddress]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCaret(caret === " █" ? "" : " █");
        }, 500);

        return () => clearInterval(interval);
    }, [caret]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (value.length > 128) {
            return;
        }

        setInput(value);
    };

    return (
        <div className="relative w-full h-full px-6 py-5 overflow-hidden">
            <div className="absolute text-2xl top-5 left-6 text-primary-default">
                {username}
            </div>

            <textarea
                className="w-full h-full overflow-hidden text-2xl bg-transparent outline-none resize-none text-primary-default text-glitch caret-transparent"
                style={{
                    textIndent: `${username.length + 1}ch`,
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={input + caret}
                onChange={handleTextChange}
            />
        </div>
    );
}