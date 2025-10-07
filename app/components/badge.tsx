import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
    return (
        <div
            className={`border border-secondary dark:border-primary font-mono text-xs px-2 py-1 rounded-md ${
                className ?? ""
            }`}
            {...props}
        />
    );
}

export { Badge };
