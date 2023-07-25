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
        value: props.defaultValue || "",
        textAreaRef: useRef<HTMLTextAreaElement>(null)
    });

    const {
        setLastInputValue,
        setHistory
    } = useContext(MatrixContext);

    // Auto-size text area & caret area
    useTextAreaAutoSize(input.textAreaRef.current, input.value);

    // Generate formatted username
    useEffect(() => {
        setInput(input => ({
            ...input,
            username: `[${ipAddress}@SEVRIL]$`
        }));
    }, [ipAddress]);

    // Force focus on interval
    useEffect(() => {
        const interval = setInterval(() => {
            input.textAreaRef.current?.focus();
        }, 5);

        return () => {
            clearInterval(interval);
        };
    }, [input.textAreaRef]);

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
        <div className="relative w-full min-h-[1ch] sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <div className="absolute top-0 left-0 tracking-wide">
                {input.username}
            </div>

            <textarea
                className={`
                    relative z-10 w-full tracking-wide bg-transparent
                    outline-none resize-none text-glitch
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
        </div>
    );
}