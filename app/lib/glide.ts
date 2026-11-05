/**
 * Move o indicador `.glide` até `target` (eixo x: largura e translateX; eixo y: altura e translateY).
 * O indicador e o alvo precisam do mesmo offsetParent (um ancestral com position: relative).
 * A transição só liga depois do primeiro posicionamento, para não deslizar a partir do zero.
 */
export function glide(indicator: HTMLElement | null, target: HTMLElement | null, axis: "x" | "y") {
    if (!indicator || !target || !target.offsetParent) return;
    if (axis === "x") {
        indicator.style.width = `${target.offsetWidth}px`;
        indicator.style.transform = `translateX(${target.offsetLeft}px)`;
    } else {
        indicator.style.height = `${target.offsetHeight}px`;
        indicator.style.transform = `translateY(${target.offsetTop}px)`;
    }
    requestAnimationFrame(() => indicator.classList.add("ready"));
}
