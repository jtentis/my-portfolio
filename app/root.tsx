import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect, useRef, useState } from "react";
import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    useLocation,
    useNavigate,
} from "react-router";
import { LanguageProvider } from "~/contexts/LanguageProvider";
import { useLanguage } from "~/hooks/useLanguage";
import { CONTACTS } from "~/lib/contacts";
import { glide } from "~/lib/glide";
import { scramble } from "~/lib/scramble";
import "./app.css";
import "~/styles/shell.css";

/* Aplica o tema salvo (ou o do sistema) antes da primeira pintura, para não piscar. */
const THEME_SCRIPT = `try{var s=localStorage.getItem("theme"),d=s==="dark"||(!s&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}`;

const NAV = [
    { to: "/", label: "home", hint: "1" },
    { to: "/projects", label: "projects", hint: "2" },
    { to: "/about", label: "about", hint: "3" },
] as const;

function Shell({ children }: { children: React.ReactNode }) {
    const { t, language, toggleLanguage } = useLanguage();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const segRef = useRef<HTMLSpanElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLSpanElement>(null);
    const copyTimer = useRef<number | undefined>(undefined);
    const [copied, setCopied] = useState(false);

    // caminho e pílula acompanham a rota e o idioma
    useEffect(() => {
        const segment =
            pathname === "/"
                ? ""
                : pathname === "/projects"
                  ? `/${t.nav.projects}`
                  : pathname === "/about"
                    ? `/${t.nav.about}`
                    : `/${t.nav.notFound}`;
        if (segRef.current) scramble(segRef.current, segment, 240);

        const pill = pillRef.current;
        if (!pill) return;
        const active =
            navRef.current?.querySelector<HTMLElement>('[aria-current="page"]') ??
            null;
        pill.classList.toggle("off", !active);
        glide(pill, active, "x");
    }, [pathname, t]);

    // a pílula tem largura de texto: mede de novo no resize e quando as fontes chegam
    useEffect(() => {
        const place = () => {
            const active =
                navRef.current?.querySelector<HTMLElement>(
                    '[aria-current="page"]'
                ) ?? null;
            if (pillRef.current) glide(pillRef.current, active, "x");
        };
        window.addEventListener("resize", place);
        document.fonts.ready.then(place);
        return () => window.removeEventListener("resize", place);
    }, []);

    // 1/2/3 trocam de rota
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) ||
                    target.isContentEditable)
            )
                return;
            const to =
                e.key === "1"
                    ? "/"
                    : e.key === "2"
                      ? "/projects"
                      : e.key === "3"
                        ? "/about"
                        : null;
            if (to) navigate(to);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [navigate]);

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(CONTACTS.email);
            setCopied(true);
            clearTimeout(copyTimer.current);
            copyTimer.current = window.setTimeout(() => setCopied(false), 1400);
        } catch {
            window.location.href = `mailto:${CONTACTS.email}`;
        }
    };

    return (
        <html lang={language}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>{t.metadata.title}</title>
                <meta name="description" content={t.metadata.description} />
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
                <Meta />
                <Links />
            </head>
            <body>
                <div className="shell-app">
                    <header className="shell-top">
                        <Link to="/" className="shell-path">
                            <span className="shell-home">{t.shell.pathRoot}</span>
                            <span ref={segRef} />
                            <span className="caret" aria-hidden="true" />
                        </Link>
                        <nav
                            className="shell-nav"
                            aria-label={t.shell.sections}
                            ref={navRef}
                        >
                            <span
                                className="glide"
                                ref={pillRef}
                                aria-hidden="true"
                            />
                            {NAV.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    aria-current={
                                        pathname === item.to
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {t.nav[item.label]}
                                    <kbd aria-hidden="true">{item.hint}</kbd>
                                </Link>
                            ))}
                        </nav>
                        <div className="shell-icons">
                            <button
                                type="button"
                                className="shell-lang"
                                aria-label={t.header.language}
                                onClick={toggleLanguage}
                            >
                                <span key={language} className="swap">
                                    {language.toUpperCase()}
                                </span>
                            </button>
                            <button
                                type="button"
                                className="shell-icon"
                                aria-label={t.header.theme}
                                onClick={toggleTheme}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <circle cx="12" cy="12" r="8.5" />
                                    <path
                                        d="M12 3.5a8.5 8.5 0 0 1 0 17z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </div>
                    </header>
                    <main className="relative min-h-0">{children}</main>
                    <footer className="shell-foot">
                        <button
                            type="button"
                            className={`shell-link shell-copy${copied ? " ok" : ""}`}
                            title={t.shell.copyEmail}
                            onClick={copyEmail}
                        >
                            {copied ? t.shell.copied : CONTACTS.email}
                        </button>
                        <a
                            className="shell-link"
                            href={CONTACTS.github}
                            target="_blank"
                            rel="noopener"
                        >
                            github
                        </a>
                        <a
                            className="shell-link"
                            href={CONTACTS.linkedin}
                            target="_blank"
                            rel="noopener"
                        >
                            linkedin
                        </a>
                        <a
                            className="shell-link"
                            href={t.curriculum.link}
                            target="_blank"
                            rel="noopener"
                        >
                            {t.curriculum.name}
                        </a>
                        <span className="shell-spacer" />
                        <span className="shell-hint">{t.shell.shortcuts}</span>
                    </footer>
                </div>
                <Analytics />
                <SpeedInsights />
                <Scripts />
            </body>
        </html>
    );
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <Shell>{children}</Shell>
        </LanguageProvider>
    );
}

export default function App() {
    return <Outlet />;
}
