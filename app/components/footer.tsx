import { useLanguage } from "~/hooks/useLanguage";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className=" text-secondary dark:text-primary flex justify-center gap-10 xl:py-0 py-10 xl:mb-0 mb-10">
            <a href="https://github.com/jtentis/my-portfolio" target="_blank" className="footerHover">{t.footer.code}</a>
            <a href="https://www.instagram.com/tnszpj" target="_blank" className="footerHover">{t.footer.madeBy}</a>
            <a href="mailto:jps.tentis@gmail.com" className="footerHover">{t.footer.contact}</a>
        </footer>
    );
}
