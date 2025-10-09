import clsx from 'clsx';
import React from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

interface ThemeToggleButtonProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
    isDarkMode,
    toggleTheme,
}) => {
    
    const Icon = isDarkMode ? FaRegMoon : FaRegSun;
    
    const buttonClasses = clsx(
        "navLinksHome cursor-pointer transition-all",
        "hover:bg-secondary hover:dark:bg-primary",
        "group"
    );
    
    const iconWrapperClasses = clsx(
        "transition-all",
        "group-hover-icon-fill" 
    );

    return (
        <button
            onClick={toggleTheme}
            className={buttonClasses}
            type="button"
        >
            <span className={iconWrapperClasses}>
                <Icon size={14} />
            </span>
        </button>
    );
};
