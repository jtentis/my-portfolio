import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function Home() {
    const { t } = useLanguage();

    useEffect(() => {
        document.title = t.home.title;
        const descriptionMeta = document.querySelector(
            'meta[name="description"]'
        );
        if (descriptionMeta) {
            descriptionMeta.setAttribute("content", t.home.description);
        }
    }, [t.home.title, t.home.description]);

    return (
        <div className="flex flex-col justify-between p-7">
            <div className="mb-5">
                <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <h1 className="font-bold">{t.home.title}</h1>
                    <div className="w-full border-b-2 self-center border-dashed border-secondary/20 dark:border-primary/20" />
                </div>
            </div>
        </div>
    );
}
