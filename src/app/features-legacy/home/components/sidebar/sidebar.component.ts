import { Component, OnInit, Renderer2 } from '@angular/core';

import { Workspace } from '@core/interfaces/workspace.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';
import { ThemeService } from '@core/services/theme/theme.service';
import { WorkspaceTheme } from '@core/interfaces/workspace-theme.interface';
import { WORKSPACE_THEMES } from '@core/constants/settings';

declare var jQuery: any;

@Component({
    selector: 'agt-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
})
export class SidebarComponent implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    WORKSPACE_THEMES = WORKSPACE_THEMES;
    appVersion = '1.52.12';
    agenthosSupportPhone =
        environment.agenthos.support.phoneCode +
        environment.agenthos.support.phoneNumber;
    workspace: Workspace | undefined = undefined;
    workspaceThemes: WorkspaceTheme[] = [];

    constructor(
        private _themeService: ThemeService,
        private _workspaceService: WorkspaceService,
        private _renderer2: Renderer2
    ) {}

    ngOnInit(): void {
        this._loadWorkspace();
        this._loadWorkspaceThemes();
    }

    selectTheme(themeId: number): void {
        this._themeService.setTheme(this._renderer2, themeId);
        this._setThemeCheked(themeId);
        this._updateWorkspaceThemeId(themeId);
    }

    toggleDarkMode(event: any): void {
        if (event.target.checked) {
            jQuery('body').addClass('dark-mode');
        } else {
            jQuery('body').removeClass('dark-mode');
        }
    }

    private _loadWorkspace(): void {
        this._workspaceService
            .getWorkspace(
                'avatarUrl,brandName,licenseShortName,workspaceThemeId'
            )
            .subscribe((res: Workspace) => {
                this.workspace = res;
                this._setThemeCheked(res.workspaceThemeId);
            });
    }

    private _loadWorkspaceThemes(): void {
        const fields = 'workspaceThemeId,name';
        this._workspaceService.getWorkspaceThemes(fields).subscribe((res) => {
            this.workspaceThemes = res.filter(
                (theme) =>
                    theme.workspaceThemeId !== WORKSPACE_THEMES.ORIGINAL.ID
            );
        });
    }

    private _setThemeCheked(selectedThemeId: number): void {
        for (let i = 0; i < this.workspaceThemes.length; i++) {
            const selectedCheckbox: any = document.getElementById(
                'workspaceTheme' + this.workspaceThemes[i].workspaceThemeId
            );
            if (selectedCheckbox) {
                selectedCheckbox.checked = false;
            }
        }
        setTimeout(() => {
            const selectedCheckbox: any = document.getElementById(
                'workspaceTheme' + selectedThemeId
            );
            if (!!selectedCheckbox) {
                selectedCheckbox.checked = true;
            }
        }, 0);
    }

    private _updateWorkspaceThemeId(themeId: number): void {
        this._workspaceService
            .updateWorkspaceThemeId(themeId)
            .subscribe(() => {});
    }
}
