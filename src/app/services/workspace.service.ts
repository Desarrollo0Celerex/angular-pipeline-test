import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateWorkspaceDataSend } from '@interfaces/create-workspace-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    workspaces: `${environment.apiUrl}/workspaces`
}

@Injectable()
export class WorkspaceService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Create a workspace in the API
     * @param  requestBody Request body
     * @return             New user token data
     */
    createWorkspace(requestBody: CreateWorkspaceDataSend): Observable<HttpResponse> {
        const route: string = ROUTES.workspaces;
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }
}
