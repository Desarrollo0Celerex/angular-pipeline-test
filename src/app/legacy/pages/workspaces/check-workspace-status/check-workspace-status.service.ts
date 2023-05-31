import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features/auth/services/auth.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { Workspace } from '@core/interfaces/workspace.interface';

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
    getWorkspace(): Observable<Workspace> {
        return this._workspaceService.getWorkspace('workspaceStatusId');
    }
}
