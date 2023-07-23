import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";


export type C_Matrix = {
    lastInputValue: string;
    setLastInputValue: Dispatch<SetStateAction<string>>;
};

export const MatrixContext = createContext({} as C_Matrix);

export const MatrixProvider = ({ children }: { children: ReactNode; }) => {
    const [lastInputValue, setLastInputValue] = useState("");

    const context = {
        lastInputValue,
        setLastInputValue
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