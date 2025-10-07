import { useEffect } from "react";
import { Title } from "~/components/title";
import { ProjectCard } from "../components/project-card";
import { useLanguage } from "../hooks/useLanguage";

export const Projects = () => {
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
        <div className="flex flex-col justify-between">
            <Title title={t.projects.title}/>
            <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4">
                {t.projects.projectList.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        stack={project.stack}
                        completedDate={project.completedDate}
                        githubUrl={project.githubUrl}
                        // liveUrl={project.liveUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
