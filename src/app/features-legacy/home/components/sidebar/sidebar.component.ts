import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

import { Workspace } from '@core/interfaces/workspace.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';
import { ThemeService } from '@core/services/theme/theme.service';
import { WorkspaceTheme } from '@core/interfaces/workspace-theme.interface';
import { WORKSPACE_THEMES } from '@core/constants/settings';
import { UserWorkspacesModalComponent } from '@workspace-users/components/user-workspaces-modal/user-workspaces-modal.component';
import { UserWorkspaceService } from '@userWorkspace/services/user-workspace.service';

declare var jQuery: any;

@Component({
    selector: 'agt-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
    standalone: false
})
export class SidebarComponent implements OnInit {
    @ViewChild(UserWorkspacesModalComponent)
    userWorkspacesModalComponent!: UserWorkspacesModalComponent;
    ROUTES_NAME: any = ROUTES_NAME;
    WORKSPACE_THEMES = WORKSPACE_THEMES;
    appVersion = '1.54.23';
    agenthosSupportPhone =
        environment.agenthos.support.phoneCode +
        environment.agenthos.support.phoneNumber;
    totalUserWorkspaces = 0;
    workspace: Workspace | undefined = undefined;
    workspaceThemes: WorkspaceTheme[] = [];

    constructor(
        private _renderer2: Renderer2,
        private _themeService: ThemeService,
        private _userWorkspace: UserWorkspaceService,
        private _workspaceService: WorkspaceService
    ) {}

    ngOnInit(): void {
        this._loadWorkspace();
        this._loadWorkspaceThemes();
        this._loadTotalUserWorkspaces();
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

    onShowModalChangeWorkspace(): void {
        this.userWorkspacesModalComponent.openModal();
    }

    private _loadTotalUserWorkspaces(): void {
        this._userWorkspace.getTotalUserWorkspaces().subscribe((total) => {
            this.totalUserWorkspaces = total;
        });
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
