import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function Home() {
    const { t } = useLanguage();

    useEffect(() => {
        document.title = t.home.title;
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            descriptionMeta.setAttribute("content", t.home.description);
        }
    }, [t.home.title, t.home.description]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>{t.home.title}</h1>
        </div>
    );
}
