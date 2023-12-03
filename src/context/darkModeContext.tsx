import { createContext, Dispatch, useMemo, useReducer, FC, SetStateAction } from "react";
import * as React from 'react';

import { IModeState, DarkModeReducer, IModeAction } from "./darkModeReducer";

const INITIAL_STATE: IModeState = {
    darkMode: false
}

interface ThemeContextType {
    darkTheme: boolean;
    setDarkTheme: Dispatch<IModeAction>;
}

interface IProps {
    children: React.ReactNode;
}

export const DarkContext = createContext<ThemeContextType>({
    darkTheme: false,
    setDarkTheme: () => { }, // no-op default setter
});

export const DarkModeContextProvider: FC<IProps> = ({ children }) => {
    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE)
    return (
        <DarkContext.Provider value={{ darkTheme: state.darkMode, setDarkTheme: dispatch }}>
            {children}
        </DarkContext.Provider >
    );
};