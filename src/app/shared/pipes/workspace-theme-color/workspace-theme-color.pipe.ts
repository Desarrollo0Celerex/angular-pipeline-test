import { Pipe, PipeTransform } from '@angular/core';
import { WORKSPACE_THEMES } from '@core/constants/settings';

@Pipe({
    name: 'workspaceThemeColor',
})
export class WorkspaceThemeColorPipe implements PipeTransform {
    transform(workspaceThemeId: number): string {
        let themeColor;
        switch (workspaceThemeId) {
            case WORKSPACE_THEMES.BERRY.ID:
                themeColor = 'agtWorkspaceThemeBerry';
                break;

            case WORKSPACE_THEMES.PEACH.ID:
                themeColor = 'agtWorkspaceThemePeach';
                break;

            case WORKSPACE_THEMES.MANGO.ID:
                themeColor = 'agtWorkspaceThemeMango';
                break;

            case WORKSPACE_THEMES.PUMPKIN.ID:
                themeColor = 'agtWorkspaceThemePumpkin';
                break;

            case WORKSPACE_THEMES.GRAPE.ID:
                themeColor = 'agtWorkspaceThemeGrape';
                break;

            case WORKSPACE_THEMES.MAMEY.ID:
                themeColor = 'agtWorkspaceThemeMamey';
                break;

            case WORKSPACE_THEMES.LIME.ID:
                themeColor = 'agtWorkspaceThemeLime';
                break;

            case WORKSPACE_THEMES.APPLE.ID:
                themeColor = 'agtWorkspaceThemeApple';
                break;

            default:
                themeColor = '';
                break;
        }
        return themeColor;
    }
}
