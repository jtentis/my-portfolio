import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

const AboutMe = () => {
    const { t } = useLanguage();

    useEffect(() => {
        document.title = t.about.title;
        const descriptionMeta = document.querySelector(
            'meta[name="description"]'
        );
        if (descriptionMeta) {
            descriptionMeta.setAttribute("content", t.about.description);
        }
    }, [t.about.title, t.about.description]);

    return (
        <div className="flex flex-col justify-between p-7">
            <div className="mb-5">
                <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <h1 className="font-bold">{t.about.title}</h1>
                    <div className="w-[90%] border-b-2 self-center border-dashed border-secondary/20 dark:border-primary/20" />
                </div>
            </div>
        </div>
    );
};

export default AboutMe;