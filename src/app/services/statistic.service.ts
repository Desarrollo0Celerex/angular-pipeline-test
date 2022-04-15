import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    policyEndorsementStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/endorsements',
    policyPaymentStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/payments',
    policyRenewalStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/renewals',
    policySinisterStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/sinisters',
}

@Injectable()
export class StatisticService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    getPolicyEndorsementStatistics(contactId: string, policyId: string): Observable<HttpResponse> {
        const route: string = routes.policyEndorsementStatistics(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyPaymentStatistics(contactId: string, policyId: string): Observable<HttpResponse> {
        const route: string = routes.policyPaymentStatistics(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyRenewalStatistics(contactId: string, policyId: string): Observable<HttpResponse> {
        const route: string = routes.policyRenewalStatistics(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicySinisterStatistics(contactId: string, policyId: string): Observable<HttpResponse> {
        const route: string = routes.policySinisterStatistics(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route);
    }

}
