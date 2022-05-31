import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    groupRenewalStatistics: (workspaceId: string, groupId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/' + groupId + '/statistics/renewals',
    partnerPaymentStatistics: (workspaceId: string, partnerId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/' + partnerId + '/statistics/payments',
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

    getGroupRenewalStatistics(groupId: string, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<HttpResponse> {
        const route: string = routes.groupRenewalStatistics(this._workspaceId, groupId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    getPartnerPaymentStatistics(partnerId: number, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<HttpResponse> {
        const route: string = routes.partnerPaymentStatistics(this._workspaceId, partnerId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    getPartnerRenewalStatistics(partnerId: number, filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<HttpResponse> {
        const route: string = routes.partnerRenewalStatistics(this._workspaceId, partnerId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params});
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
