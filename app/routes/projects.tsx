import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

const Projects = () => {
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
        <div className="flex items-center justify-center">
            <h1>{t.projects.title}</h1>
        </div>
    );
};

export default Projects;
