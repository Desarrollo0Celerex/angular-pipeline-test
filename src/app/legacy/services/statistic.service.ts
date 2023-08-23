import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const routes: any = {
    contactPaymentStatistics: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/statistics/payments',
    contactRenewalStatistics: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/statistics/renewals',
    contactWalletProjectionStatistics: (
        workspaceId: string,
        contactId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/statistics/wallet-projection',
    groupPaymentStatistics: (workspaceId: string, groupId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/statistics/payments',
    groupRenewalStatistics: (workspaceId: string, groupId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/statistics/renewals',
    groupWalletProjectionStatistics: (workspaceId: string, groupId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/statistics/wallet-projection',
    partnerPaymentStatistics: (workspaceId: string, partnerId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/statistics/payments',
    partnerRenewalStatistics: (workspaceId: string, partnerId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/statistics/renewals',
    partnerWalletProjectionStatistics: (
        workspaceId: string,
        partnerId: number
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/statistics/wallet-projection',
    policyEndorsementStatistics: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/statistics/endorsements',
    policyEndorsementBehaviorStatistics: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/statistics/endorsements/behavior',
    policyPaymentStatistics: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/statistics/payments',
    policyPaymentBehaviorStatistics: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        paymentId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/statistics/payments/' +
        paymentId +
        '/receipts-paid/behavior',
    policyRenewalStatistics: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/statistics/renewals',
    policySinisterStatistics: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/statistics/sinisters',
    policySinisterBehaviorStatistics: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/statistics/sinisters/behavior',
};

@Injectable()
export class StatisticService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getContactPaymentStatistics(
        contactId: string,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.contactPaymentStatistics(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getContactRenewalStatistics(
        contactId: string,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.contactRenewalStatistics(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getContactWalletProjectionStatistics(
        contactId: string
    ): Observable<HttpResponse> {
        const route: string = routes.contactWalletProjectionStatistics(
            this._workspaceId,
            contactId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getGroupWalletProjectionStatistics(
        groupId: string
    ): Observable<HttpResponse> {
        const route: string = routes.groupWalletProjectionStatistics(
            this._workspaceId,
            groupId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getGroupPaymentStatistics(
        groupId: string,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.groupPaymentStatistics(
            this._workspaceId,
            groupId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getGroupRenewalStatistics(
        groupId: string,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.groupRenewalStatistics(
            this._workspaceId,
            groupId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getPartnerPaymentStatistics(
        partnerId: number,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.partnerPaymentStatistics(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getPartnerRenewalStatistics(
        partnerId: number,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.partnerRenewalStatistics(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getPartnerWalletProjectionStatistics(
        partnerId: number
    ): Observable<HttpResponse> {
        const route: string = routes.partnerWalletProjectionStatistics(
            this._workspaceId,
            partnerId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyEndorsementStatistics(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        const route: string = routes.policyEndorsementStatistics(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyEndorsementBehaviorStatistics(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        const route: string = routes.policyEndorsementBehaviorStatistics(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyPaymentStatistics(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        const route: string = routes.policyPaymentStatistics(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyPaymentBehaviorStatistics(
        contactId: string,
        policyId: string,
        paymentId: string
    ): Observable<HttpResponse> {
        const route: string = routes.policyPaymentBehaviorStatistics(
            this._workspaceId,
            contactId,
            policyId,
            paymentId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicyRenewalStatistics(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        const route: string = routes.policyRenewalStatistics(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicySinisterStatistics(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        const route: string = routes.policySinisterStatistics(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    getPolicySinisterBehaviorStatistics(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        const route: string = routes.policySinisterBehaviorStatistics(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route);
    }
}
