import { useEffect, useState } from "react";
import { FaRegSun } from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import { CustomHeaderButton } from "./button";

export function Header() {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        const titles: Record<string, string> = {
            "/": "/início",
            "/about": "/sobre mim",
            "/projects": "/projetos",
        };

        setPageTitle(titles[location.pathname] || "Página não encontrada");
    }, [location]);

    return (
        <main className="flex items-center justify-around pt-16 pb-4">
            <div>
                <p className="navLinks pointer-events-none">{pageTitle}</p>
            </div>
            <header className="bg-primary text-secondary dark:bg-secondary dark:text-primary p-4 flex justify-between">
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Link
                                to="/"
                                className={`navLinks ${
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
                                className={`navLinks ${
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
                                className={`navLinks ${
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
            <div>
                <CustomHeaderButton
                    icon={<FaRegSun />}
                    link={"https://github.com/jtentis"}
                />
            </div>
        </main>
    );
}
