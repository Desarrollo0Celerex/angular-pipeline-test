import { Component, OnInit, Renderer2 } from '@angular/core';

import { Workspace } from '@core/interfaces/workspace.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';
import { Theme } from '@core/enums/theme.enum';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
    selector: 'agt-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
})
export class SidebarComponent implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    agenthosSupportPhone =
        environment.agenthos.support.phoneCode +
        environment.agenthos.support.phoneNumber;
    workspace: Workspace | undefined = undefined;
    theme = Theme;

    constructor(
        private _themeService: ThemeService,
        private _workspaceService: WorkspaceService,
        private _renderer2: Renderer2
    ) {}

    ngOnInit(): void {
        this._loadWorkspace();
    }

    selectTheme(theme: Theme): void {
        this._themeService.setTheme(this._renderer2, theme);
    }

    private _loadWorkspace(): void {
        this._workspaceService
            .getWorkspace('avatarUrl,brandName,licenseShortName')
            .subscribe((res: Workspace) => {
                this.workspace = res;
            });
    }
}
