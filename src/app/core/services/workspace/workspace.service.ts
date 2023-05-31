import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WORKSPACE_ENDPOINTS } from '@core/constants/endpoints';
import { CreateWorkspaceDataSend } from '@interfaces/create-workspace-data-send.interface';
import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@features/auth/services/auth.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    activateWorkspace(activationCode: string | null): Observable<string> {
        const route: string = WORKSPACE_ENDPOINTS.workspaceActivation(
            this._workspaceId
        );
        return this._apiHttp.post(route, { activationCode });
    }

    createWorkspace(requestBody: CreateWorkspaceDataSend): Observable<string> {
        const route: string = WORKSPACE_ENDPOINTS.workspaces;
        return this._apiHttp.post(route, requestBody);
    }

    getWorkspace(fields: string = ''): Observable<Workspace> {
        return this._apiHttp
            .param('fields', fields)
            .get(WORKSPACE_ENDPOINTS.workspace(this._workspaceId));
    }

    getWorkspaceAvailablePlaces(): Observable<number> {
        return this._apiHttp.get(
            WORKSPACE_ENDPOINTS.workspaceAvailablePlaces(this._workspaceId)
        );
    }

    getWorkspaceRetentionRate(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        return this._apiHttp
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .get(WORKSPACE_ENDPOINTS.workspaceRetentionRate(this._workspaceId));
    }

    getWorkspaceHigherRetentionRate(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        return this._apiHttp
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .get(
                WORKSPACE_ENDPOINTS.workspaceHigherRetentionRate(
                    this._workspaceId
                )
            );
    }

    getWorkspaceLowerRetentionRate(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        return this._apiHttp
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .get(
                WORKSPACE_ENDPOINTS.workspaceLowerRetentionRate(
                    this._workspaceId
                )
            );
    }

    uploadWorkspaceAvatar(image: string | null): Observable<void> {
        const route: string = WORKSPACE_ENDPOINTS.workspaceAvatar(
            this._workspaceId
        );
        return this._apiHttp.post(route, { image });
    }

    updateWorkspaceCardiumUrl(cardiumUrl: string): Observable<void> {
        return this._apiHttp.put(
            WORKSPACE_ENDPOINTS.workspaceCardiumUrl(this._workspaceId),
            { cardiumUrl }
        );
    }

    updateWorkspaceFacebookUrl(facebookUrl: string): Observable<void> {
        return this._apiHttp.put(
            WORKSPACE_ENDPOINTS.workspaceFacebookUrl(this._workspaceId),
            { facebookUrl }
        );
    }

    updateWorkspaceInstagramUrl(instagramUrl: string): Observable<void> {
        return this._apiHttp.put(
            WORKSPACE_ENDPOINTS.workspaceInstagramUrl(this._workspaceId),
            { instagramUrl }
        );
    }

    updateWorkspaceTwitterUrl(twitterUrl: string): Observable<void> {
        return this._apiHttp.put(
            WORKSPACE_ENDPOINTS.workspaceTwitterUrl(this._workspaceId),
            { twitterUrl }
        );
    }

    updateWorkspaceLinkedinUrl(linkedinUrl: string): Observable<void> {
        return this._apiHttp.put(
            WORKSPACE_ENDPOINTS.workspaceLinkedinUrl(this._workspaceId),
            { linkedinUrl }
        );
    }

    updateWorkspaceTiktokUrl(tiktokUrl: string): Observable<void> {
        return this._apiHttp.put(
            WORKSPACE_ENDPOINTS.workspaceTiktokUrl(this._workspaceId),
            {
                tiktokUrl,
            }
        );
    }
}
