import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Projetos" },
    ];
}

const Projects = () => {
    return (
        <div className="flex items-center justify-center">
            <p>projetos</p>
        </div>
    )
}

export default Projects;