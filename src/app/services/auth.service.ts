import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { UserTokenData } from '@interfaces/user-token-data.interface';
import { FirebaseService } from '@services/firebase.service';
import { JwtService } from '@services/jwt.service';
import { StorageService } from '@services/storage.service';

const ROUTES = {
    users: environment.apiUrl + '/users'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        private _firebaseService: FirebaseService,
        private _httpClient: HttpClient,
        private _jwtService: JwtService,
        private _router: Router,
        private _storageService: StorageService
    ) { }

    /**
     * Get the user id
     * @return user id
     */
    get userId(): string {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        return (userTokenData !== null) ? userTokenData.userId : '';
    }

    /**
     * Get the workspace id
     * @return Workspace id
     */
    get workspaceId(): string {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        return (userTokenData !== null && !!userTokenData.workspaceId ) ? userTokenData.workspaceId : '';
    }

    /**
     * Check if the user has an active workspace
     * @return True if it has, otherwise false
     */
    checkHasActiveWorkspace(): boolean {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        return (userTokenData !== null && userTokenData.workspaceId !== null && userTokenData.isActiveWorkspace) ? true : false;
    }

    /**
     * Check if the user has a workspace
     * @return True if it has, otherwise false
     */
    checkHasWorkspace(): boolean {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        return (userTokenData !== null && userTokenData.workspaceId !== null) ? true : false;
    }

    /**
     * Check if user is logged in
     * @return True if user is logged in, otherwise false
     */
    checkIsLoggedIn(): boolean {
        return (!!this._storageService.getUserToken() && !!this._storageService.getUserTokenData()) ? true : false;
    }

    /**
     * Identifies the user
     * @param  requestBody Request body
     * @return             Access token
     */
    identifyUser(authToken: string): Observable<HttpResponse> {
        const route: string = ROUTES.users;
        return this._httpClient.post<HttpResponse>(route, { authToken });
    }

    /**
     * Logout
     */
    logout(): void {
        this._storageService.clearStorage();
        this._firebaseService.exitFirebase();
        this._router.navigateByUrl(ROUTES_NAME.notAuthenticated);
    }

    /**
     * Login to Agenthos
     * @param  userToken User token
     * @return           User token data
     */
    startSessionInAgenthos(userToken: string): UserTokenData {
        const userTokenData: UserTokenData = this._jwtService.decodeToken(userToken);
        this._storageService.saveUserToken(userToken);
        this._storageService.saveUserTokenData(userTokenData);
        return userTokenData;
    }

}
