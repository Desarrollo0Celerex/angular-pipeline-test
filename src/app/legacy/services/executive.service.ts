import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { CreateExecutive } from '@interfaces/create-executive.interface';

const ROUTES = {
    executives: (workspaceId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/executives`,
    executive: (workspaceId: string, executiveId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/executives/${executiveId}`,
};

@Injectable()
export class ExecutiveService {
    private _workspaceId = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    createExecutive(requestBody: CreateExecutive): Observable<HttpResponse> {
        const route: string = ROUTES.executives(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }

    getWorkspaceExecutives(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.executives(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    updateExecutive(
        executiveId: string,
        requestBody: CreateExecutive
    ): Observable<HttpResponse> {
        const route: string = ROUTES.executive(this._workspaceId, executiveId);
        return this._httpClient.put<HttpResponse>(route, requestBody);
    }
}
