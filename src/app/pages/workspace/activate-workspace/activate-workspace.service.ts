import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { UserTokenData } from '@interfaces/user-token-data.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { AuthService } from '@services/auth.service';
import { FirebaseService } from '@services/firebase.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class ActivateWorkspaceService {
    workspace: Workspace | null;

    constructor(
        private _authService: AuthService,
        private _firebaseService: FirebaseService,
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
     * Get the firebase token
     * @param  workspaceId Workspace id
     * @param  userId      User id
     * @return             Firebase token
     */
    getFirebaseToken(workspaceId: string, userId: string): Observable<HttpResponse> {
        return this._firebaseService.getFirebaseToken(workspaceId, userId);
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
     * Logout
     */
    logout(): void {
        this._authService.logout();
    }

    /**
     * Login to Agenthos
     * @param  userToken User token
     * @return          User token data
     */
    startSessionInAgenthos(userToken: string): UserTokenData {
        return this._authService.startSessionInAgenthos(userToken);
    }

    /**
     * Login to Firebase
     * @param firebaseToken Firebase token
     */
    startSessionInFirebase(firebaseToken: string): Promise<any> {
        return this._firebaseService.startSessionInFirebase(firebaseToken);
    }

}
