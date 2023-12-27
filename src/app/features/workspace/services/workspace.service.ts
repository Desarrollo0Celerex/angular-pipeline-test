import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { Workspace } from '@workspace/interfaces/workspace.interface';
import { environment } from '@env/environment';

const ENDPOINTS: any = {
    workspace: (workspaceId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}`,
};

@Injectable()
export class WorkspaceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getWorkspace(fields: string = ''): Observable<Workspace> {
        return this._apiHttp
            .param('fields', fields)
            .get(ENDPOINTS.workspace(this._workspaceId));
    }
}
