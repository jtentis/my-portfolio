import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

const AboutMe = () => {
    const { t } = useLanguage();

    useEffect(() => {
        document.title = t.about.title;
        const descriptionMeta = document.querySelector(
            'meta[name="description"]'
        );
        if (descriptionMeta) {
            descriptionMeta.setAttribute("content", t.about.description);
        }
    }, [t.about.title, t.about.description]);

    return (
        <section className="w-full flex flex-col gap-4 h-[485px]">
            <div className="w-full flex flex-col md:flex-row gap-4 h-full">
                <div className="w-full md:w-1/4 h-full">
                    <div
                        className="profile-card bg-[url('./assets/picture.png')] bg-cover bg-center"
                        role="img"
                        aria-label="profile"
                    >
                        <div className="profile-overlay">
                            <h3 className="text-base">João Tentis</h3>
                            <p className="text-2xl">Full Stack Developer</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-3/4 h-full overflow-auto hide-scrollbar p-10 border-2 profile-bg ">
                    <div className="space-y-12 text-2xl leading-relaxed scroll-smooth">
                        <section>
                            <h2 className="mb-3 text-2xl">
                                $ whoami
                            </h2>
                            <p className="text-base">
                                Desenvolvedor Full Stack apaixonado por criar
                                soluções elegantes e funcionais. Transformo
                                ideias em código limpo e experiências digitais
                                memoráveis.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">
                                $ skills --list
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="mb-2  text-lg">
                                        Frontend
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-badgeBg px-2 py-1  text-sm">
                                            React
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1  text-sm">
                                            TypeScript
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1  text-sm">
                                            Tailwind CSS
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1  text-sm">
                                            Next.js
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2  text-lg">
                                        Backend
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-badgeBg px-2 py-1  text-sm">
                                            Node.js
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1  text-sm">
                                            Python
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1  text-sm">
                                            PostgreSQL
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1  text-sm">
                                            MongoDB
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2  text-lg">
                                        Ferramentas
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-badgeBg px-2 py-1 text-sm">
                                            Git
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1 text-sm">
                                            Docker
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1 text-sm">
                                            VS Code
                                        </span>
                                        <span className="bg-badgeBg px-2 py-1 text-sm">
                                            Figma
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">
                                $ ls experiência/
                            </h2>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <p className="font-semibold text-lg">
                                        Desenvolvedor Full Stack
                                    </p>
                                    <p className="text-base">2022 - Presente</p>
                                    <p className="mt-1 text-base">
                                        Desenvolvimento de aplicações web
                                        modernas com foco em performance e
                                        experiência do usuário.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">
                                        Desenvolvedor Frontend
                                    </p>
                                    <p className="text-base">2020 - 2022</p>
                                    <p className="mt-1 text-base">
                                        Criação de interfaces responsivas e
                                        acessíveis utilizando React e
                                        TypeScript.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">
                                $ ls educacao/
                            </h2>
                            <div className="space-y-2 text-muted-foreground">
                                <div>
                                    <p className="font-semibold text-lg">
                                        Ciência da Computação
                                    </p>
                                    <p className="text-base">
                                        Universidade • 2018 - 2022
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">
                                        Certificações
                                    </p>
                                    <p className="text-base">
                                        AWS, Google Cloud, Meta Frontend
                                        Developer
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">
                                $ echo $HOBBIES
                            </h2>
                            <p className="text-muted-foreground text-base">
                                Quando não estou programando, gosto de
                                contribuir com projetos open source, explorar
                                novas tecnologias, jogar videogames e
                                fotografar.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
