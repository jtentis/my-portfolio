import type { Route } from "../+types/root";
import { useLanguage } from "../hooks/useLanguage";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Projetos" }];
}

const Projects = () => {
    const { t } = useLanguage();
    return (
        <div className="flex items-center justify-center">
            <h1>{t.projects.title}</h1>
        </div>
    );
};

export default Projects;