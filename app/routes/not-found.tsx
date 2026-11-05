import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useLanguage } from "~/hooks/useLanguage";
import { scramble } from "~/lib/scramble";

export default function NotFound() {
    const { t } = useLanguage();
    const codeRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        document.title = t.notFound.title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", t.notFound.path);
    }, [t]);

    useEffect(() => {
        if (codeRef.current) scramble(codeRef.current, "404", 420);
    }, []);

    return (
        <section className="view shell-404">
            <div className="shell-404-box e">
                <p className="shell-404-code" ref={codeRef} />
                <p className="shell-404-msg">{t.notFound.message}</p>
                <p className="shell-404-path">{t.notFound.path}</p>
                <Link to="/" className="btn btn-primary">
                    {t.notFound.return}
                </Link>
            </div>
        </section>
    );
}
