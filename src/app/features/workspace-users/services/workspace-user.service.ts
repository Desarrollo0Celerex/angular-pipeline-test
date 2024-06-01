import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { User } from '@users/interfaces/user.interface';
import { WORKSPACE_USER_ENDPOINTS } from '@workspace-users/constants/endpoints';
import { Workspace } from '@workspace/interfaces/workspace.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WorkspaceUserService {
    private _workspaceId: string = this._authService.workspaceId;
    private _userId: string = this._authService.userId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getTotalUserWorkspaces(): Observable<number> {
        return this._apiHttp.get(
            WORKSPACE_USER_ENDPOINTS.totalUserWorkspaces(
                this._workspaceId,
                this._userId
            )
        );
    }

    getUserWorkspaces(fields: string = ''): Observable<Workspace[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(
                WORKSPACE_USER_ENDPOINTS.userWorkspaces(
                    this._workspaceId,
                    this._userId
                )
            )
            .pipe(map((res: any) => this._formatWorkspaces(res.items)));
    }

    getWorkspaceUsers(
        fields: string = '',
        page: number = 1,
        perPage: number = 1,
        sortBy: string = ''
    ): Observable<User[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .param('sortBy', sortBy)
            .get(WORKSPACE_USER_ENDPOINTS.workspaceUsers(this._workspaceId))
            .pipe(map((res: any) => res.items));
    }

    updateUserWorkspace(newWorkspaceId: string): Observable<void> {
        return this._apiHttp.put(
            WORKSPACE_USER_ENDPOINTS.userWorkspaces(
                this._workspaceId,
                this._userId
            ),
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
            isActive: workspace.isActive,
        }));
    }
}
