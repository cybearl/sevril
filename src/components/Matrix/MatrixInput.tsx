import { useContext, useEffect, useRef, useState } from "react";

import { MatrixContext } from "@/components/Contexts/MatrixContext";
import useIpAddress from "@/hooks/useIpAddress";
import useTextAreaAutoSize from "@/hooks/useTextAreaAutoSize";


type MatrixInputProps = {
    username: string;
    defaultValue?: string;
};

export default function MatrixInput(props: MatrixInputProps) {
    const ipAddress = useIpAddress();

    const [input, setInput] = useState({
        username: props.username,

        caretEnabled: true,
        caretOffsetInvisibleText: "",
        caret: "",

        value: props.defaultValue || "",

        textAreaRef: useRef<HTMLTextAreaElement>(null),
        caretAreaRef: useRef<HTMLTextAreaElement>(null)
    });

    const {
        setLastInputValue,
        setHistory
    } = useContext(MatrixContext);

    // Auto-size text area & caret area
    useTextAreaAutoSize(input.textAreaRef.current, input.value);
    useTextAreaAutoSize(input.caretAreaRef.current, input.value);

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
            caretOffsetInvisibleText: " ".repeat(caretPosition)
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

        console.log(JSON.stringify(value));

        setInput(input => ({
            ...input,
            value: value
        }));
    };

    return (
        <div className="relative w-full overflow-hidden sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <div className="absolute top-0 left-0 tracking-wide">
                {input.username}
            </div>

            <textarea
                className={`
                    relative z-10 w-full overflow-hidden tracking-wide bg-transparent
                    outline-none resize-none text-glitch
                    ${input.caretEnabled ? "caret-transparent" : ""}
                `}
                style={{
                    textIndent: `${input.username.length + 3}ch`,
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
                        e.preventDefault();

                        setLastInputValue(input.value);
                        setHistory(history => [
                            ...history,
                            input.value
                        ]);

                        setInput(input => ({
                            ...input,
                            value: ""
                        }));
                    }
                }}
            />

            <textarea
                className="absolute top-0 bottom-0 left-0 right-0 z-0 overflow-hidden tracking-wide bg-transparent outline-none resize-none select-none text-glitch caret-transparent"
                ref={input.caretAreaRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                rows={1}
                readOnly
                value={input.value + input.caret}
            />
        </div>
    );
}