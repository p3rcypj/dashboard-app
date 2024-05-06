import React from "react";
import "./text-button.css";

interface TextButtonProps extends React.HTMLProps<HTMLButtonElement> {
    text: string;
    onClick: () => void;
}

export const TextButton: React.FC<TextButtonProps> = React.memo(({ text, onClick, className }) => {
    const classNames = ["text-button", className].join(" ");

    return (
        <button type="button" className={classNames} onClick={onClick}>
            {text}
        </button>
    );
});
