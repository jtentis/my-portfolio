import clsx from 'clsx';
import React from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

interface ThemeToggleButtonProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

/**
 * A self-contained button component to toggle the theme.
 * It dynamically renders the Moon or Sun icon and includes all necessary styling.
 * The external 'button' tag is removed, as this component renders it internally.
 */
export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
    isDarkMode,
    toggleTheme,
}) => {
    
    // Define the icon that should be displayed
    const Icon = isDarkMode ? FaRegMoon : FaRegSun;

    // Define the base and hover styles for the button itself
    const buttonClasses = clsx(
        "navLinksHome cursor-pointer transition-all",
        "hover:bg-secondary hover:dark:bg-primary", // Button background hover
        "group" // Necessary for the group-hover effect on the icon
    );
    
    // Icon size is handled by the wrapper span
    const iconWrapperClasses = clsx(
        "transition-all",
        // The custom CSS utility to change the icon color on hover
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
