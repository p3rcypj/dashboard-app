import React, { useContext } from "react";
import { isMobile } from "../utils/isMobile";

interface AppContextState {
    viewport: "small" | "medium" | "large";
    isMobile: boolean;
}

export const defaultAppContext: AppContextState = {
    viewport: isMobile() ? "small" : "medium",
    isMobile: isMobile(),
};

export const AppContext = React.createContext<AppContextState>(defaultAppContext);

export function useAppContext() {
    return useContext(AppContext);
}
