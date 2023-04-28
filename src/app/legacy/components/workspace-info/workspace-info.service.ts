import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { WorkspaceUser } from '@interfaces/workspace-user.interface';
import { AuthService } from '@core/services/auth.service';
import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

@Injectable()
export class WorkspaceInfoService {
    user: WorkspaceUser | null = null;
    workspace: Workspace | null = null;

    constructor(
        private _authService: AuthService,
        private _workspaceService: WorkspaceService,
        private _workspaceUserService: WorkspaceUserService
    ) {}

    /**
     * Load the workspace data
     */
    loadWorkspace(): void {
        const fields: string = 'workspaceId,brandName,avatarUrl';
        this._workspaceService
            .getWorkspace(fields)
            .subscribe((res: HttpResponse) => {
                this.workspace = res.data;
            });
    }

    /**
     * Load de workspace user
     */
    loadWorkspaceUser(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName';
        this._workspaceUserService
            .getWorkspaceUser(userId, fields)
            .subscribe((res: HttpResponse) => {
                this.user = res.data;
            });
    }
}
