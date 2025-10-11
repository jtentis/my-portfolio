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
        <section className="w-full flex flex-col gap-4 h-full">
            <div className="w-full flex flex-col md:flex-row gap-4 h-full">
                <div className="w-full md:w-1/4 h-full">
                    <div
                        className="profile-card bg-[url('./assets/picture.png')] bg-cover bg-center"
                        role="img"
                        aria-label="profile"
                    >
                        <div className="profile-overlay">
                            <h3 className="text-base">{t.about.profile.name}</h3>
                            <p className="text-2xl">{t.about.profile.role}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-3/4 h-full overflow-auto hide-scrollbar p-10 border-2 profile-bg ">
                    <div className="space-y-12 text-2xl leading-relaxed">
                        <section>
                            <h2 className="mb-3 text-2xl">{t.about.whoami.heading}</h2>
                            <p className="text-base">{t.about.whoami.text}</p>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">{t.about.skills.heading}</h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="mb-2  text-lg">Frontend</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {t.about.skills.frontend.map((s) => (
                                            <span key={s} className="bg-badgeBg px-2 py-1  text-sm">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2  text-lg">Backend</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {t.about.skills.backend.map((s) => (
                                            <span key={s} className="bg-badgeBg px-2 py-1  text-sm">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2  text-lg">{t.about.skills.heading2}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {t.about.skills.tools.map((s) => (
                                            <span key={s} className="bg-badgeBg px-2 py-1 text-sm">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">{t.about.experience.heading}</h2>
                            <div className="space-y-4 text-muted-foreground">
                                {t.about.experience.items.map((it) => (
                                    <div key={it.title}>
                                        <p className="font-semibold text-lg">{it.title}</p>
                                        <p className="text-base">{it.period}</p>
                                        <p className="mt-1 text-base">{it.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">{t.about.education.heading}</h2>
                            <div className="space-y-2 text-muted-foreground">
                                {t.about.education.items.map((ed) => (
                                    <div key={ed.title}>
                                        <p className="font-semibold text-lg">{ed.title}</p>
                                        <p className="text-base">{ed.meta}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">{t.about.hobbies.heading}</h2>
                            <p className="text-muted-foreground text-base">{t.about.hobbies.text}</p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
