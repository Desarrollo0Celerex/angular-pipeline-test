import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    workspaceUsers: (workspaceId: string, userId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}`
}

@Injectable()
export class WorkspaceUserService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Get the workspace user from API
     * @param  userId User id
     * @param  fields Fields
     * @return        Workspace user data
     */
    getWorkspaceUser(userId: string, fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.workspaceUsers(this._workspaceId, userId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }
}
