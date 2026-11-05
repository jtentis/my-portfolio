import { useEffect, useRef, type RefObject } from "react";
import photo from "~/assets/picture.avif";
import { useLanguage } from "~/hooks/useLanguage";

type Props = {
    intro: RefObject<HTMLElement | null>;
    hero: RefObject<HTMLElement | null>;
};

type Rect = { x0: number; x1: number; y0: number; y1: number };

const FONT = 8;
const LH = 9;
const RAMP = " .:-=+*#%@";
const NOISE = "abcdefghijklmnopqrstuvwxyz0123456789/<>*#";
const LENS = 9; // raio da lente do cursor, em células
const WAVE = 7.2; // escala (px) em que as ondas foram calibradas
const CROP_X = 0.2; // recorte horizontal da foto: tira a outra pessoa e a mão no ombro
const CROP_W = 0.6;

/**
 * Curvas de nível em ASCII cobrindo a home. Quando o cursor chega ao centro, as ondas
 * se reorganizam e formam o retrato (de dentro para fora); ao sair, ele se desfaz de volta.
 * Ao carregar, o rosto aparece por um instante para o visitante saber que ele está ali.
 */
export function AsciiField({ intro, hero }: Props) {
    const { t } = useLanguage();
    const box = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrap = box.current;
        const host = wrap?.parentElement;
        const canvas = wrap?.querySelector("canvas");
        const ctx = canvas?.getContext("2d");
        if (!wrap || !host || !canvas || !ctx) return;

        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const hover = matchMedia("(hover: hover) and (pointer: fine)").matches;
        const font = `${FONT}px JetBrainsMono, ui-monospace, monospace`;
        const mouse = { x: -1e4, y: -1e4 }; // px, relativo ao canvas
        const img = new Image();
        let cols = 0;
        let rows = 0;
        let cw = 4.8;
        let quiet: Rect[] = [];
        // área do rosto, em células
        let face = { c0: 0, r0: 0, cols: 0, rows: 0, cx: 0, cy: 0, reach: 0 };
        let dens = new Float32Array(0);
        let radial = new Float32Array(0);
        let seed = new Float32Array(0);
        let fg = "";
        let muted = "";
        let raf = 0;
        let t0 = 0;
        let last = 0;
        let reveal = 0;
        let gone = false;

        const noise = () => NOISE[(Math.random() * NOISE.length) | 0];

        function colors() {
            const s = getComputedStyle(document.documentElement);
            fg = s.getPropertyValue("--fg").trim();
            muted = s.getPropertyValue("--muted").trim();
            sample(); // a densidade inverte entre tema claro e escuro
            if (reduce) draw(10);
        }

        function layout() {
            const W = host!.clientWidth;
            const H = host!.clientHeight;
            const dpr = devicePixelRatio || 1;
            canvas!.style.width = `${W}px`;
            canvas!.style.height = `${H}px`;
            canvas!.width = W * dpr;
            canvas!.height = H * dpr;
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx!.font = font;
            ctx!.textBaseline = "top";
            cw = ctx!.measureText("M").width;
            cols = Math.ceil(W / cw);
            rows = Math.ceil(H / LH);

            const i = intro.current;
            const h = hero.current;
            if (!i || !h) return;
            const rect = (el: HTMLElement): Rect => ({
                x0: el.offsetLeft,
                x1: el.offsetLeft + el.offsetWidth,
                y0: el.offsetTop,
                y1: el.offsetTop + el.offsetHeight,
            });
            quiet = [rect(i), rect(h)];

            // O rosto ocupa o espaço livre: no desktop, acima do nome e à esquerda da intro; no mobile, entre os dois.
            const narrow = i.offsetLeft < 40;
            const top = narrow ? i.offsetTop + i.offsetHeight + 16 : i.offsetTop;
            const fh = Math.max(h.offsetTop - 16 - top, 0);
            const aspect = img.naturalWidth ? (img.naturalWidth * CROP_W) / img.naturalHeight : CROP_W;
            const fw = Math.min(fh * aspect, narrow ? W - 32 : i.offsetLeft - 64);
            const cx = narrow ? W / 2 : Math.min(W / 2, i.offsetLeft - 32 - fw / 2);
            face = {
                c0: Math.round((cx - fw / 2) / cw),
                r0: Math.round(top / LH),
                cols: Math.max(Math.round(fw / cw), 0),
                rows: Math.max(Math.round(fh / LH), 0),
                cx,
                cy: top + fh / 2,
                reach: Math.max(fw, fh) * 0.55,
            };
            sample();
            if (reduce) draw(10);
        }

        // Mesmo tratamento do retrato do protótipo: recorte central, contraste esticado e vinheta oval.
        function sample() {
            const { cols: fc, rows: fr } = face;
            if (!img.complete || !img.naturalWidth || !fc || !fr) return;
            const o = document.createElement("canvas");
            o.width = fc;
            o.height = fr;
            const g = o.getContext("2d", { willReadFrequently: true });
            if (!g) return;
            g.drawImage(img, img.naturalWidth * CROP_X, 0, img.naturalWidth * CROP_W, img.naturalHeight, 0, 0, fc, fr);
            const px = g.getImageData(0, 0, fc, fr).data;
            const n = fc * fr;
            const lum = new Float32Array(n);
            let lo = 1;
            let hi = 0;
            for (let k = 0; k < n; k++) {
                lum[k] = (0.299 * px[k * 4] + 0.587 * px[k * 4 + 1] + 0.114 * px[k * 4 + 2]) / 255;
                lo = Math.min(lo, lum[k]);
                hi = Math.max(hi, lum[k]);
            }
            const dark = document.documentElement.classList.contains("dark");
            dens = new Float32Array(n);
            radial = new Float32Array(n);
            seed = new Float32Array(n);
            for (let k = 0; k < n; k++) {
                const c = k % fc;
                const r = (k / fc) | 0;
                const rad = Math.hypot((c - fc / 2) / (fc / 2), (r - fr / 2) / (fr / 2));
                const fade = Math.min(1, Math.max(0, (1.05 - rad) / 0.35));
                const v = (lum[k] - lo) / (hi - lo || 1);
                dens[k] = Math.pow(dark ? v : 1 - v, 1.3) * fade;
                radial[k] = rad;
                // limiar de formação: o centro forma primeiro, com um pouco de acaso para parecer orgânico
                seed[k] = 0.6 * Math.min(rad, 1) + 0.4 * Math.random();
            }
        }

        function wave(px: number, py: number, time: number) {
            const X = px / WAVE;
            const Y = py / WAVE;
            let v =
                Math.sin(X * 0.045 + time * 0.35 + Math.sin(Y * 0.06 - time * 0.25) * 1.6) +
                Math.cos(Y * 0.05 - time * 0.3 + Math.cos(X * 0.03 + time * 0.15) * 1.4);
            v = v / 4 + 0.5;
            const d = Math.hypot(px - mouse.x, py - mouse.y) / WAVE;
            v += 0.09 * Math.exp(-d * 0.035) * Math.sin(d * 0.35 - time * 4); // onda saindo do cursor
            const k = v * 5;
            const f = Math.abs(k - Math.round(k));
            if (f >= 0.08) return 0;
            let q = 1; // some perto do texto
            for (const b of quiet) {
                const dx = Math.max(b.x0 - px, 0, px - b.x1);
                const dy = Math.max(b.y0 - py, 0, py - b.y1);
                q = Math.min(q, Math.hypot(dx, dy) / (10 * WAVE));
            }
            return (1 - f / 0.08) * 0.38 * q;
        }

        function draw(time: number) {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            const front = reduce ? Infinity : (time / 0.9) * (cols + 6); // varredura de entrada
            const hot: number[] = [];
            const mx = mouse.x / cw;
            ctx!.fillStyle = muted;
            for (let r = 0; r < rows; r++) {
                const py = r * LH;
                const fr = r - face.r0;
                let line = "";
                for (let c = 0; c < cols; c++) {
                    if (c > front) {
                        line += " ";
                        continue;
                    }
                    let v = wave(c * cw, py, time);
                    const fc = c - face.c0;
                    if (fr >= 0 && fr < face.rows && fc >= 0 && fc < face.cols && dens.length) {
                        const k = fr * face.cols + fc;
                        if (radial[k] < 1.05) {
                            const s = seed[k];
                            if (reveal > 0.02 && reveal < 0.98 && Math.abs(reveal - s) < 0.05) {
                                // borda da formação: glifos se decodificando
                                if (dens[k] > 0.06 || v > 0) {
                                    line += noise();
                                    continue;
                                }
                            } else if (reveal > s) {
                                const d = dens[k] < 0.06 ? 0 : Math.min(1, dens[k] + 0.05 * Math.sin(time * 2.2 + c * 0.7 + r * 1.3));
                                v = Math.max(d, v * (1 - reveal));
                            }
                        }
                    }
                    if (c > front - 4) {
                        line += v > 0 ? noise() : " ";
                        continue;
                    }
                    let ch = RAMP[Math.min(RAMP.length - 1, (v * RAMP.length) | 0)];
                    const d = Math.hypot(c - mx, (py - mouse.y) / cw);
                    if (ch !== " " && d < LENS && Math.random() < 0.5 * (1 - d / LENS) * (1 - 0.9 * reveal)) {
                        hot.push(c, r);
                        ch = " ";
                    }
                    line += ch;
                }
                ctx!.fillText(line, 0, py);
            }
            ctx!.fillStyle = fg;
            for (let k = 0; k < hot.length; k += 2) ctx!.fillText(noise(), hot[k] * cw, hot[k + 1] * LH);
        }

        function loop(now: number) {
            raf = requestAnimationFrame(loop);
            if (now - last < 33) return; // ~30 fps basta para texto
            last = now;
            const time = (now - t0) / 1000;
            const centered = Math.hypot(mouse.x - face.cx, mouse.y - face.cy) < face.reach;
            const teaser = time > 0.9 && time < 2.6; // mostra o rosto logo depois da varredura, uma vez
            const target = !hover || centered || teaser ? 1 : 0;
            reveal += (target - reveal) * 0.12;
            draw(time);
        }

        const onMove = (e: PointerEvent) => {
            const b = canvas!.getBoundingClientRect();
            mouse.x = e.clientX - b.left;
            mouse.y = e.clientY - b.top;
        };
        const onLeave = () => {
            mouse.x = mouse.y = -1e4;
        };
        const onVisibility = () => {
            if (reduce) return;
            if (document.hidden) {
                cancelAnimationFrame(raf);
                raf = 0;
            } else if (!raf && !gone) raf = requestAnimationFrame(loop);
        };

        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerleave", onLeave);
        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("resize", layout);
        const observer = new MutationObserver(colors);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        img.onload = layout;
        img.src = photo;
        reveal = reduce ? 1 : 0;
        colors();
        layout();
        document.fonts.ready.then(() => !gone && layout());
        t0 = performance.now();
        if (!reduce) raf = requestAnimationFrame(loop);

        return () => {
            gone = true;
            cancelAnimationFrame(raf);
            host.removeEventListener("pointermove", onMove);
            host.removeEventListener("pointerleave", onLeave);
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("resize", layout);
            observer.disconnect();
        };
    }, [intro, hero]);

    return (
        <div className="home-ascii" ref={box} role="img" aria-label={t.home.portraitAlt}>
            <canvas />
        </div>
    );
}
