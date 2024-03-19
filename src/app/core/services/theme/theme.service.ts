import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { WORKSPACE_THEMES } from '@core/constants/settings';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private _workspaceThemeId = 'theme-css';
    private _selectedThemeFile: string = WORKSPACE_THEMES.AGENTHOS.FILE;

    constructor(@Inject(DOCUMENT) private _document: Document) {}

    addSelectedTheme(workspaceThemeId?: number): void {
        if (workspaceThemeId) {
            this._selectedThemeFile = this._getThemeFile(workspaceThemeId);
        }
    }

    setTheme(renderer2: Renderer2, themeId?: number) {
        this._removeExistingTheme(renderer2);
        const themeFile = themeId
            ? this._getThemeFile(themeId)
            : this._selectedThemeFile;
        this._addTheme(themeFile, renderer2);
    }

    private _addTheme(themeFile: string, renderer2: Renderer2): void {
        const cssFile = `assets/css/themes/${themeFile}.css`;
        // Create a link element via Angular's renderer to avoid SSR troubles
        const style: HTMLLinkElement = renderer2.createElement(
            'link'
        ) as HTMLLinkElement;

        // Set type of the link item and path to the css file
        renderer2.setProperty(style, 'rel', 'stylesheet');
        renderer2.setProperty(style, 'href', cssFile);
        renderer2.setProperty(style, 'id', this._workspaceThemeId);

        // Add the style to the head section
        renderer2.appendChild(this._document.head, style);
    }

    private _getThemeFile(themeId: number): string {
        let themeFile;
        switch (themeId) {
            case WORKSPACE_THEMES.BERRY.ID:
                themeFile = WORKSPACE_THEMES.BERRY.FILE;
                break;

            case WORKSPACE_THEMES.PEACH.ID:
                themeFile = WORKSPACE_THEMES.PEACH.FILE;
                break;

            case WORKSPACE_THEMES.MANGO.ID:
                themeFile = WORKSPACE_THEMES.MANGO.FILE;
                break;

            case WORKSPACE_THEMES.PUMPKIN.ID:
                themeFile = WORKSPACE_THEMES.PUMPKIN.FILE;
                break;

            case WORKSPACE_THEMES.GRAPE.ID:
                themeFile = WORKSPACE_THEMES.GRAPE.FILE;
                break;

            case WORKSPACE_THEMES.MAMEY.ID:
                themeFile = WORKSPACE_THEMES.MAMEY.FILE;
                break;

            case WORKSPACE_THEMES.LIME.ID:
                themeFile = WORKSPACE_THEMES.LIME.FILE;
                break;

            case WORKSPACE_THEMES.APPLE.ID:
                themeFile = WORKSPACE_THEMES.APPLE.FILE;
                break;

            default:
                themeFile = WORKSPACE_THEMES.AGENTHOS.FILE;
                break;
        }
        return themeFile;
    }

    private _removeExistingTheme(renderer2: Renderer2): void {
        const themeElement = this._document.getElementById(
            this._workspaceThemeId
        );
        if (themeElement) {
            renderer2.removeChild(this._document.head, themeElement);
        }
    }
}
