import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";


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

    useEffect(() => {
        console.log("lastInputValue:", lastInputValue);
    }, [lastInputValue]);

    return (
        <MatrixContext.Provider value={context}>
            {children}
        </MatrixContext.Provider>
    );
};