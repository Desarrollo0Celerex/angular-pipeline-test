import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserTokenData } from '@interfaces/user-token-data.interface';
import { AuthService } from '@services/auth.service';
import { FirebaseService } from '@services/firebase.service';

import { HttpResponse } from '@interfaces/http-response.interface';

@Injectable()
export class IdentifyUserService {

    constructor(
        private _authService: AuthService,
        private _firebaseService: FirebaseService
    ) { }

    /**
     * Check if the user has an active workspace
     * @return True if you have it, otherwise false
     */
    checkHasActiveWorkspace(): boolean {
        return this._authService.checkHasActiveWorkspace();
    }

    /**
     * Check if user is logged in
     * @return True if user is logged in, otherwise false
     */
    checkIsLoggedIn(): boolean {
        return this._authService.checkIsLoggedIn();
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
     * Identifies the user
     * @param  authToken Auth token
     * @return           Access token
     */
    identifyUser(authToken: string): Observable<HttpResponse> {
        return this._authService.identifyUser(authToken);
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
