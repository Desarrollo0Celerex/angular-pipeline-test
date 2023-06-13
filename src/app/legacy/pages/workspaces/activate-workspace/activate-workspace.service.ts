import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { Workspace } from '@core/interfaces/workspace.interface';
import { AuthService } from '@features/auth/services/auth.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

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
    activateWorkspace(code: string | null): Observable<string> {
        return this._workspaceService.activateWorkspace(code);
    }

    getActivationCode(): string {
        return this._authService.activationCode;
    }

    /**
     * Get the firebase token
     * @param  workspaceId Workspace id
     * @param  userId      User id
     * @return             Firebase token
     */
    getFirebaseToken(workspaceId: string, userId: string): Observable<string> {
        return this._authService.getFirebaseToken(workspaceId, userId);
    }

    /**
     * Load the workspace
     */
    loadWorkspace(): void {
        const fields: string = 'avatarUrl,brandName,realName,payLink';
        this._workspaceService
            .getWorkspace(fields)
            .subscribe((res: Workspace) => {
                this.workspace = res;
            });
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
