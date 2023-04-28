import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { UpdateUserRoleDataSend } from '@interfaces/update-user-role-data-send.interface';
import { AuthService } from '@core/services/auth.service';

const ROUTES = {
    workspaceUser: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}`,
    workspaceUsers: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users`,
    workspaceUserRole: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/role`,
};

@Injectable()
export class WorkspaceUserService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    /**
     * Get the workspace user from API
     * @param  userId User id
     * @param  fields Fields
     * @return        Workspace user data
     */
    getWorkspaceUser(
        userId: string,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route: string = ROUTES.workspaceUser(this._workspaceId, userId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the workspace users
     * @param  fields The fields to get
     * @return        The workspace users
     */
    getWorkspaceUsers(
        fields: string = '',
        page: number = 1,
        perPage: number = 1
    ): Observable<HttpResponse> {
        const route: string = ROUTES.workspaceUsers(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Update the workspace user role
     * @param  userId      The user Id
     * @param  requestBody The requestBody
     * @return             Notification of action done
     */
    updateWorkspaceUserRole(
        userId: string,
        requestBody: UpdateUserRoleDataSend
    ): Observable<void> {
        const route: string = ROUTES.workspaceUserRole(
            this._workspaceId,
            userId
        );
        return this._httpClient.put<void>(route, requestBody);
    }
}
