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
        // Keep spaces as separate tokens so we can preserve word boundaries
        const tokens = textContent.split(/(\s+)/);

        let html = '';

        for (const token of tokens) {
            if (token.trim() === '') {
                // preserve whitespace as plain text so the browser can wrap between words
                // convert any whitespace token into a single space to avoid multiple consecutive
                // breaking issues while keeping word separation behavior
                html += ' ';
                continue;
            }

            // Wrap entire word in a container so it won't break mid-word
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