import type { Route } from "../+types/root";
import { useLanguage } from "../hooks/useLanguage";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Sobre mim" }];
}

const AboutMe = () => {
    const { t } = useLanguage();
    return (
        <div className="flex items-center justify-center">
            <h1>{t.about.title}</h1>
        </div>
    );
};

export default AboutMe;