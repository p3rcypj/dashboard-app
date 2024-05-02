import React from "react";
import "./text-button.css";

interface TextButtonProps {
    text: string;
    onClick: () => void;
}

export const TextButton: React.FC<TextButtonProps> = React.memo(({ text, onClick }) => {
    return (
        <button className="text-button" onClick={onClick}>
            {text}
        </button>
    );
});
