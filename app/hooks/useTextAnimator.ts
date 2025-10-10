import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { TextSplitter } from '../textSplitter';

const lettersAndSymbols: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$',
    '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ',',
];

interface AnimatorOptions {
    blinkOnEnd?: boolean;
    text: string;
}

export const useTextAnimator = (textElementRef: RefObject<HTMLElement | null>, options: AnimatorOptions) => {
    const splitterRef = useRef<TextSplitter | null>(null);
    const originalCharsRef = useRef<string[]>([]);

    const isAnimatingRef = useRef(false);

    useEffect(() => {
        const element = textElementRef.current;
        if (!element) return;

        gsap.killTweensOf(element.querySelectorAll('.char'));

        splitterRef.current = new TextSplitter(element, { splitTypeTypes: 'words, chars' });
        originalCharsRef.current = splitterRef.current.getChars().map(char => char.innerHTML);

        return () => {
            gsap.killTweensOf(element.querySelectorAll('.char'));
        };
    }, [textElementRef, options.text]);

    const animate = useCallback((): void => {
        if (!splitterRef.current || isAnimatingRef.current) return;

        isAnimatingRef.current = true;

        const chars = splitterRef.current.getChars();

        const timeline = gsap.timeline({
            onComplete: () => {
                isAnimatingRef.current = false;

                if (!options.blinkOnEnd) {
                    chars[chars.length - 1].classList.remove('active-cursor');
                }
            }
        });

        chars.forEach((char, position) => {
            const initialHTML = originalCharsRef.current[position];

            timeline.fromTo(char,
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
                    repeat: 3,
                    onRepeat: () => {
                        gsap.set(char, { '--opa': 0 });
                    },
                    repeatRefresh: true,
                    repeatDelay: 0.02,
                    innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
                    opacity: 1,
                },
                position * 0.03
            ).set(char, { innerHTML: initialHTML, delay: 0.03 }, position * 0.03 + 0.02 * 3 + 0.02 * 3);
        });

    }, [options.blinkOnEnd, textElementRef]);

    return { animate };
};
