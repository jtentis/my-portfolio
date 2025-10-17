import React from "react";
import { Link } from "react-router";

export function ButtonWithIcon({
    link,
    icon,
    target,
    title
}: {
    link?: any;
    icon?: any;
    target?: string;
    title?: string;
}) {
    return (
        <Link
            target={target}
            to={link}
            title={title}
            className="navLinksHome group xl:hover:bg-secondary xl:hover:dark:bg-primary"
        >
            <span className="group-hover-icon-fill">
                {React.cloneElement(icon, {size: 14})}
            </span>
        </Link>
    );
}
