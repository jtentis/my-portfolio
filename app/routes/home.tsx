import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Início" },
        { name: "description", content: "Bem vindo a minha página!" },
    ];
}

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
        </div>
    );
}
