import React, { useContext } from "react";

interface GridContextState {
    patternSize: number;
}

export const defaultGridContext: GridContextState = {
    patternSize: 32,
};

export const GridContext = React.createContext<GridContextState>(defaultGridContext);

export function useGridContext() {
    return useContext(GridContext);
}
