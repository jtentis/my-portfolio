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
        let charsHtml = '';
        const textContent = this.element.textContent || '';
        for (const char of textContent) {
            if (char.trim() === '') {
                charsHtml += '<span class="word"> </span>';
            } else {
                charsHtml += `<span class="word"><span class="char" style="display: inline-block;">${char}</span></span>`;
            }
        }
        this.element.innerHTML = charsHtml;
    }

    public getChars(): HTMLElement[] {
        return Array.from(this.element.querySelectorAll('.char')) as HTMLElement[];
    }
}