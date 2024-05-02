import React from "react";
import { Grid } from "../components/grid/Grid";
import { AppContext, defaultAppContext } from "./context";
import { AppBar } from "../components/app-bar/AppBar";

export const App = React.memo(() => {
    const [appContext, _setAppContext] = React.useState(defaultAppContext);

    return (
        <AppContext.Provider value={appContext}>
            <AppBar />
            <Grid />
        </AppContext.Provider>
    );
});
