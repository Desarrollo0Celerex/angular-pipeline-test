import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { WorkspaceDirectory } from '@interfaces/workspace-directory.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';
import { SaveWorkspaceDirectoriesDataSend } from '@interfaces/save-workspace-directories-data-send.interface';

const ROUTES = {
    workspaceDirectories: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/directories`,
    workspaceDirectoriesIsCompleted: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/directories/is-completed`,
}

@Injectable()
export class WorkspaceDirectoryService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) { }

    checkWorkspaceDirectoriesIsCompleted(filters: string = ''): Observable<boolean> {
        const route: string = ROUTES.workspaceDirectoriesIsCompleted(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

    getWorkspaceDirectories(fields: string = '', filters: string = ''): Observable<WorkspaceDirectory[]> {
        const route: string = ROUTES.workspaceDirectories(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => res.data.items )
        );
    }

    saveWorkspaceDirectories(requestBody: SaveWorkspaceDirectoriesDataSend): Observable<void> {
        const route: string = ROUTES.workspaceDirectories(this._workspaceId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
