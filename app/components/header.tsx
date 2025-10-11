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
        const newTheme = !isDarkMode;
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
        <main className="flex items-center justify-center relative">
            <div className="absolute left-0 flex gap-4">
                <ToggleLanguageButton />
                <DownloadCv>
                    <FaDownload size={14} /> {t.curriculum.name}
                </DownloadCv>
            </div>
            <header className="bg-primary text-secondary dark:bg-secondary dark:text-primary ">
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
                <ThemeToggleButton
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                />
            </div>
        </main>
    );
}
