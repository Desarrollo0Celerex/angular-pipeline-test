import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyLog } from '@interfaces/policy-log.interface';
import { AuthService } from '@features/auth/services/auth.service';

const ROUTES = {
    policyLogs: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/policy-logs`,
};

@Injectable()
export class PolicyLogService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the policy logs
     * @param  filters The filters to apply
     * @return         The policy logs
     */
    getPolicyLogs(
        contactId: string,
        policyId: string,
        fields: string = '',
        filters: string = ''
    ): Observable<PolicyLog[]> {
        const route: string = ROUTES.policyLogs(
            this._workspaceId,
            contactId,
            policyId
        );
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data.items));
    }
}
