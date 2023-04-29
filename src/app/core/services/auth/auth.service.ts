import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AUTH_ROUTES } from '@configs/routes.config';
import { environment } from '@env/environment';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { AuthHttp } from '@core/http/auth/auth.http';
import { JwtService } from '@core/services/jwt/jwt.service';
import { LoadingService } from '@core/services/loading/loading.service';
import { RoutingHistoryService } from '@core/services/routing-history/routing-history.service';
import { StorageService } from '@core/services/storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private _firebaseService: FirebaseService,
        private _authHttp: AuthHttp,
        private _jwtService: JwtService,
        private _loadingService: LoadingService,
        private _routingHistoryService: RoutingHistoryService,
        private _storageService: StorageService
    ) {}

    get userId(): string {
        const userTokenData: UserTokenData | null =
            this._storageService.getUserTokenData();
        return userTokenData !== null ? userTokenData.userId : '';
    }

    get workspaceId(): string {
        const userTokenData: UserTokenData | null =
            this._storageService.getUserTokenData();
        return userTokenData !== null && !!userTokenData.workspaceId
            ? userTokenData.workspaceId
            : '';
    }

    get roleId(): number {
        const userTokenData: UserTokenData | null =
            this._storageService.getUserTokenData();
        return userTokenData !== null && !!userTokenData.roleId
            ? userTokenData.roleId
            : 0;
    }

    checkHasActiveWorkspace(): boolean {
        const userTokenData: UserTokenData | null =
            this._storageService.getUserTokenData();
        return userTokenData !== null &&
            userTokenData.workspaceId !== null &&
            userTokenData.isActiveWorkspace
            ? true
            : false;
    }

    checkHasPermission(roles: number[]): boolean {
        const userTokenData: UserTokenData | null =
            this._storageService.getUserTokenData();
        const roleId: number = !!userTokenData ? userTokenData.roleId : 0;
        return roles.indexOf(roleId) !== -1 ? true : false;
    }

    checkHasWorkspace(): boolean {
        const userTokenData: UserTokenData | null =
            this._storageService.getUserTokenData();
        return userTokenData !== null && userTokenData.workspaceId !== null
            ? true
            : false;
    }

    checkIsLoggedIn(): boolean {
        return !!this._storageService.getUserToken() &&
            !!this._storageService.getUserTokenData()
            ? true
            : false;
    }

    getNewUserToken(): Observable<string> {
        return this._authHttp.getNewUserToken(this.workspaceId, this.userId);
    }

    goToAtomAccount(): void {
        const atomAccountLoginUrl: string = `${environment.atomAccountUrl}/auth/identifier`;
        const returnUrl: string = `${environment.appAgenthosUrl}/${
            AUTH_ROUTES.MODULE
        }/${AUTH_ROUTES.IDENTIFY_USER('')}`;
        let loginUrl = `${atomAccountLoginUrl}?serviceName=Agenthos&returnUrl=${returnUrl}`;
        const redirectUrl: string = this._getRedirectUrl();
        if (!!redirectUrl) {
            loginUrl += `&redirectUrl=${redirectUrl}`;
        }
        window.location.href = loginUrl;
    }

    identifyUser(authToken: string): Observable<string> {
        return this._authHttp.identifyUser(authToken);
    }

    logout(restartSession: boolean = false): void {
        this._storageService.clearStorage();
        this._firebaseService.exitFirebase();
        if (restartSession) {
            this.goToAtomAccount();
        } else {
            this._goToAgenthos();
        }
    }

    startSessionInAgenthos(userToken: string): UserTokenData {
        const userTokenData: UserTokenData =
            this._jwtService.decodeToken(userToken);
        this._storageService.saveUserToken(userToken);
        this._storageService.saveUserTokenData(userTokenData);
        return userTokenData;
    }

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

    private _getRedirectUrl(): string {
        return this._routingHistoryService.getPreviousUrl() !== '/'
            ? this._routingHistoryService.getPreviousUrl()
            : '';
    }
}
