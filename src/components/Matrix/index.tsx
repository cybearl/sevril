import { useEffect, useRef, useState } from "react";

import useIpAddress from "@/hooks/useIpAddress";
import useWindowSize from "@/hooks/useWindowSize";


export default function Matrix() {
    const { width } = useWindowSize();                                  // Window width
    const ipAddress = useIpAddress();                                   // IP address

    const [username, setUsername] = useState("[loading..]");            // Username
    const [caretOffset, setCaretOffset] = useState(0);                  // Offset of caret from left
    const [caret, setCaret] = useState("█");                            // Caret character (blinking)

    const [persistentTextIndex, setPersistentTextIndex] = useState(0);  // Index of persistent text
    const [input, setInput] = useState("");                             // User input

    const [charWidth, setCharWidth] = useState(0);                      // Width of a single character
    const [charPerLine, setCharPerLine] = useState(0);                  // Number of characters per line

    const usernameRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Generate formatted username
    useEffect(() => {
        setUsername(`[${ipAddress}@SEVRIL]$`);
    }, [ipAddress]);

    // Caret blink
    useEffect(() => {
        const interval = setInterval(() => {
            setCaret(caret === "█" ? " " : "█");
        }, 500);

        return () => clearInterval(interval);
    }, [caret]);

    // Measure caret offset
    useEffect(() => {
        const caretPosition = textAreaRef.current?.selectionStart || 0;
        setCaretOffset(username.length + caretPosition + 1);
    }, [username, input, textAreaRef.current?.selectionStart]);

    // Measure character width from username
    useEffect(() => {
        const handleResize = () => {
            if (usernameRef.current) {
                setCharWidth(Math.ceil(usernameRef.current.clientWidth / username.length));
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [username]);

    // Measure max number of characters per line
    useEffect(() => {
        const handleResize = () => {
            const textArea = document.querySelector("textarea");

            if (textArea && charWidth > 0) {
                setCharPerLine(Math.floor(textArea.clientWidth / charWidth));
                console.log(Math.floor(textArea.clientWidth / charWidth) - username.length + 3);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    // Handle user input
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
        <div className="relative w-full h-full px-6 py-5 overflow-hidden sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <div className="absolute top-5 left-6 text-primary-default" ref={usernameRef}>
                {username}
            </div>

            <textarea
                className="relative z-10 w-full h-full overflow-hidden tracking-wide bg-transparent outline-none resize-none text-primary-default text-glitch caret-transparent"
                style={{
                    textIndent: `${username.length + 1}ch`,
                }}
                ref={textAreaRef}
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
                className="absolute z-0 overflow-hidden bg-transparent outline-none resize-none select-none bottom-5 right-6 left-6 top-5"
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