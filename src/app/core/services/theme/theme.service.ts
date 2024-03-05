import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { Theme } from '@core/enums/theme.enum';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private _themeId = 'theme-css';

    constructor(@Inject(DOCUMENT) private _document: Document) {}

    setTheme(theme: Theme, renderer2: Renderer2) {
        this._removeExistingTheme(renderer2);
        this._addTheme(theme, renderer2);
    }

    private _addTheme(theme: Theme, renderer2: Renderer2): void {
        const cssFile = `assets/css/themes/${theme}.css`;
        // Create a link element via Angular's renderer to avoid SSR troubles
        const style: HTMLLinkElement = renderer2.createElement(
            'link'
        ) as HTMLLinkElement;

        // Set type of the link item and path to the css file
        renderer2.setProperty(style, 'rel', 'stylesheet');
        renderer2.setProperty(style, 'href', cssFile);
        renderer2.setProperty(style, 'id', this._themeId);

        // Add the style to the head section
        renderer2.appendChild(this._document.head, style);
    }

    private _removeExistingTheme(renderer2: Renderer2): void {
        const themeElement = this._document.getElementById(this._themeId);
        if (themeElement) {
            renderer2.removeChild(this._document.head, themeElement);
        }
    }
}
