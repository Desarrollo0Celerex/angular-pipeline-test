import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';

declare var ParticlesPlugin: any;
declare var ScreenPlugin: any;

@Component({
    selector: 'agt-header',
    templateUrl: './header.component.html',
    styles: [],
})
export class HeaderComponent implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    workspaceUser: WorkspaceUser | undefined = undefined;

    constructor(
        private _authService: AuthService,
        private _workspaceUserService: WorkspaceUserService
    ) {}

    ngOnInit(): void {
        ParticlesPlugin.init();
        this._loadUser();
    }

    get userAvatarUrl(): string {
        return this.workspaceUser ? this.workspaceUser.avatarUrl : '';
    }

    logout(): void {
        this._authService.logout();
    }

    showFullScreen(): void {
        ScreenPlugin.showFullScreen();
    }

    private _loadUser(): void {
        const fields: string = 'shortName,avatarUrl,roleName';
        this._workspaceUserService
            .getLoggedWorkspaceUser(fields)
            .subscribe((res: WorkspaceUser) => {
                this.workspaceUser = res;
            });
    }
}
