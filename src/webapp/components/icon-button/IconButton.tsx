import React from "react";
import "./icon-button.css";

interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
    title: string; // Accessibility (Axe: Name Role Value)
    icon: React.ReactNode;
    onClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = React.memo(props => {
    const { icon, onClick, title, className } = props;

    const classNames = ["icon-button", className].join(" ");

    return (
        <button type="button" className={classNames} onClick={onClick} title={title}>
            {icon}
        </button>
    );
});
