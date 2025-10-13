import { Calendar } from "lucide-react";
import { VscLinkExternal } from "react-icons/vsc";
import { Badge } from "./badge";


interface ProjectCardProps {
    title: string;
    description: string;
    stack: string[];
    completedDate: string;
    liveUrl?: string;
    githubUrl?: string;
}

export const ProjectCard = ({
    title,
    description,
    stack,
    completedDate,
    liveUrl,
    githubUrl,
}: ProjectCardProps) => {
    return (
        <a 
            className="project-card overflow-auto hide-scrollbar" 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onPointerDown={e => {
                if (window.matchMedia("(max-width: 640px)").matches) {
                    e.preventDefault();
                }
            }}
        >
            <div>
                <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <div className="flex gap-2">
                        <VscLinkExternal
                            size={20}
                        />
                    </div>
                </div>

                <p className="mb-8 text-sm leading-relaxed text-secondary/80 dark:text-primary/80 min-h-[60px]">
                    {description}
                </p>
            </div>

            <div>
                <div className="mb-4 flex flex-wrap gap-2">
                    {stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-secondary/80 dark:text-primary/80">
                    <Calendar className="h-3 w-3" />
                    <span>{completedDate}</span>
                </div>
            </div>
        </a>
    );
};
