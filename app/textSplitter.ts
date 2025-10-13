// src/textSplitter.ts
export class TextSplitter {
    private element: HTMLElement;
    private options: any;

    constructor(element: HTMLElement, options: any) {
        this.element = element;
        this.options = options;
        this.splitText();
    }

    private splitText(): void {
        const textContent = this.element.textContent || '';
        const tokens = textContent.split(/(\s+)/);

        let html = '';

        for (const token of tokens) {
            if (token.trim() === '') {
                html += ' ';
                continue;
            }

            let wordInner = '';
            for (const ch of token) {
                const escaped = ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch === '&' ? '&amp;' : ch;
                wordInner += `<span class="char" style="display: inline-block;">${escaped}</span>`;
            }
            html += `<span class="word">${wordInner}</span>`;
        }

        this.element.innerHTML = html;
    }

    public getChars(): HTMLElement[] {
        return Array.from(this.element.querySelectorAll('.char')) as HTMLElement[];
    }
}