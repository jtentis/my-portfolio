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
        <div>
        
            <div className="w-full  flex flex-col md:flex-row gap-4">
                <div className="w-1/3 border-2">a</div>
                <div className="w-full border-2">a</div>
            </div>
        </div>
    );
};

export default AboutMe;
