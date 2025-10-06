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
            <h1>{t.home.title}</h1>
        </div>
    );
}
