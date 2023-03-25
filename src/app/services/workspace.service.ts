import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CreateWorkspaceDataSend } from '@interfaces/create-workspace-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    workspaces: `${environment.apiUrl}/workspaces`,
    workspace: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}`,
    workspaceAvailablePlaces: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/available-places`,
    workspaceAvatar: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/avatar`,
    workspaceActivation: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/activate',
    workspaceCardiumUrl: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/cardium-url',
    workspaceFacebookUrl: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/facebook-url',
    workspaceInstagramUrl: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/instagram-url',
    workspaceTwitterUrl: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/twitter-url',
    workspaceLinkedinUrl: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/linkedin-url',
    workspaceTiktokUrl: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/tiktok-url',
    workspaceRetentionRate: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/retention-rate',
    workspaceHigherRetentionRate: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/retention-rate/higher',
    workspaceLowerRetentionRate: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/stats/retention-rate/lower'
}

@Injectable()
export class WorkspaceService {
    private _workspaceId: string;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Activate the workspace
     * @param  code License code
     * @return      New user token
     */
    activateWorkspace(code: string | null): Observable<HttpResponse> {
        const route: string = ROUTES.workspaceActivation(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, {code});
    }

    /**
     * Create a workspace in the API
     * @param  requestBody Request body
     * @return             New user token data
     */
    createWorkspace(requestBody: CreateWorkspaceDataSend): Observable<HttpResponse> {
        const route: string = ROUTES.workspaces;
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }

    /**
     * Get the workspace from the API
     * @param  fields fields
     * @return        Workspace data
     */
    getWorkspace(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.workspace(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Get the workspace available places
     * @return Workspace available places
     */
    getWorkspaceAvailablePlaces(): Observable<HttpResponse> {
        const route: string = ROUTES.workspaceAvailablePlaces(this._workspaceId);
        return this._httpClient.get<HttpResponse>(route);
    }

    /**
     * Get the workspace ratention rate from the API
     * @return Workspace ratention rate
     */
    getWorkspaceRetentionRate(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = ROUTES.workspaceRetentionRate(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => { return res.data })
        );
    }

    /**
     * Get the workspace ratention rate from the API
     * @return Workspace ratention rate
     */
    getWorkspaceHigherRetentionRate(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = ROUTES.workspaceHigherRetentionRate(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => { return res.data })
        );
    }

    /**
     * Get the workspace ratention rate from the API
     * @return Workspace ratention rate
     */
    getWorkspaceLowerRetentionRate(rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = ROUTES.workspaceLowerRetentionRate(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => { return res.data })
        );
    }

    /**
     * Get the workspace status id from the API
     * @return Workspace status id
     */
    getWorkspaceStatusId(): Observable<HttpResponse> {
        const route: string = ROUTES.workspace(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', 'workspaceStatusId');
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Upload the workspace avatar in the API
     * @param  requestBody Request body
     * @return             Empty
     */
    uploadWorkspaceAvatar(image: string | null): Observable<HttpResponse> {
        const route: string = ROUTES.workspaceAvatar(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, {image});
    }

    updateWorkspaceCardiumUrl(cardiumUrl: string): Observable<void> {
        const route: string = ROUTES.workspaceCardiumUrl(this._workspaceId);
        return this._httpClient.put<void>(route, {cardiumUrl});
    }

    updateWorkspaceFacebookUrl(facebookUrl: string): Observable<void> {
        const route: string = ROUTES.workspaceFacebookUrl(this._workspaceId);
        return this._httpClient.put<void>(route, {facebookUrl});
    }

    updateWorkspaceInstagramUrl(instagramUrl: string): Observable<void> {
        const route: string = ROUTES.workspaceInstagramUrl(this._workspaceId);
        return this._httpClient.put<void>(route, {instagramUrl});
    }

    updateWorkspaceTwitterUrl(twitterUrl: string): Observable<void> {
        const route: string = ROUTES.workspaceTwitterUrl(this._workspaceId);
        return this._httpClient.put<void>(route, {twitterUrl});
    }

    updateWorkspaceLinkedinUrl(linkedinUrl: string): Observable<void> {
        const route: string = ROUTES.workspaceLinkedinUrl(this._workspaceId);
        return this._httpClient.put<void>(route, {linkedinUrl});
    }

    updateWorkspaceTiktokUrl(tiktokUrl: string): Observable<void> {
        const route: string = ROUTES.workspaceTiktokUrl(this._workspaceId);
        return this._httpClient.put<void>(route, {tiktokUrl});
    }
}
