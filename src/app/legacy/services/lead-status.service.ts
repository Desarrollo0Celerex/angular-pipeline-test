import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { LeadStatusStat } from '@interfaces/lead-status-stat.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const ROUTES = {
    leadStatus: `${environment.agenthos.apiUrl}/lead-status`,
    leadStatusStats: (workspaceId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/stats/lead-status`,
};

@Injectable()
export class LeadStatusService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the lead status from the API
     * @param  fields The fields to get
     * @return        The lead status
     */
    getLeadStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.leadStatus;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the lead status stats
     * @param  filters The filters to apply
     * @return         The stats
     */
    getLeadStatusStats(filters: string = ''): Observable<LeadStatusStat[]> {
        const route: string = ROUTES.leadStatusStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }
}
