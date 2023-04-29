import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { ApiHttp } from '@core/http/api.http';
import { UpdateUserRoleDataSend } from '@interfaces/update-user-role-data-send.interface';
import { AuthService } from '@core/services/auth/auth.service';

const ROUTES = {
    workspaceUser: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}`,
    workspaceUsers: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users`,
    workspaceUserRole: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/role`,
};

@Injectable({
    providedIn: 'root',
})
export class WorkspaceUserService {
    private _workspaceId: string = this._authService.workspaceId;
    private _userId: string = this._authService.userId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getLoggedWorkspaceUser(fields: string = ''): Observable<WorkspaceUser> {
        return this._apiHttp
            .param('fields', fields)
            .get(ROUTES.workspaceUser(this._workspaceId, this._userId));
    }

    getWorkspaceUsers(
        fields: string = '',
        page: number = 1,
        perPage: number = 1
    ): Observable<WorkspaceUser[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .get(ROUTES.workspaceUsers(this._workspaceId))
            .pipe(map((res: any) => res.items));
    }

    updateWorkspaceUserRole(
        userId: string,
        requestBody: UpdateUserRoleDataSend
    ): Observable<void> {
        const route: string = ROUTES.workspaceUserRole(
            this._workspaceId,
            userId
        );
        return this._apiHttp.put(route, requestBody);
    }
}
