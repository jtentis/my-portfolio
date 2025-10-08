import { useEffect } from "react";
import { useLanguage } from "~/hooks/useLanguage";

export function Footer() {
    const { t } = useLanguage();
    
        useEffect(() => {
            document.title = t.projects.title;
            const descriptionMeta = document.querySelector(
                'meta[name="description"]'
            );
            if (descriptionMeta) {
                descriptionMeta.setAttribute("content", t.projects.description);
            }
        }, [t.projects.title, t.projects.description]);

    return (
        <footer className=" text-secondary dark:text-primary flex justify-center gap-10">
            <a href="https://github.com/jtentis/my-portfolio" target="_blank" className="footerHover">{t.footer.code}</a>
            <a href="https://www.instagram.com/tnszpj" target="_blank" className="footerHover">{t.footer.madeBy}</a>
            <a href="mailto:jps.tentis@gmail.com" className="footerHover">{t.footer.contact}</a>
        </footer>
    );
}
