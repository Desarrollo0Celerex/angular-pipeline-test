import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    partnerRenewalStatistics: (workspaceId: string, partnerId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/' + partnerId + '/statistics/renewals',
    policyEndorsementStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/endorsements',
    policyEndorsementBehaviorStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/endorsements/behavior',
    policyPaymentStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/payments',
    policyPaymentBehaviorStatistics: (workspaceId: string, contactId: string, policyId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/payments/'+paymentId+'/receipts-paid/behavior',
    policyRenewalStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/renewals',
    policySinisterStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/sinisters',
    policySinisterBehaviorStatistics: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/statistics/sinisters/behavior',
}

@Injectable()
export class StatisticService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    getPartnerRenewalStatistics(partnerId: number): Observable<HttpResponse> {
        const route: string = routes.partnerRenewalStatistics(this._workspaceId, partnerId);
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyEndorsementStatistics(contactId: string, policyId: string): Observable<HttpResponse> {
        const route: string = routes.policyEndorsementStatistics(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyEndorsementBehaviorStatistics(contactId: string, policyId: string): Observable<HttpResponse> {
        const route: string = routes.policyEndorsementBehaviorStatistics(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyPaymentStatistics(contactId: string, policyId: string): Observable<HttpResponse> {
        const route: string = routes.policyPaymentStatistics(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyPaymentBehaviorStatistics(contactId: string, policyId: string, paymentId: string): Observable<HttpResponse> {
        const route: string = routes.policyPaymentBehaviorStatistics(this._workspaceId, contactId, policyId, paymentId);
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

    getPolicySinisterBehaviorStatistics(contactId: string, policyId: string): Observable<HttpResponse> {
        const route: string = routes.policySinisterBehaviorStatistics(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route);
    }

}
