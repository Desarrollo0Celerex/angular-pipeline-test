import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { WorkspaceDirectory } from '@interfaces/workspace-directory.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    workspaceDirectories: (workspaceId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/directories`,
}

@Injectable({
  providedIn: 'root'
})
export class WorkspaceDirectoryService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) { }

    getWorkspaceDirectories(fields: string = ''): Observable<WorkspaceDirectory[]> {
        const route: string = ROUTES.workspaceDirectories(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => res.data )
        );
    }
}
