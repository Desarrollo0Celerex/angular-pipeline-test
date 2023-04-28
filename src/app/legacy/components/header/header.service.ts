import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceUser } from '@interfaces/workspace-user.interface';
import { AuthService } from '@core/services/auth.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

@Injectable()
export class HeaderService {
    user: WorkspaceUser | null;

    constructor(
        private _authService: AuthService,
        private _workspaceUserService: WorkspaceUserService
    ) {
        this.user = null;
    }

    /**
     * Load de user
     */
    loadUser(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName,avatarUrl,roleName';
        this._workspaceUserService
            .getWorkspaceUser(userId, fields)
            .subscribe((res: HttpResponse) => {
                this.user = res.data;
            });
    }

    /**
     * Logout
     */
    logout(): void {
        this._authService.logout();
    }
}
