import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { UserTokenData } from '@interfaces/user-token-data.interface';
import { FirebaseService } from '@services/firebase.service';
import { JwtService } from '@services/jwt.service';
import { StorageService } from '@services/storage.service';
import { LoadingService } from '@services/loading.service';
import { RoutingHistoryService } from '@services/routing-history.service';

const ROUTES = {
    users: environment.apiUrl + '/users',
    workspaceUserToken: (workspaceId: string, userId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/token`,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        private _firebaseService: FirebaseService,
        private _httpClient: HttpClient,
        private _jwtService: JwtService,
        private _loadingService: LoadingService,
        private _storageService: StorageService,
        private _routingHistoryService: RoutingHistoryService
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
     * Get the role id
     * @return Role id
     */
    get roleId(): number {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        return (userTokenData !== null && !!userTokenData.roleId ) ? userTokenData.roleId : 0;
    }

    /**
     * Check if the user has an active workspace
     * @return True if you have it, otherwise false
     */
    checkHasActiveWorkspace(): boolean {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        return (userTokenData !== null && userTokenData.workspaceId !== null && userTokenData.isActiveWorkspace) ? true : false;
    }

    /**
     * Check if the user has permission to access a page
     * @param  roles The allowed roles
     * @return       True if the user has it, otherwise false
     */
    checkHasPermission(roles: number[]): boolean {
        const userTokenData: UserTokenData | null = this._storageService.getUserTokenData();
        const roleId: number = (!!userTokenData) ? userTokenData.roleId : 0;
        return (roles.indexOf(roleId) !== -1) ? true : false;
    }

    /**
     * Check if the user has a workspace
     * @return True if you have it, otherwise false
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
     * Get a new token to the user
     * @return The new token
     */
    getNewUserToken(): Observable<string> {
        const route: string = ROUTES.workspaceUserToken(this.workspaceId, this.userId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => { return res.data })
        );
    }

    /**
     * Navigate to Atom Account login
     */
    goToAtomAccount(): void {
        const atomAccountLoginUrl: string = `${environment.atomAccountUrl}/auth/identifier`;
        const returnUrl: string = `${environment.appAgenthosUrl}/auth/identify-user`;
        let loginUrl = `${atomAccountLoginUrl}?serviceName=Agenthos&returnUrl=${returnUrl}`;
        const redirectUrl: string = this._getRedirectUrl();
        if(!!redirectUrl) {
            loginUrl += `&redirectUrl=${redirectUrl}`;
        }
        window.location.href = loginUrl;
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
    logout(restartSession: boolean = false): void {
        this._storageService.clearStorage();
        this._firebaseService.exitFirebase();
        if(restartSession) {
            this.goToAtomAccount();
        } else {
            this._goToAgenthos();
        }
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

    /**
     * Restart the user session
     * @param userToken The new user token
     */
    restartSession(): void {
        this._loadingService.show();
        this.getNewUserToken().subscribe((newUserToken: string) => {
            this.startSessionInAgenthos(newUserToken);
            this._loadingService.hide();
            location.reload();
        });
    }

    private _goToAgenthos(): void {
        window.location.href = environment.agenthosUrl;
    }

    /**
     * Get the redirect url
     * @return Redirect url
     */
    private _getRedirectUrl(): string {
        return (this._routingHistoryService.getPreviousUrl() !== '/') ? this._routingHistoryService.getPreviousUrl() : '';
    }

}
