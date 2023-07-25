import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

import config from "@/configs/main.config";


export type MatrixContextType = {
    lastInputValue: string;
    setLastInputValue: Dispatch<SetStateAction<string>>;
    history: string[];
    setHistory: Dispatch<SetStateAction<string[]>>;
};

export const MatrixContext = createContext({} as MatrixContextType);

export const MatrixProvider = ({ children }: { children: ReactNode; }) => {
    const [lastInputValue, setLastInputValue] = useState("");
    const [history, setHistory] = useState<string[]>([]);

    const context = {
        lastInputValue,
        setLastInputValue,
        history,
        setHistory
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

    return (
        <MatrixContext.Provider value={context}>
            {children}
        </MatrixContext.Provider>
    );
};