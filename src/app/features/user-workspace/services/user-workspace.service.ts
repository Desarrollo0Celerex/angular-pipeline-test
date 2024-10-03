import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Workspace } from '@workspace/interfaces/workspace.interface';
import { Observable } from 'rxjs';
import { USER_WORKSPACES_ENDPOINTS } from '../constants/endpoints';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserWorkspaceService {
    private _userId: string = this._authService.userId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getTotalUserWorkspaces(): Observable<number> {
        return this._apiHttp.get(
            USER_WORKSPACES_ENDPOINTS.totalUserWorkspaces(this._userId)
        );
    }

    getUserWorkspaces(fields: string = ''): Observable<Workspace[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(USER_WORKSPACES_ENDPOINTS.userWorkspaces(this._userId))
            .pipe(map((res: any) => this._formatWorkspaces(res.items)));
    }

    updateUserWorkspace(newWorkspaceId: string): Observable<void> {
        return this._apiHttp.put(
            USER_WORKSPACES_ENDPOINTS.userWorkspaces(this._userId),
            {
                workspaceId: newWorkspaceId,
            }
        );
    }

    private _formatWorkspaces(workspaces: any[]): any[] {
        return workspaces.map((workspace) => ({
            workspaceId: workspace.workspaceId,
            avatarUrl: workspace.workspaceAvatarUrl,
            brandName: workspace.workspaceBrandName,
            realName: workspace.workspaceRealName,
        }));
    }
}
