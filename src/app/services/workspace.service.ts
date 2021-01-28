import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateWorkspaceDataSend } from '@interfaces/create-workspace-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    workspaces: `${environment.apiUrl}/workspaces`,
    workspace: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}`,
    workspaceAvatar: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/avatar`,
    workspaceActivation: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/activate'
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
     * Upload the workspace avatar in the API
     * @param  requestBody Request body
     * @return             Empty
     */
    uploadWorkspaceAvatar(requestBody: Object): Observable<HttpResponse> {
        const route: string = ROUTES.workspaceAvatar(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }
}
