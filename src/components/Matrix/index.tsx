import { useEffect, useRef, useState } from "react";

import useIpAddress from "@/hooks/useIpAddress";


export default function Matrix() {
    const ipAddress = useIpAddress();

    const [username, setUsername] = useState("[loading..]");
    const [caret, setCaret] = useState(" █");
    const [input, setInput] = useState("");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setUsername(`[${ipAddress}@SEVRIL]$`);
    }, [ipAddress]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCaret(caret === " █" ? "" : " █");
        }, 500);

        return () => clearInterval(interval);
    }, [caret]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = input.length;
        }
    }, [input]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.slice(0, -1);

        if (value.includes("█")) {
            console.log("nope");
        }

        if (value.length > 128) {
            return;
        }

        setInput(value);
    };

    return (
        <div className="relative w-full h-full px-6 py-5 overflow-hidden sm:text-2xl max-sm:text-xl">
            <div className="absolute top-5 left-6 text-primary-default">
                {username}
            </div>

            <textarea
                className="relative w-full h-full overflow-hidden bg-transparent outline-none resize-none text-primary-default text-glitch caret-transparent"
                style={{
                    textIndent: `${username.length + 1}ch`,
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={input + caret}
                onChange={handleTextChange}
                ref={textAreaRef}
            />
        </div>
    );
}