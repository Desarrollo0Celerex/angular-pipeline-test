import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { UserTokenData } from '@interfaces/user-token-data.interface';
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
        private _httpClient: HttpClient,
        private _jwtService: JwtService,
        private _storageService: StorageService
    ) { }

    /**
     * Get the user id
     * @return user id
     */
    get userId(): string | null {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        return (userTokenData !== null) ? userTokenData.userId : null;
    }

    /**
     * Get the workspace id
     * @return Workspace id
     */
    get workspaceId(): string {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        return (userTokenData !== null && typeof userTokenData.workspaceId !== 'undefined') ? userTokenData.workspaceId : '';
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
     * Login to Agenthos
     * @param userToken User token
     */
    startSessionInAgenthos(userToken: string): void {
        const userTokenData: UserTokenData = this._jwtService.decodeToken(userToken);
        this._storageService.saveUserToken(userToken);
        this._storageService.saveUserTokenData(userTokenData);
    }

}
