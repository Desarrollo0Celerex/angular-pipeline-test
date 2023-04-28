import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { POLICY_STATUS, POLICY_STATUS_ACTIVE } from '@constants/global';
import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyStatus } from '@interfaces/policy-status.interface';
import { PolicyStatusStat } from '@interfaces/policy-status-stat.interface';
import { AuthService } from '@core/services/auth/auth.service';

const ROUTES = {
    policyStatus: `${environment.apiUrl}/policy-status`,
    policyStatusStats: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/stats/policy-status`,
};

@Injectable()
export class PolicyStatusService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the policy status from the API
     * @param  fields Fields to get
     * @return        The policy status
     */
    getPolicyStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.policyStatus;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                let policyStatus: PolicyStatus[] = [];
                let statusToIgnore: PolicyStatus[] = [
                    POLICY_STATUS.INCOMPLETE,
                    POLICY_STATUS.ISSUED,
                    POLICY_STATUS.CURRENT,
                    POLICY_STATUS.PENDING,
                    POLICY_STATUS.SUSPENDED,
                ];
                policyStatus.push({
                    policyStatusId: POLICY_STATUS_ACTIVE,
                    name: 'Activa',
                });
                for (let status of res.data) {
                    if (!statusToIgnore.includes(status.policyStatusId)) {
                        policyStatus.push(status);
                    }
                }
                return {
                    data: policyStatus,
                };
            })
        );
    }

    /**
     * Get the policy status stats
     * @param  filters The filters to apply
     * @return         The policy status stats
     */
    getPolicyStatusStats(filters: string = ''): Observable<PolicyStatusStat[]> {
        const route: string = ROUTES.policyStatusStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }
}
