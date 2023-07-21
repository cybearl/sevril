import { useEffect, useState } from "react";

import useIpAddress from "@/hooks/useIpAddress";


export default function Matrix() {
    const ipAddress = useIpAddress();

    const [username, setUsername] = useState("[loading..]");
    const [caretOffset, setCaretOffset] = useState(0);
    const [caret, setCaret] = useState("█");
    const [input, setInput] = useState("");

    useEffect(() => {
        setUsername(`[${ipAddress}@SEVRIL]$`);
    }, [ipAddress]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCaret(caret === "█" ? "" : "█");
        }, 500);

        return () => clearInterval(interval);
    }, [caret]);

    useEffect(() => {
        setCaretOffset(username.length + input.length + 1);
    }, [username, input]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (value.length > 128) {
            return;
        }

        setInput(value);
    };

    return (
        <div className="relative w-full h-full px-6 py-5 overflow-hidden sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <div className="absolute top-5 left-6 text-primary-default">
                {username}
            </div>

            <textarea
                className="relative z-10 w-full h-full overflow-hidden bg-transparent outline-none resize-none text-primary-default text-glitch caret-transparent"
                style={{
                    textIndent: `${username.length + 1}ch`,
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={input}
                onChange={handleTextChange}
            />

            <textarea
                className="absolute z-0 bg-transparent right-6 bottom-5 left-6 top-5"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={"\xa0".repeat(caretOffset) + caret}
            />
        </div>
    );
}