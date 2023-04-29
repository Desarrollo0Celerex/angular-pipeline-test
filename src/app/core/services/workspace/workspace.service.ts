import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateWorkspaceDataSend } from '@interfaces/create-workspace-data-send.interface';
import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@core/services/auth/auth.service';
import { Workspace } from '@core/interfaces/workspace.interface';

const ROUTES = {
    workspaces: `${environment.apiUrl}/workspaces`,
    workspace: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}`,
    workspaceAvailablePlaces: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/available-places`,
    workspaceAvatar: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/avatar`,
    workspaceActivation: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/activate',
    workspaceCardiumUrl: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/cardium-url',
    workspaceFacebookUrl: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/facebook-url',
    workspaceInstagramUrl: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/instagram-url',
    workspaceTwitterUrl: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/twitter-url',
    workspaceLinkedinUrl: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/linkedin-url',
    workspaceTiktokUrl: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/tiktok-url',
    workspaceRetentionRate: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/stats/retention-rate',
    workspaceHigherRetentionRate: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/stats/retention-rate/higher',
    workspaceLowerRetentionRate: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/stats/retention-rate/lower',
};

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    activateWorkspace(activationCode: string | null): Observable<string> {
        const route: string = ROUTES.workspaceActivation(this._workspaceId);
        return this._apiHttp.post(route, { activationCode });
    }

    createWorkspace(requestBody: CreateWorkspaceDataSend): Observable<string> {
        const route: string = ROUTES.workspaces;
        return this._apiHttp.post(route, requestBody);
    }

    getWorkspace(fields: string = ''): Observable<Workspace> {
        return this._apiHttp
            .param('fields', fields)
            .get(ROUTES.workspace(this._workspaceId));
    }

    getWorkspaceAvailablePlaces(): Observable<number> {
        return this._apiHttp.get(
            ROUTES.workspaceAvailablePlaces(this._workspaceId)
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
            .get(ROUTES.workspaceRetentionRate(this._workspaceId));
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
            .get(ROUTES.workspaceHigherRetentionRate(this._workspaceId));
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
            .get(ROUTES.workspaceLowerRetentionRate(this._workspaceId));
    }

    uploadWorkspaceAvatar(image: string | null): Observable<void> {
        const route: string = ROUTES.workspaceAvatar(this._workspaceId);
        return this._apiHttp.post(route, { image });
    }

    updateWorkspaceCardiumUrl(cardiumUrl: string): Observable<void> {
        return this._apiHttp.put(
            ROUTES.workspaceCardiumUrl(this._workspaceId),
            { cardiumUrl }
        );
    }

    updateWorkspaceFacebookUrl(facebookUrl: string): Observable<void> {
        return this._apiHttp.put(
            ROUTES.workspaceFacebookUrl(this._workspaceId),
            { facebookUrl }
        );
    }

    updateWorkspaceInstagramUrl(instagramUrl: string): Observable<void> {
        return this._apiHttp.put(
            ROUTES.workspaceInstagramUrl(this._workspaceId),
            { instagramUrl }
        );
    }

    updateWorkspaceTwitterUrl(twitterUrl: string): Observable<void> {
        return this._apiHttp.put(
            ROUTES.workspaceTwitterUrl(this._workspaceId),
            { twitterUrl }
        );
    }

    updateWorkspaceLinkedinUrl(linkedinUrl: string): Observable<void> {
        return this._apiHttp.put(
            ROUTES.workspaceLinkedinUrl(this._workspaceId),
            { linkedinUrl }
        );
    }

    updateWorkspaceTiktokUrl(tiktokUrl: string): Observable<void> {
        return this._apiHttp.put(ROUTES.workspaceTiktokUrl(this._workspaceId), {
            tiktokUrl,
        });
    }
}
