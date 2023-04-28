import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';
import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

@Injectable()
export class ModalUpgradeLicenseService {
    username: string = '';
    workspaceName: string = '';

    constructor(
        private _authService: AuthService,
        private _workspaceService: WorkspaceService,
        private _workspaceUserService: WorkspaceUserService,
    ) { }

    loadUsername(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName';
        this._workspaceUserService.getWorkspaceUser(userId, fields).subscribe( (res: HttpResponse) => {
            this.username = res.data.shortName;
        })
    }

    loadWorkspaceName(): void {
        const fields: string = 'brandName';
        this._workspaceService.getWorkspace(fields).subscribe((res: HttpResponse) => {
            this.workspaceName = res.data.brandName;
        })
    }
}
