import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class CheckWorkspaceStatusService {
    constructor(
        private _authService: AuthService,
        private _workspaceService: WorkspaceService
    ) {}

    /**
     * Check if the user has a workspace
     * @return True if you have it, otherwise false
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
