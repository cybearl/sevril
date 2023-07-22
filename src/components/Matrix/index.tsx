import { useEffect, useRef, useState } from "react";

import useIpAddress from "@/hooks/useIpAddress";
import useTextAreaAutoSize from "@/hooks/useTextAreaAutoSize";


export default function Matrix() {
    const ipAddress = useIpAddress();                                   // IP address

    const [matrix, setMatrix] = useState({
        username: "",

        caretEnabled: true,
        caretOffset: 0,
        caret: "█",

        value: "",

        usernameRef: useRef<HTMLDivElement>(null),
        textAreaRef: useRef<HTMLTextAreaElement>(null),
        caretAreaRef: useRef<HTMLTextAreaElement>(null)
    });

    // Auto-size text area & caret area
    useTextAreaAutoSize(matrix.textAreaRef.current, matrix.value);
    useTextAreaAutoSize(matrix.caretAreaRef.current, matrix.caret);

    // Generate formatted username
    useEffect(() => {
        setMatrix(matrix => ({
            ...matrix,
            username: `[${ipAddress}@SEVRIL]$`
        }));
    }, [ipAddress]);

    // Caret blink
    useEffect(() => {
        const interval = setInterval(() => {
            if (
                !matrix.textAreaRef.current?.selectionStart ||
                (
                    matrix.textAreaRef.current?.selectionStart &&
                    matrix.value.length > matrix.textAreaRef.current?.selectionStart
                )
            ) {
                // Removes the custom caret while not at the end of the user input
                setMatrix(matrix => ({
                    ...matrix,
                    caret: ""
                }));

                // Enable normal caret by disabling the custom caret
                setMatrix(matrix => ({
                    ...matrix,
                    caretEnabled: false
                }));
            } else {
                setMatrix(matrix => ({
                    ...matrix,
                    caretEnabled: true,
                    caret: matrix.caret === "█" ? "" : "█"
                }));
            }
        }, 450);

        return () => clearInterval(interval);
    }, [matrix.caretEnabled, matrix.caret]);

    // Measure caret offset
    useEffect(() => {
        const caretPosition = matrix.textAreaRef.current?.selectionStart || 0;

        setMatrix(matrix => ({
            ...matrix,
            caretOffset: matrix.username.length + caretPosition
        }));
    }, [
        matrix.username,
        matrix.value,
        matrix.textAreaRef.current?.selectionStart
    ]);

    // Handle user input
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // Lock input to 128 characters
        if (value.length > 128) {
            return;
        }

        setMatrix(matrix => ({
            ...matrix,
            value: value
        }));
    };

    return (
        <div className="relative w-full h-full px-6 py-5 overflow-hidden sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <div className="absolute top-5 left-6 text-primary-default" ref={matrix.usernameRef}>
                {matrix.username}
            </div>

            <textarea
                className={`
                    relative z-10 w-full overflow-hidden tracking-wide bg-transparent
                    outline-none resize-none text-primary-default text-glitch
                    ${matrix.caretEnabled ? "caret-transparent" : ""}
                `}
                style={{
                    textIndent: `${matrix.username.length + 1}ch`,
                }}
                ref={matrix.textAreaRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={matrix.value}
                rows={1}
                autoFocus
                onChange={handleTextChange}
            />

            <textarea
                className="absolute z-0 -ml-[1px] overflow-hidden tracking-wide caret-transparent bg-transparent outline-none resize-none select-none right-6 left-6 top-5"
                ref={matrix.caretAreaRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                rows={1}
                readOnly
                value={"\xa0".repeat(matrix.caretOffset) + matrix.caret}
            />
        </div>
    );
}