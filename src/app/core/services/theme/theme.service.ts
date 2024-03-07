import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { Theme } from '@core/enums/theme.enum';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private _themeId = 'theme-css';
    private _selectedTheme = Theme.AGENTHOS;

    constructor(@Inject(DOCUMENT) private _document: Document) {}

    addSelectedTheme(themeId?: number): void {
        if (themeId) {
            switch (themeId) {
                case 2:
                    this._selectedTheme = Theme.ORANGE;
                    break;

                default:
                    this._selectedTheme = Theme.AGENTHOS;
                    break;
            }
        }
    }

    setTheme(renderer2: Renderer2, theme?: Theme) {
        this._removeExistingTheme(renderer2);
        const themeAux = theme ? theme : this._selectedTheme;
        this._addTheme(themeAux, renderer2);
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
