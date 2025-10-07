import { useEffect } from "react";
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
        <div className="flex flex-col justify-between p-7">
            <div className="mb-5">
                <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <h1 className="font-bold">
                        {t.projects.title}
                    </h1>
                    <div className="w-full border-b-2 self-center border-dashed border-secondary/20 dark:border-primary/20" />
                </div>
            </div>
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
