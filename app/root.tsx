import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./app.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { LanguageProvider } from "./contexts/LanguageProvider";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <html lang="pt" className="w-full h-full">
                <head>
                    {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <Meta />
                    <Links />
                </head>
                <body className="min-w-screen min-h-screen px-54 py-18 flex flex-col justify-between">
                    <Header />
                    <div className="flex-grow flex flex-col justify-center">
                        <Tabs />
                        <div className="folder-bg">
                            <main className="m-auto">{children}</main>
                        </div>
                    </div>
                    <Footer />
                    <ScrollRestoration />
                    <Scripts />
                </body>
            </html>
        </LanguageProvider>
    );
}

export default function App() {
    return <Outlet />;
}
