import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

import config from "@/configs/main.config";
import handler from "@/lib/commands";


export type MatrixContextType = {
    commandIndex: number;
    setCommandIndex: Dispatch<SetStateAction<number>>;
    command: string;
    setCommand: Dispatch<SetStateAction<string>>;
    response?: string;
    setResponse: Dispatch<SetStateAction<string | undefined>>;
    history: string[];
    setHistory: Dispatch<SetStateAction<string[]>>;
    isInputLocked?: boolean;
    setIsInputLocked?: Dispatch<SetStateAction<boolean>>;
};

export const MatrixContext = createContext({} as MatrixContextType);

export const MatrixProvider = ({ children }: { children: ReactNode; }) => {
    const [commandIndex, setCommandIndex] = useState(0);
    const [command, setCommand] = useState("");
    const [response, setResponse] = useState<string>();
    const [history, setHistory] = useState<string[]>([]);
    const [isInputLocked, setIsInputLocked] = useState(false);

    const context = {
        commandIndex,           // Index of current command to force re-rendering
        setCommandIndex,        // Set index of current command
        command,                // Current command
        setCommand,             // Set current command
        response,               // Response to current command
        setResponse,            // Set response to current command
        history,                // History of commands
        setHistory,             // Set history of commands
        isInputLocked,          // Whether input is locked (while processing command)
        setIsInputLocked        // Set whether input is locked
    };

    // Limit history to 32 entries
    useEffect(() => {
        if (history.length > config.terminalMaxEntries) {
            setHistory(history => history.slice(
                history.length - config.terminalMaxEntries,
                history.length
            ));
        }
    }, [history]);

    // Handle command input, ignore empty ones
    useEffect(() => {
        if (command) {
            handler(command, commandIndex);
        }
    }, [command, commandIndex]);

    return (
        <MatrixContext.Provider value={context}>
            {children}
        </MatrixContext.Provider>
    );
};