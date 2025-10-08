// src/hooks/useTextAnimator.ts
import { gsap } from 'gsap';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { TextSplitter } from '../textSplitter';

const lettersAndSymbols: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$',
    '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ',',
];

interface AnimatorOptions {
    blinkOnEnd?: boolean;
}

export const useTextAnimator = (textElementRef: RefObject<HTMLElement | null>, options: AnimatorOptions = {}) => {
    const splitterRef = useRef<TextSplitter | null>(null);
    const originalCharsRef = useRef<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const element = textElementRef.current;
        if (!element) return;

        splitterRef.current = new TextSplitter(element, { splitTypeTypes: 'words, chars' });
        originalCharsRef.current = splitterRef.current.getChars().map(char => char.innerHTML);

        return () => {
            gsap.killTweensOf(element.querySelectorAll('.char'));
        };
    }, [textElementRef]);

    const animate = (): void => {
        if (!splitterRef.current || isAnimating) return;

        setIsAnimating(true);

        const chars = splitterRef.current.getChars();
        chars.forEach((char, position) => {
            const initialHTML = originalCharsRef.current[position];
            let repeatCount = 0;

            gsap.fromTo(char,
                { opacity: 0 },
                {
                    duration: 0.02,
                    onStart: () => {
                        gsap.set(char, { '--opa': 1 });
                        char.classList.add('active-cursor');
                        if (position > 0) {
                            chars[position - 1].classList.remove('active-cursor');
                        }
                    },
                    onComplete: () => {
                        gsap.set(char, { innerHTML: initialHTML, delay: 0.03 });
                        if (position === chars.length - 1) {
                            setIsAnimating(false);
                            if (!options.blinkOnEnd) {
                                chars[position].classList.remove('active-cursor');
                            }
                        }
                    },
                    repeat: 3,
                    onRepeat: () => {
                        repeatCount++;
                        if (repeatCount === 1) {
                            gsap.set(char, { '--opa': 0 });
                        }
                    },
                    repeatRefresh: true,
                    repeatDelay: 0.02,
                    delay: position * 0.03,
                    innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
                    opacity: 1,
                }
            );
        });
    };

    return { animate };
};