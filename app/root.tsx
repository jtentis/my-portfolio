import { useEffect, useState } from "react";
import { Links, Meta, Outlet, Scripts, useLocation } from "react-router";
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

    return (
        <html lang={t.language} className="w-full h-full">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body
                className={`min-w-screen min-h-screen px-54 py-18 flex flex-col justify-between ${
                    isLoading ? "loading" : "loaded"
                }`}
            >
                <Header />
                <div className="flex flex-col justify-center">
                    <Tabs />
                    <div className="folder-bg">
                        <Title title={currentTitle} />
                        <main>{children}</main>
                    </div>
                </div>
                <Footer />
                <Scripts />
            </body>
        </html>
    );
};

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
