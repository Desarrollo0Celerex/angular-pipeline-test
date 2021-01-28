import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { AuthService } from '@services/auth.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class ActivateWorkspaceService {
    workspace: Workspace | null;

    constructor(
        private _authService: AuthService,
        private _workspaceService: WorkspaceService
    ) {
        this.workspace = null;
    }

    /**
     * Activate the workspace
     * @param  code License code
     * @return      New user token
     */
    activateWorkspace(code: string | null): Observable<HttpResponse> {
        return this._workspaceService.activateWorkspace(code);
    }

    /**
     * Load the workspace
     */
    loadWorkspace(): void {
        this._workspaceService.getWorkspace().subscribe( (res: HttpResponse) => {
            this.workspace = res.data;
        })
    }

    /**
     * Login to Agenthos
     * @param userToken User token
     */
    startSessionInAgenthos(userToken: string): void {
        this._authService.startSessionInAgenthos(userToken);
    }

}
