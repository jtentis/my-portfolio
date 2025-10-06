import type { Route } from "../+types/root";
import { useLanguage } from "../hooks/useLanguage";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Início" },
        { name: "description", content: "Bem vindo a minha página!" },
    ];
}

export default function Home() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>{t.home.greeting}</h1>
            <h2>{t.home.name}</h2>
            <h3>{t.home.role}</h3>
            <p>{t.home.description}</p>
            <button>{t.home.contact}</button>
        </div>
    );
}
