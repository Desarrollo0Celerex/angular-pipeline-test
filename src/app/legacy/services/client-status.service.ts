import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const ROUTES = {
    clientsStatus: `${environment.apiUrl}/client-status`,
    clientStatusStats: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/stats/client-status`,
};

@Injectable()
export class ClientStatusService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the clients status from the API
     * @param  fields The fields to get
     * @return        The clients status
     */
    getClientStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.clientsStatus;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the client status stats
     * @param  filters The filters to apply
     * @return         The stats
     */
    getClientStatusStats(filters: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.clientStatusStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
