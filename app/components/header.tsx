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
    const [pageTitle, setPageTitle] = useState("");
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

    useEffect(() => {
        const titles: Record<string, string> = {
            "/": "/início",
            "/about": "/sobre mim",
            "/projects": "/projetos",
        };

        setPageTitle(titles[location.pathname] || "Página não encontrada");
    }, [location]);

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

    if (isDarkMode === null) {
        return null;
    }

    return (
        <main className="flex items-center justify-around pt-16 pb-4">
            <div className="flex gap-4">
                <button
                    className="navLinksInternal flex gap-2 items-center"
                    type="button"
                >
                    <ReactSVG
                        src="../public/flag.svg"
                    ></ReactSVG>
                    pt
                </button>
                <button
                    className="navLinksInternal flex gap-2 items-center"
                    type="button"
                >
                    <FaDownload></FaDownload> currículo
                </button>
            </div>
            <header className="bg-primary text-secondary dark:bg-secondary dark:text-primary">
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
            <div className="flex justify-between gap-4">
                <CustomHeaderButton
                    icon={<FaEnvelope />}
                    link={"mailto:jps.tentis@gmail.com"}
                />
                <CustomHeaderButton
                    icon={<FaLinkedin />}
                    link={"https://www.linkedin.com/in/jtentis/"}
                />
                <CustomHeaderButton
                    icon={<FaGithub />}
                    link={"https://github.com/jtentis"}
                />
                <div className="h-[25px] self-center w-1 bg-secondary dark:bg-primary" />
                <button
                    onClick={toggleTheme}
                    className="navLinks cursor-pointer"
                >
                    {isDarkMode ? (
                        <FaRegMoon/>
                    ) : (
                        <FaRegSun/>
                    )}
                </button>
            </div>
        </main>
    );
}
