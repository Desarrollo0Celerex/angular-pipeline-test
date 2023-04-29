import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class ModalConfirmGoToAgenthosSupportService {
    username: string = '';
    workspaceName: string = '';

    constructor(
        private _authService: AuthService,
        private _workspaceService: WorkspaceService,
        private _workspaceUserService: WorkspaceUserService
    ) {}

    loadUsername(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName';
        this._workspaceUserService
            .getLoggedWorkspaceUser(fields)
            .subscribe((res: WorkspaceUser) => {
                this.username = res.shortName;
            });
    }

    loadWorkspaceName(): void {
        const fields: string = 'brandName';
        this._workspaceService
            .getWorkspace(fields)
            .subscribe((res: Workspace) => {
                this.workspaceName = res.brandName;
            });
    }
}
