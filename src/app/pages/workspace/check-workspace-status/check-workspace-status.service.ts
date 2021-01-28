import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class CheckWorkspaceStatusService {

    constructor(
        private _authService: AuthService,
        private _workspaceService: WorkspaceService
    ) { }

    /**
     * Check if the user has a workspace
     * @return True if it has, otherwise false
     */
    checkHasWorkspace(): boolean {
        return this._authService.checkHasWorkspace();
    }

    /**
     * Get the workspace status id
     * @return Workspace status id
     */
    getWorkspaceStatusId(): Observable<HttpResponse> {
        return this._workspaceService.getWorkspaceStatusId();
    }
}
