import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiHttp } from '@core/http/api.http';

const ENDPOINTS: any = {
    firebaseToken: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/firebase-token`,
    users: environment.apiUrl + '/users',
    userToken: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/token`,
};

@Injectable()
export class AuthHttp {
    constructor(private _apiHttp: ApiHttp) {}

    identifyUser(authToken: string): Observable<string> {
        const route: string = ENDPOINTS.users;
        return this._apiHttp.post(route, { authToken });
    }

    getFirebaseToken(workspaceId: string, userId: string): Observable<string> {
        const route: string = ENDPOINTS.firebaseToken(workspaceId, userId);
        return this._apiHttp.get(route);
    }

    getNewUserToken(workspaceId: string, userId: string): Observable<string> {
        const route: string = ENDPOINTS.userToken(workspaceId, userId);
        return this._apiHttp.get(route);
    }
}
