import { useEffect, useState } from "react";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import { useLanguage } from "../hooks/useLanguage";
import { DownloadCv } from "./download";
import { ButtonWithIcon } from "./icon";
import { ToggleLanguageButton } from "./language-toggle";
import { ThemeToggleButton } from "./theme-toggle";

function isThemeSetToDark() {
    if (typeof window === "undefined") return false;

    return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
}

export function Header() {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
    const { language, toggleLanguage, t, isLoading } = useLanguage();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const currentTheme = isThemeSetToDark();
        setIsDarkMode(currentTheme);

        if (currentTheme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !Boolean(isDarkMode);
        setIsDarkMode(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");

        if (newTheme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    if (isDarkMode === null || isLoading) {
        return null;
    }

    return (
        <>
            {/* Mobile header (small screens) - unchanged desktop appearance for md+ */}
            <header className="xl:hidden w-full">
                <div className="flex items-center justify-between border-2 rounded-2xl p-4 bg-secondary dark:bg-primary mb-4">
                    <div className="flex items-center gap-2">
                        <button
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((s) => !s)}
                            className="p-2 border-2 rounded bg-secondary dark:bg-primary text-primary dark:text-secondary"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 12h18"></path>
                                <path d="M3 6h18"></path>
                                <path d="M3 18h18"></path>
                            </svg>
                        </button>
                    </div>
                        <div className="flex items-center gap-4 bg-secondary dark:bg-primary">
                            <ToggleLanguageButton />
                            <ThemeToggleButton isDarkMode={Boolean(isDarkMode)} toggleTheme={toggleTheme} />
                        </div>
                </div>

                {mobileOpen && (
                    <div className="w-full py-4 rounded-2xl p-4 bg-secondary/50 dark:bg-primary/50 mb-4">
                        <ul className="flex flex-col gap-3">
                            <li>
                                <Link to="/" className="navLinksInternal w-full block text-center" onClick={() => setMobileOpen(false)}>
                                    {t.nav.home}
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" className="navLinksInternal w-full block text-center" onClick={() => setMobileOpen(false)}>
                                    {t.nav.projects}
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="navLinksInternal w-full block text-center" onClick={() => setMobileOpen(false)}>
                                    {t.nav.about}
                                </Link>
                            </li>
                            <li className="flex items-center gap-2 pt-2">
                                <DownloadCv>
                                    <FaDownload size={14} /> {t.curriculum.name}
                                </DownloadCv>
                                <div className="ml-auto flex items-center gap-2">
                                    <ButtonWithIcon target="_blank" icon={<FaEnvelope />} link={"mailto:jps.tentis@gmail.com"} />
                                    <ButtonWithIcon target="_blank" icon={<FaLinkedin />} link={"https://www.linkedin.com/in/jtentis/"} />
                                    <ButtonWithIcon target="_blank" icon={<FaGithub />} link={"https://github.com/jtentis"} />
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
            <main className="hidden xl:flex items-center justify-center relative">
                <div className="absolute left-0 flex gap-4">
                    <ToggleLanguageButton />
                    <DownloadCv>
                        <FaDownload size={14} /> {t.curriculum.name}
                    </DownloadCv>
                </div>
                <header className="">
                    <nav>
                        <ul className="flex gap-4">
                            <li>
                                <Link
                                    to="/"
                                    className={`navLinksInternal w-[80px] ${
                                        location.pathname === "/"
                                            ? "bg-secondary border-secondary dark:border-primary text-primary dark:bg-primary dark:text-secondary"
                                            : "bg-primary dark:bg-secondary"
                                    }`}
                                >
                                    {t.nav.home}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/projects"
                                    className={`navLinksInternal w-[100px] ${
                                        location.pathname === "/projects"
                                            ? "bg-secondary border-secondary dark:border-primary text-primary dark:bg-primary dark:text-secondary"
                                            : "bg-primary dark:bg-secondary"
                                    }`}
                                >
                                    {t.nav.projects}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className={`navLinksInternal w-[80px] ${
                                        location.pathname === "/about"
                                            ? "bg-secondary border-secondary dark:border-primary text-primary dark:bg-primary dark:text-secondary"
                                            : "bg-primary dark:bg-secondary"
                                    }`}
                                >
                                    {t.nav.about}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="flex justify-between gap-4 absolute right-0">
                    <ButtonWithIcon
                        target="_blank"
                        icon={<FaEnvelope />}
                        link={"mailto:jps.tentis@gmail.com"}
                    />
                    <ButtonWithIcon
                        target="_blank"
                        icon={<FaLinkedin />}
                        link={"https://www.linkedin.com/in/jtentis/"}
                    />
                    <ButtonWithIcon
                        target="_blank"
                        icon={<FaGithub />}
                        link={"https://github.com/jtentis"}
                    />
                    <div className="h-[25px] self-center w-1 bg-secondary dark:bg-primary" />
                    <ThemeToggleButton isDarkMode={!!isDarkMode} toggleTheme={toggleTheme} />
                </div>
            </main>
        </>
    );
}

export default Header;
