import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import "../app.css";
import { useTextAnimator } from "../hooks/useTextAnimator";

interface TextAnimatorProps {
    text: string;
    className?: string;
    blinkOnEnd?: boolean;
}

export const TextAnimator: React.FC<TextAnimatorProps> = ({
    text,
    className,
    blinkOnEnd
}) => {
    const textRef = useRef<HTMLParagraphElement | null>(null);
    const { animate } = useTextAnimator(textRef, { blinkOnEnd, text });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            animate();
        }, 100);
        return () => clearTimeout(timeoutId);
    }, [text, animate]);

    return (
        <h1
            ref={textRef}
            className={clsx(
                "hover-effect hover-effect--cursor-square",
                className
            )}
            onMouseEnter={animate}
        >
            {text}
        </h1>
    );
};
