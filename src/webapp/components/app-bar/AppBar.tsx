import React from "react";
import "./app-bar.css";
import { TextButton } from "../text-button/TextButton";
import { useAppContext } from "../../app/context";

export const AppBar: React.FC = React.memo(() => {
    const { isMobile } = useAppContext();

    return (
        <div className="app-bar">
            {isMobile ? (
                <TextButton text="search" onClick={() => {}} />
            ) : (
                <input className="search-bar" type="text" placeholder="search" tabIndex={0} />
            )}
            <TextButton text="config" onClick={() => {}} />
        </div>
    );
});
