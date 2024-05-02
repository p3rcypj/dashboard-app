import React from "react";
import { Grid } from "../components/grid/Grid";
import { AppContext, defaultAppContext } from "./context";
import { AppBar } from "../components/app-bar/AppBar";
import "./styles.css";

export const App = React.memo(() => {
    const [appContext, _setAppContext] = React.useState(defaultAppContext);
    const className = appContext.isMobile ? "app mobile" : "app";

    return (
        <AppContext.Provider value={appContext}>
            <div className={className}>
                <AppBar />
                <Grid />
            </div>
        </AppContext.Provider>
    );
});
