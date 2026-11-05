import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useLanguage } from "~/hooks/useLanguage";
import { glide } from "~/lib/glide";
import "~/styles/projects.css";

const slugify = (title: string) =>
    title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const yearOf = (date: string) => date.match(/\d{4}/g)?.at(-1) ?? "";

export const Projects = () => {
    const { t } = useLanguage();
    const projects = t.projects.projectList;

    // -1 = nada selecionado (mobile começa fechado)
    const [active, setActive] = useState(-1);
    const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 860px)").matches);
    const glideRef = useRef<HTMLSpanElement>(null);
    const detailRef = useRef<HTMLElement>(null);
    const items = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        document.title = t.projects.title;
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            descriptionMeta.setAttribute("content", t.projects.description);
        }
    }, [t.projects.title, t.projects.description]);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 860px)");
        if (!mq.matches) setActive(0);
        const onChange = () => setMobile(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const move = () => {
            if (!mobile) glide(glideRef.current, items.current[active] ?? null, "y");
        };
        move();
        document.fonts.ready.then(move);
        window.addEventListener("resize", move);
        return () => window.removeEventListener("resize", move);
    }, [active, mobile, t]);

    // reaplica o swap (remover, forçar reflow, adicionar) a cada troca de projeto
    useEffect(() => {
        const detail = detailRef.current;
        if (!detail) return;
        detail.classList.remove("swap");
        void detail.offsetWidth;
        detail.classList.add("swap");
    }, [active, mobile]);

    useEffect(() => {
        if (mobile) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
            const focused = document.activeElement;
            if (
                focused instanceof HTMLElement &&
                (focused.tagName === "INPUT" || focused.tagName === "TEXTAREA" || focused.isContentEditable)
            ) {
                return;
            }
            const step =
                event.key === "ArrowDown" || event.key === "j"
                    ? 1
                    : event.key === "ArrowUp" || event.key === "k"
                      ? -1
                      : 0;
            if (!step) return;
            event.preventDefault();
            const next = Math.min(Math.max(active + step, 0), projects.length - 1);
            setActive(next);
            items.current[next]?.querySelector("button")?.focus();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active, mobile, projects.length]);

    const detail = (project: (typeof projects)[number]) => (
        <>
            <h2 className="proj-title">{project.title}</h2>
            <p className="proj-desc">{project.description}</p>
            <ul className="proj-chips">
                {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                ))}
            </ul>
            <div className="proj-actions">
                <a
                    className="btn btn-primary"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener"
                >
                    {t.projects.openRepo}
                </a>
                <span>
                    {t.projects.completed} {project.completedDate}
                </span>
            </div>
        </>
    );

    return (
        <section className="view proj-view">
            <div className={`proj-list${active >= 0 ? " has-sel" : ""}`}>
                <span ref={glideRef} className="glide" aria-hidden="true" />
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        ref={(el) => {
                            items.current[i] = el;
                        }}
                        className={`proj-item e${active === i ? " on" : ""}`}
                        style={{ "--i": i } as CSSProperties}
                    >
                        <button
                            type="button"
                            className="proj-row"
                            aria-expanded={mobile ? active === i : undefined}
                            onPointerEnter={() => {
                                const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
                                if (!mobile && fine) setActive(i);
                            }}
                            onFocus={() => {
                                if (!mobile) setActive(i);
                            }}
                            onClick={() => {
                                if (mobile) setActive(active === i ? -1 : i);
                                else window.open(project.githubUrl, "_blank", "noopener");
                            }}
                        >
                            <span className="proj-name">{slugify(project.title)}</span>
                            <span className="proj-meta">{project.stack.slice(0, 3).join(", ")}</span>
                            <span className="proj-year">{yearOf(project.completedDate)}</span>
                        </button>
                        {mobile && active === i && (
                            <article className="proj-inline swap">{detail(project)}</article>
                        )}
                    </div>
                ))}
            </div>
            {!mobile && active >= 0 && (
                <article ref={detailRef} className="proj-detail swap" aria-live="polite">
                    {detail(projects[active])}
                </article>
            )}
        </section>
    );
};

export default Projects;
