import { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import {
    FaDownload,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaRegSun,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import { ReactSVG } from "react-svg";
import { CustomHeaderButton } from "./button";
import { DownloadCv } from "./download";

function isThemeSetToDark() {
    if (typeof window === "undefined") return false;

    return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
}

function isLanguageSetToBR() {
    if (typeof window === "undefined") return false;

    return localStorage.getItem("language") === "BR";
}

export function Header() {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
    const [language, setLanguage] = useState<boolean | null>(null);

    useEffect(() => {
        const currentLanguage = isLanguageSetToBR();
        const currentTheme = isThemeSetToDark();
        setIsDarkMode(currentTheme);
        setLanguage(currentLanguage);
        console.log(currentLanguage)

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

    const toggleLanguage = () => {
        const newLanguage = !language;
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage ? "BR" : "US");
        console.log('toggle', newLanguage)
    };

    if (isDarkMode === null) {
        return null;
    }

    return (
        <main className="flex items-center justify-center relative">
            <div className="absolute left-0 flex gap-4">
                <button
                    onClick={toggleLanguage}
                    className="navLinksInternal flex gap-2 items-center"
                    type="button"
                >
                    <ReactSVG src={language ? "app/assets/flagBR.svg" : "app/assets/flagUS.svg"}></ReactSVG>
                    {language ? 'pt' : 'en'}
                </button>
                <DownloadCv>
                    <FaDownload size={15} /> currículo
                </DownloadCv>
            </div>
            <header className="bg-primary text-secondary dark:bg-secondary dark:text-primary ">
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Link
                                to="/"
                                className={`navLinksInternal ${
                                    location.pathname === "/"
                                        ? "bg-secondary border-secondary dark:border-primary text-primary dark:bg-primary dark:text-secondary"
                                        : "bg-primary dark:bg-secondary"
                                }`}
                            >
                                /início
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/projects"
                                className={`navLinksInternal ${
                                    location.pathname === "/projects"
                                        ? "bg-secondary border-secondary dark:border-primary text-primary dark:bg-primary dark:text-secondary"
                                        : "bg-primary dark:bg-secondary"
                                }`}
                            >
                                /projetos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`navLinksInternal ${
                                    location.pathname === "/about"
                                        ? "bg-secondary border-secondary dark:border-primary text-primary dark:bg-primary dark:text-secondary"
                                        : "bg-primary dark:bg-secondary"
                                }`}
                            >
                                /sobre mim
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="flex justify-between gap-4 absolute right-0">
                <CustomHeaderButton
                    icon={<FaEnvelope size={15} />}
                    link={"mailto:jps.tentis@gmail.com"}
                />
                <CustomHeaderButton
                    icon={<FaLinkedin size={15} />}
                    link={"https://www.linkedin.com/in/jtentis/"}
                />
                <CustomHeaderButton
                    icon={<FaGithub size={15} />}
                    link={"https://github.com/jtentis"}
                />
                <div className="h-[25px] self-center w-1 bg-secondary dark:bg-primary" />
                <button
                    onClick={toggleTheme}
                    className="navLinks cursor-pointer"
                >
                    {isDarkMode ? <FaRegMoon /> : <FaRegSun />}
                </button>
            </div>
        </main>
    );
}
