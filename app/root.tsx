import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./app.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt" className="w-full h-full">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="min-w-screen min-h-screen px-54 py-18 flex flex-col justify-between">
                <Header />
                <main className="m-auto">{children}</main>
                <ScrollRestoration />
                <Scripts />
                <Footer />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
