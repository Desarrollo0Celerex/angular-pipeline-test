import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicySourceStat } from '@interfaces/policy-source-stat.interface';
import { AuthService } from '@features/auth/services/auth.service';

const ROUTES = {
    policySourcesStats: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/stats/policy-sources`,
};

@Injectable()
export class PolicySourceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the policy sources stats
     * @param  filters The filters to apply
     * @return         The policy sources stats
     */
    getPolicySourcesStats(
        filters: string = ''
    ): Observable<PolicySourceStat[]> {
        const route: string = ROUTES.policySourcesStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }
}
