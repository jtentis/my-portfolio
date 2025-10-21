import { useCallback, useEffect, useRef, useState } from "react";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    useLocation,
    useNavigate,
} from "react-router";
import { useLanguage } from "~/hooks/useLanguage";
import "./app.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { Title } from "./components/title";
import { LanguageProvider } from "./contexts/LanguageProvider";

const routeKeyMap: { [key: string]: string } = {
    "/": "home",
    "/projects": "projects",
    "/about": "about",
};

type NavKey = "home" | "projects" | "about";

const LayoutShell = ({
    children,
    isLoading,
}: {
    children: React.ReactNode;
    isLoading: boolean;
}) => {
    const location = useLocation();
    const { t } = useLanguage();

    const routeKey = routeKeyMap[location.pathname] || "/";

    const titleKey = routeKey as NavKey;
    const currentTitle =
        t.nav && t.nav[titleKey] ? t.nav[titleKey] : t.nav.notFound;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location.pathname]);

    return (
        <html lang={t.language} className="w-full h-full">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>{t.metadata.title}</title>
                <meta name="description" content={t.metadata.description} />
                <Meta />
                <Links />
            </head>
            <body
                className={`min-w-screen xl:min-h-full px-5 xl:px-54 xl:py-18 py-5 flex flex-col justify-between ${
                    isLoading ? "loading" : "loaded"
                }`}
            >
                <Header />
                <div className="flex flex-col justify-center">
                    <Tabs />
                    <FolderSwipeWrapper>
                        <div className="folder-bg">
                            <Title title={currentTitle} />
                            <main className="xl:h-[485px]">{children}</main>
                        </div>
                    </FolderSwipeWrapper>
                </div>
                <Footer />
                <Scripts />
            </body>
        </html>
    );
};

function FolderSwipeWrapper({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > screen.height * 3 / 4) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const buttonClassName = showButton ? 'scrollToTop visible' : 'scrollToTop';

    const routes = ["/", "/projects", "/about"];

    const pointer = useRef<{
        id: number;
        startX: number;
        startY: number;
        moved: boolean;
    } | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);
    const isAnimatingRef = useRef(false);

    const currentIndex = routes.indexOf(location.pathname);

    const fadeNavigate = useCallback(
        (targetPath: string) => {
            if (isAnimatingRef.current) return;

            const content =
                contentRef.current ||
                (containerRef.current?.querySelector(
                    ".folder-bg > main"
                ) as HTMLElement | null);
            if (!content) {
                navigate(targetPath);
                return;
            }

            isAnimatingRef.current = true;

            content.style.transition = "opacity 150ms ease";
            content.style.opacity = "0";

            const cleanup = (element: HTMLElement) => {
                element.style.transition = "";
                element.style.opacity = "";
            };

            const onFadeOut = () => {
                content.removeEventListener("transitionend", onFadeOut);
                navigate(targetPath);

                setTimeout(() => {
                    const newContent = containerRef.current?.querySelector(
                        ".folder-bg > main"
                    ) as HTMLElement | null;
                    if (newContent) {
                        newContent.style.opacity = "0";
                        newContent.style.transition = "opacity 150ms ease";
                        requestAnimationFrame(() => {
                            newContent.style.opacity = "1";

                            const onFadeIn = () => {
                                cleanup(newContent);
                                isAnimatingRef.current = false;
                            };
                            newContent.addEventListener(
                                "transitionend",
                                onFadeIn,
                                { once: true }
                            );
                            setTimeout(onFadeIn, 200);
                        });
                    } else {
                        cleanup(content);
                        isAnimatingRef.current = false;
                    }
                }, 50);
            };

            content.addEventListener("transitionend", onFadeOut, {
                once: true,
            });
            setTimeout(onFadeOut, 200);
        },
        [containerRef, navigate]
    );

    const goPrev = useCallback(() => {
        if (currentIndex > 0) fadeNavigate(routes[currentIndex - 1]);
    }, [currentIndex, fadeNavigate]);

    const goNext = useCallback(() => {
        if (currentIndex >= 0 && currentIndex < routes.length - 1)
            fadeNavigate(routes[currentIndex + 1]);
    }, [currentIndex, fadeNavigate]);

    const onPointerDown = useCallback((e: PointerEvent) => {
        if (
            typeof window === "undefined" ||
            !window.matchMedia("(max-width: 640px)").matches
        )
            return;
        if (isAnimatingRef.current) return;

        e.preventDefault();

        const el = containerRef.current;
        if (!el) return;

        contentRef.current = el.querySelector(
            ".folder-bg > main"
        ) as HTMLElement | null;
        if (!contentRef.current)
            contentRef.current = el.querySelector("main") as HTMLElement | null;

        pointer.current = {
            id: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            moved: false,
        };
        setDragging(true);
        el.setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: PointerEvent) => {
        if (!pointer.current || pointer.current.id !== e.pointerId) return;
        const dx = e.clientX - pointer.current.startX;
        const dy = e.clientY - pointer.current.startY;

        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
            pointer.current = null;
            return;
        }

        if (Math.abs(dx) > 20) pointer.current.moved = true;
    }, []);

    const onPointerUp = useCallback(
        (e: PointerEvent) => {
            if (!pointer.current || pointer.current.id !== e.pointerId) return;

            const dx = e.clientX - pointer.current.startX;
            const threshold = 60;

            const content = contentRef.current;

            if (pointer.current.moved && Math.abs(dx) > threshold) {
                const currentIndex = routes.indexOf(location.pathname);
                if (currentIndex === -1) {
                    pointer.current = null;
                    return;
                }

                if (dx < 0 && currentIndex < routes.length - 1) {
                    fadeNavigate(routes[currentIndex + 1]);
                } else if (dx > 0 && currentIndex > 0) {
                    fadeNavigate(routes[currentIndex - 1]);
                }
            } else if (content) {
                content.style.transition = "opacity 150ms ease";
                content.style.opacity = "1";
            }

            const el = containerRef.current;
            try {
                if (el) el.releasePointerCapture(e.pointerId);
            } catch (err) {}

            pointer.current = null;
            setDragging(false);
        },
        [location.pathname, navigate]
    );

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        try {
            if (
                typeof window !== "undefined" &&
                window.matchMedia("(max-width: 640px)").matches
            ) {
                (el as HTMLElement).style.touchAction = "pan-y";
            } else {
                (el as HTMLElement).style.touchAction = "auto";
            }
        } catch (err) {
            // ignore
        }

        el.addEventListener("pointerdown", onPointerDown, { capture: true });
        el.addEventListener("pointermove", onPointerMove, { capture: true });
        el.addEventListener("pointerup", onPointerUp, { capture: true });
        el.addEventListener("pointercancel", onPointerUp, { capture: true });

        return () => {
            el.removeEventListener("pointerdown", onPointerDown, {
                capture: true,
            });
            el.removeEventListener("pointermove", onPointerMove, {
                capture: true,
            });
            el.removeEventListener("pointerup", onPointerUp, { capture: true });
            el.removeEventListener("pointercancel", onPointerUp, {
                capture: true,
            });
        };
    }, [onPointerDown, onPointerMove, onPointerUp]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const isSmallViewport =
            window.matchMedia?.("(max-width: 640px)")?.matches;
        const isTouchDevice = !!(
            "ontouchstart" in window ||
            (navigator && (navigator as any).maxTouchPoints > 0)
        );

        if (!isSmallViewport && !isTouchDevice) {
            setShowHint(false);
            return;
        }

        setShowHint(true);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`w-full relative ${dragging ? "swipe-dragging" : ""}`}
        >
            {children}
            <div
                className={`swipe-hint fixed left-1/2 -translate-x-1/2 bottom-6 z-50 ${showHint ? "visible" : "hidden"} ${dragging ? "dragging" : ""}`}
            >
                <div className="swipe-hint-inner flex items-center gap-4 bg-secondary dark:bg-primary bg-opacity-60 text-white px-4 py-2 rounded-full">
                    <button
                        aria-label="Previous"
                        className="swipe-btn"
                        onClick={goPrev}
                        disabled={currentIndex <= 0}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 6L9 12L15 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="dots flex gap-2 pointer-events-none">
                        <span
                            className={`dot ${currentIndex === 0 ? "active" : ""}`}
                        />
                        <span
                            className={`dot ${currentIndex === 1 ? "active" : ""}`}
                        />
                        <span
                            className={`dot ${currentIndex === 2 ? "active" : ""}`}
                        />
                    </div>
                    <button
                        aria-label="Next"
                        className="swipe-btn"
                        onClick={goNext}
                        disabled={currentIndex >= routes.length - 1}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 6L15 12L9 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <button
                    className={buttonClassName}
                    onClick={scrollToTop}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15 6L9 12L15 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    return (
        <LanguageProvider>
            <LayoutShell children={children} isLoading={isLoading} />
        </LanguageProvider>
    );
}

export default function App() {
    return <Outlet />;
}
