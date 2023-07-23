import { useContext, useEffect, useRef, useState } from "react";

import { MatrixContext } from "@/components/Contexts/MatrixContext";
import useIpAddress from "@/hooks/useIpAddress";
import useTextAreaAutoSize from "@/hooks/useTextAreaAutoSize";


export default function MatrixInput() {
    const ipAddress = useIpAddress();

    const [input, setInput] = useState({
        username: "",

        caretEnabled: true,
        caretOffset: 0,
        caret: "",

        value: "",

        usernameRef: useRef<HTMLDivElement>(null),
        textAreaRef: useRef<HTMLTextAreaElement>(null),
        caretAreaRef: useRef<HTMLTextAreaElement>(null)
    });

    const {
        setLastInputValue
    } = useContext(MatrixContext);

    // Auto-size text area & caret area
    useTextAreaAutoSize(input.textAreaRef.current, input.value);
    useTextAreaAutoSize(input.caretAreaRef.current, input.caret);

    // Generate formatted username
    useEffect(() => {
        setInput(input => ({
            ...input,
            username: `[${ipAddress}@SEVRIL]$`
        }));
    }, [ipAddress]);

    // Caret blink
    useEffect(() => {
        const interval = setInterval(() => {
            setInput(input => ({
                ...input,
                caretEnabled: true,
                caret: input.caret === "▌" ? "" : "▌"
            }));
        }, 400);

        return () => clearInterval(interval);
    }, [
        input.caretEnabled,
        input.caret
    ]);

    // Measure caret offset
    useEffect(() => {
        const caretPosition = input.textAreaRef.current?.selectionStart || 0;

        setInput(input => ({
            ...input,
            caretOffset: input.username.length + caretPosition
        }));
    }, [
        input.username,
        input.value,
        input.textAreaRef.current?.selectionStart
    ]);

    // Handle user input
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // Lock input to 128 characters
        if (value.length > 128) {
            return;
        }

        setInput(input => ({
            ...input,
            value: value
        }));
    };

    return (
        <div className="relative w-full h-full px-6 py-5 overflow-hidden sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <div className="absolute top-5 left-6 text-primary-default" ref={input.usernameRef}>
                {input.username}
            </div>

            <textarea
                className={`
                    relative z-10 border w-full overflow-hidden tracking-wide bg-transparent
                    outline-none resize-none text-primary-default text-glitch
                    ${input.caretEnabled ? "caret-transparent" : ""}
                `}
                style={{
                    textIndent: `${input.username.length + 1}ch`,
                }}
                ref={input.textAreaRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={input.value}
                rows={1}
                autoFocus
                onChange={handleTextChange}
                onBlur={handleTextChange}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        setLastInputValue(input.value);
                        setInput(input => ({
                            ...input,
                            value: ""
                        }));
                    }
                }}
            />

            <textarea
                className="absolute z-0 overflow-hidden tracking-wide bg-transparent outline-none resize-none select-none caret-transparent right-6 left-6 top-5"
                ref={input.caretAreaRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                rows={1}
                readOnly
                value={"\xa0".repeat(input.caretOffset) + input.caret}
            />
        </div>
    );
}