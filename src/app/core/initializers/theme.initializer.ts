import { APP_INITIALIZER } from '@angular/core';
import { ThemeService } from '@core/services/theme/theme.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { AuthService } from '@features-legacy/auth/services/auth.service';

function initThemeFactory(
    authService: AuthService,
    themeService: ThemeService,
    workspaceService: WorkspaceService
) {
    return (): Promise<void> => {
        return new Promise((resolve) => {
            const workspaceId = authService.workspaceId;
            if (workspaceId) {
                workspaceService.getWorkspace('workspaceThemeId').subscribe({
                    next: (workspace) => {
                        themeService.addSelectedTheme(
                            workspace.workspaceThemeId
                        );
                        resolve();
                    },
                    error: () => {
                        resolve();
                    },
                });
            } else {
                resolve();
            }
        });
    };
}

export const THEME_INITIALIZER = [
    {
        provide: APP_INITIALIZER,
        useFactory: initThemeFactory,
        multi: true,
        deps: [AuthService, ThemeService, WorkspaceService],
    },
];
