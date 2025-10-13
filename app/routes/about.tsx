import { useEffect, useRef } from "react";
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

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const startScrollLeftRef = useRef(0);
    const startScrollTopRef = useRef(0);

    function handlePointerDown(e: any) {
        if (e.button !== 0 && e.button !== 1) return;
        const el = scrollRef.current;
        if (!el) return;
        e.preventDefault();
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        startYRef.current = e.clientY;
        startScrollLeftRef.current = el.scrollLeft;
        startScrollTopRef.current = el.scrollTop;
        el.classList.add("dragging");
        try {
            (e.target as Element).setPointerCapture(e.pointerId);
        } catch (err) {
        }
    }

    function handlePointerMove(e: any) {
        if (!isDraggingRef.current) return;
        const el = scrollRef.current;
        if (!el) return;
        const dx = e.clientX - startXRef.current;
        const dy = e.clientY - startYRef.current;
        el.scrollLeft = startScrollLeftRef.current - dx;
        el.scrollTop = startScrollTopRef.current - dy;
    }

    function stopDrag(e: any) {
        if (!isDraggingRef.current) return;
        const el = scrollRef.current;
        if (el) {
            el.classList.remove("dragging");
            try {
                (e.target as Element).releasePointerCapture(e.pointerId);
            } catch (err) {
            }
        }
        isDraggingRef.current = false;
    }

    return (
        <section className="w-full flex flex-col gap-4 h-full">
            <div className="w-full flex flex-col md:flex-row gap-4 h-full">
                <div className="w-full md:w-1/4 h-64 xl:h-full">
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

                <div
                    ref={scrollRef}
                    className="w-full md:w-3/4 h-full overflow-auto hide-scrollbar p-10 border-2 profile-bg "
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={stopDrag}
                    onPointerCancel={stopDrag}
                    onPointerLeave={stopDrag}
                >
                    <div className="space-y-12 text-2xl leading-relaxed">
                        <section>
                            <h2 className="mb-3 text-2xl">{t.about.whoami.heading}</h2>
                            <p className="text-base">{t.about.whoami.text}</p>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">{t.about.skills.heading}</h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="mb-2  text-lg">{t.about.skills.technologies.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {t.about.skills.technologies.items.map((s) => (
                                            <span key={s} className="bg-badgeBg px-2 py-1  text-sm">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2  text-lg">{t.about.skills.tools.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {t.about.skills.tools.items.map((s) => (
                                            <span key={s} className="bg-badgeBg px-2 py-1  text-sm">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2  text-lg">{t.about.skills.frameworks.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {t.about.skills.frameworks.items.map((s) => (
                                            <span key={s} className="bg-badgeBg px-2 py-1 text-sm">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3  text-2xl">{t.about.experience.heading}</h2>
                            <div className="space-y-4 text-muted-foreground">
                                {(t.about.experience.items || []).map((it, idx) => (
                                    <div key={`${it.title ?? 'item'}-${idx}`}>
                                        <p className="font-semibold text-lg">{it.title}</p>
                                        <p className="text-base">
                                            <time>{it.period}</time>
                                        </p>
                                        {Array.isArray(it.description) ? (
                                            <div className="mt-1 space-y-2">
                                                {it.description.map((d, i) => (
                                                    <ul key={i} className="text-base list-disc list-inside">
                                                        <li>
                                                            {d.text}
                                                        </li>
                                                    </ul>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="mt-1 text-base">{it.description}</p>
                                        )}
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
