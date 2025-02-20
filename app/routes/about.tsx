import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Sobre mim" },
    ];
}


const AboutMe = () => {
    return (
        <div className="flex items-center justify-center">
            <p>sobre mim</p>
        </div>
    );
}

export default AboutMe;