import { useEffect, useState } from "react";

import useIpAddress from "@/hooks/useIpAddress";


export default function Matrix() {
    const ipAddress = useIpAddress();

    const [username, setUsername] = useState("[loading..]");
    const [caretOffset, setCaretOffset] = useState(0);
    const [caret, setCaret] = useState("█");

    const [persistentTextIndex, setPersistentTextIndex] = useState(0);
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

        // Lock input to 128 characters
        if (value.length > 128) {
            return;
        }

        // Prevent user from deleting persistent text
        if (value.length < persistentTextIndex) {
            return;
        }

        setInput(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();

            // Update persistent text index
            setPersistentTextIndex(input.length);
        }
    };

    return (
        <div className="relative w-full px-6 py-5 overflow-hidden sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <div className="absolute top-5 left-6 text-primary-default">
                {username}
            </div>

            <textarea
                className="relative z-10 w-full h-full overflow-hidden bg-transparent border border-green-500 outline-none resize-none text-primary-default text-glitch caret-transparent"
                style={{
                    textIndent: `${username.length + 1}ch`,
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={input}
                autoFocus
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            />

            <textarea
                className="absolute z-0 overflow-hidden bg-transparent border border-red-500 outline-none resize-none right-6 left-6 top-5"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                readOnly
                value={"\xa0".repeat(caretOffset) + caret}
            />
        </div>
    );
}