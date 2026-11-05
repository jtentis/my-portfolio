import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "~/hooks/useLanguage";
import { glide } from "~/lib/glide";
import "~/styles/about.css";

type Item = {
    kind: "work" | "edu";
    name: string;
    role: string;
    startS: string;
    endS: string | null;
    start: number;
    end: number;
    highlights: string[];
};

type Entry = { type: "intro" } | { type: "item"; item: Item } | { type: "skills" } | { type: "langs" } | { type: "hobbies" };

const today = new Date();
const NOW = today.getFullYear() + today.getMonth() / 12;

/** "YYYY-MM" vira ano decimal; "YYYY" no fim vale até dezembro; null = agora. */
function toYear(value: string | null, isEnd: boolean) {
    if (value == null) return NOW;
    const [year, month] = value.split("-").map(Number);
    return month ? year + (month - 1) / 12 : isEnd ? year + 1 : year;
}

export default function About() {
    const { t } = useLanguage();
    const a = t.about;
    const [active, setActive] = useState(0);
    const [open, setOpen] = useState(false); // mobile: detalhe aberto por cima da lista
    const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 860px)").matches);
    const pill = useRef<HTMLSpanElement>(null);
    const rows = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        document.title = a.title;
        document.querySelector('meta[name="description"]')?.setAttribute("content", a.description);
    }, [a.title, a.description]);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 860px)");
        const onChange = () => setMobile(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const items: Item[] = [
        ...a.experience.map((e) => ({ kind: "work" as const, name: e.company, role: e.role, startS: e.start, endS: e.end, highlights: e.highlights })),
        ...a.education.map((e) => ({ kind: "edu" as const, name: e.institution, role: e.course, startS: e.start, endS: e.end, highlights: [] })),
    ].map((it) => ({ ...it, start: toYear(it.startS, false), end: toYear(it.endS, true) }));
    const work = items.filter((it) => it.kind === "work");
    const edu = items.filter((it) => it.kind === "edu");
    const first = Math.floor(Math.min(...items.map((it) => it.start)));
    const last = Math.ceil(Math.max(...items.map((it) => it.end)));
    const at = (year: number) => ((year - first) / (last - first)) * 100;
    const trackVars = { "--years": last - first, "--now": `${at(NOW)}%` } as CSSProperties;
    const job = work.find((it) => it.endS == null);
    const study = edu.find((it) => it.end > NOW);
    const techCount = a.skills.groups.reduce((n, g) => n + g.items.length, 0);

    // ordem da lista = ordem de navegação por teclado
    const entries: Entry[] = [
        { type: "intro" },
        ...work.map((item) => ({ type: "item" as const, item })),
        ...edu.map((item) => ({ type: "item" as const, item })),
        { type: "skills" },
        { type: "langs" },
        { type: "hobbies" },
    ];

    useEffect(() => {
        const move = () => {
            if (!mobile) glide(pill.current, rows.current[active] ?? null, "y");
        };
        move();
        document.fonts.ready.then(move);
        window.addEventListener("resize", move);
        return () => window.removeEventListener("resize", move);
    }, [active, mobile, t]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey || event.altKey) return;
            if (event.key === "Escape") return setOpen(false);
            const step = event.key === "ArrowDown" || event.key === "j" ? 1 : event.key === "ArrowUp" || event.key === "k" ? -1 : 0;
            if (!step || (mobile && open)) return;
            event.preventDefault();
            const next = Math.min(Math.max(active + step, 0), entries.length - 1);
            setActive(next);
            rows.current[next]?.focus();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active, mobile, open, entries.length]);

    const fmt = (value: string | null) => {
        if (value == null) return a.journey.present;
        const [year, month] = value.split("-");
        return month ? `${month}/${year}` : year;
    };
    const period = (it: Item) => `${fmt(it.startS)} – ${fmt(it.endS)}`;
    const duration = (it: Item) => {
        const total = Math.max(1, Math.round((it.end - it.start) * 12));
        const years = Math.floor(total / 12);
        const months = total % 12;
        const u = a.units;
        return [years && `${years} ${years > 1 ? u.years : u.year}`, months && `${months} ${months > 1 ? u.months : u.month}`]
            .filter(Boolean)
            .join(` ${u.and} `);
    };
    // trecho até hoje cheio (trabalho) ou contornado (formação); o que ainda vem fica tracejado
    const bars = (it: Item) => {
        const past = Math.min(it.end, NOW);
        const from = Math.max(it.start, NOW);
        return (
            <>
                {past > it.start && <i className={`about-bar ${it.kind}`} style={{ left: `${at(it.start)}%`, width: `${at(past) - at(it.start)}%` }} />}
                {it.end > NOW && <i className="about-bar ahead" style={{ left: `${at(from)}%`, width: `${at(it.end) - at(from)}%` }} />}
            </>
        );
    };

    const select = (i: number) => {
        setActive(i);
        if (mobile) setOpen(true);
    };
    const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let n = 0; // índice corrido das linhas (entradas), ignorando os rótulos de grupo
    const row = (label: string, sub: string | null, extra?: React.ReactNode) => {
        const i = n++;
        return (
            <button
                key={i}
                type="button"
                ref={(el) => {
                    rows.current[i] = el;
                }}
                className={`about-row e${active === i ? " on" : ""}`}
                style={{ "--i": i } as CSSProperties}
                aria-pressed={active === i}
                onPointerEnter={() => !mobile && fine() && setActive(i)}
                onFocus={() => !mobile && setActive(i)}
                onClick={() => select(i)}
            >
                <span className="about-name">{label}</span>
                {sub && <span className="about-sub">{sub}</span>}
                {extra}
            </button>
        );
    };
    const itemRow = (it: Item) =>
        row(
            it.name,
            it.role,
            <>
                <span className="about-per">{period(it)}</span>
                <span className="about-mini" style={trackVars}>
                    {bars(it)}
                </span>
            </>
        );

    const entry = entries[active];
    const detail = () => {
        switch (entry.type) {
            case "intro":
                return (
                    <>
                        <h2 className="about-title">{a.intro.heading}</h2>
                        <p className="about-prose">{a.intro.text}</p>
                        <div className="about-now">
                            {job && (
                                <p>
                                    <span className="about-dot" aria-hidden="true" />
                                    {job.role}, {job.name}
                                </p>
                            )}
                            {study && (
                                <p>
                                    <span className="about-ring" aria-hidden="true" />
                                    {study.role}, {study.name} ({period(study)})
                                </p>
                            )}
                        </div>
                    </>
                );
            case "item": {
                const it = entry.item;
                return (
                    <>
                        <div className="about-context" style={trackVars} aria-hidden="true">
                            <div className="about-axis">
                                {Array.from({ length: last - first }, (_, k) => (
                                    <span key={k} style={{ left: `${at(first + k)}%` }}>
                                        {first + k}
                                    </span>
                                ))}
                            </div>
                            <div className="about-track">{bars(it)}</div>
                        </div>
                        <h2 className="about-title">{it.role}</h2>
                        <p className="about-meta">
                            <span>{it.name}</span>
                            <span>{period(it)}</span>
                            <span>{duration(it)}</span>
                        </p>
                        {it.highlights.length > 0 && (
                            <ul className="about-list">
                                {it.highlights.map((h) => (
                                    <li key={h}>{h}</li>
                                ))}
                            </ul>
                        )}
                    </>
                );
            }
            case "skills":
                return (
                    <>
                        <h2 className="about-title">{a.skills.heading}</h2>
                        <div className="about-skills">
                            {a.skills.groups.map((g) => (
                                <div key={g.title}>
                                    <h3 className="label">{g.title}</h3>
                                    <ul className="about-words">
                                        {g.items.map((s) => (
                                            <li key={s}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </>
                );
            case "langs":
                return (
                    <>
                        <h2 className="about-title">{a.languagesAndCertifications}</h2>
                        <div className="about-facts">
                            <div>
                                <h3 className="label">{a.languages.heading}</h3>
                                <ul className="about-words">
                                    {a.languages.items.map((l) => (
                                        <li key={l.name}>
                                            {l.name} <em>{l.level}</em>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="label">{a.certifications.heading}</h3>
                                <ul className="about-words">
                                    {a.certifications.items.map((c) => (
                                        <li key={c}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                );
            case "hobbies":
                return (
                    <>
                        <h2 className="about-title">{a.hobbies.heading}</h2>
                        <p className="about-prose">{a.hobbies.text}</p>
                    </>
                );
        }
    };

    return (
        <section className={`view about-view${open ? " open" : ""}`}>
            <div className="about-index">
                <span ref={pill} className="glide" aria-hidden="true" />
                {row(a.intro.heading, null)}
                <p className="about-group">{a.journey.work}</p>
                {work.map(itemRow)}
                <p className="about-group">{a.journey.education}</p>
                {edu.map(itemRow)}
                <p className="about-group">{a.more}</p>
                {row(a.skills.heading, `${techCount} ${a.counts.technologies}`)}
                {row(a.languagesAndCertifications, `${a.languages.items.length} ${a.counts.languages}, ${a.certifications.items.length} ${a.counts.certifications}`)}
                {row(a.hobbies.heading, null)}
            </div>
            <article key={active} className="about-detail swap" aria-live="polite">
                <button type="button" className="about-back" onClick={() => setOpen(false)}>
                    ‹ {a.back}
                </button>
                {detail()}
            </article>
        </section>
    );
}
