import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router";
import { AsciiField } from "~/components/ascii-field";
import { useLanguage } from "~/hooks/useLanguage";
import { CONTACTS } from "~/lib/contacts";
import { scramble } from "~/lib/scramble";
import "~/styles/home.css";

export default function Home() {
    const { t } = useLanguage();
    const intro = useRef<HTMLDivElement>(null);
    const hero = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        document.title = t.home.title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", t.home.description);
    }, [t.home.title, t.home.description]);

    useEffect(() => {
        if (hero.current) scramble(hero.current, "João Tentis", 420);
    }, []);

    return (
        <section className="view home-view">
            <AsciiField intro={intro} hero={hero} />
            <div className="home-intro" ref={intro}>
                <p className="home-status e" style={{ "--i": 0 } as CSSProperties}>
                    <span className="home-dot" aria-hidden="true" />
                    {t.home.status}
                </p>
                <p className="home-lede e" style={{ "--i": 1 } as CSSProperties}>
                    {t.home.lede}
                </p>
                <div className="home-ctas e" style={{ "--i": 2 } as CSSProperties}>
                    <Link to="/projects" className="btn btn-primary">
                        {t.home.primaryCta}
                    </Link>
                    <a className="btn" href={t.curriculum.link} target="_blank" rel="noopener">
                        {t.home.secondaryCta}
                    </a>
                </div>
                <p className="home-contacts e" style={{ "--i": 3 } as CSSProperties}>
                    <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
                    <a href={CONTACTS.github} target="_blank" rel="noopener">
                        github
                    </a>
                    <a href={CONTACTS.linkedin} target="_blank" rel="noopener">
                        linkedin
                    </a>
                    <a href={t.curriculum.link} target="_blank" rel="noopener">
                        {t.curriculum.name}
                    </a>
                </p>
            </div>
            <h1 className="home-hero" ref={hero}>
                João Tentis
            </h1>
        </section>
    );
}
