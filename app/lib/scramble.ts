const POOL = "abcdefghijklmnopqrstuvwxyz_/<>*#";
const tokens = new WeakMap<HTMLElement, number>();

/** Embaralha o texto do elemento e o resolve da esquerda para a direita em `ms`. Chamadas novas cancelam a anterior. */
export function scramble(el: HTMLElement, text: string, ms: number) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = text;
        return;
    }
    const id = (tokens.get(el) ?? 0) + 1;
    tokens.set(el, id);
    const t0 = performance.now();
    const frame = (t: number) => {
        if (tokens.get(el) !== id) return;
        const p = Math.min((t - t0) / ms, 1);
        const n = Math.round(p * text.length);
        el.textContent =
            text.slice(0, n) +
            text.slice(n).replace(/\S/g, () => POOL[(Math.random() * POOL.length) | 0]);
        if (p < 1) requestAnimationFrame(frame);
    };
    frame(t0);
}
