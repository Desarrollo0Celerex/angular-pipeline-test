import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features/auth/services/auth.service';

const routes: any = {
    addedEndorsements: (
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
        '/business-intelligences/added-endorsements',
    contactAppliedPayments: (workspaceId: string, contactId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/business-intelligences/applied-payments',
    contactAppliedRenewals: (workspaceId: string, contactId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/business-intelligences/applied-renewals',
    contactCancelledPolicies: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/business-intelligences/cancelled-policies',
    contactWalletDecrease: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/business-intelligences/wallet-decrease',
    groupAppliedPayments: (workspaceId: string, groupId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/business-intelligences/applied-payments',
    groupAppliedRenewals: (workspaceId: string, groupId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/business-intelligences/applied-renewals',
    groupCancelledPolicies: (workspaceId: string, groupId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/business-intelligences/cancelled-policies',
    groupWalletDecrease: (workspaceId: string, groupId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/business-intelligences/wallet-decrease',
    lastPercentageIncrease: (
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
        '/business-intelligences/last-percentage-increase',
    latePayments: (workspaceId: string, contactId: string, policyId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/business-intelligences/late-payments',
    partnerAppliedPayments: (workspaceId: string, partnerId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/business-intelligences/applied-payments',
    partnerAppliedRenewals: (workspaceId: string, partnerId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/business-intelligences/applied-renewals',
    partnerCancelledPolicies: (workspaceId: string, partnerId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/business-intelligences/cancelled-policies',
    partnerWalletDecrease: (workspaceId: string, partnerId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/business-intelligences/wallet-decrease',
    reportedSinisters: (
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
        '/business-intelligences/reported-sinisters',
};

@Injectable()
export class BusinessIntelligenceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getAddedEndorsements(
        contactId: string,
        policyId: string
    ): Observable<number> {
        const route: string = routes.addedEndorsements(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getContactAppliedPaymentsRate(
        contactId: string,
        rangeStart: string,
        rangeEnd: string
    ): Observable<number> {
        const route: string = routes.contactAppliedPayments(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getContactAppliedRenewalsRate(
        contactId: string,
        rangeStart: string,
        rangeEnd: string
    ): Observable<number> {
        const route: string = routes.contactAppliedRenewals(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getContactCancelledPoliciesRate(contactId: string): Observable<number> {
        const route: string = routes.contactCancelledPolicies(
            this._workspaceId,
            contactId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getContactWalletDecreaseRate(contactId: string): Observable<number> {
        const route: string = routes.contactWalletDecrease(
            this._workspaceId,
            contactId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getGroupAppliedPaymentsRate(
        groupId: string,
        rangeStart: string,
        rangeEnd: string
    ): Observable<number> {
        const route: string = routes.groupAppliedPayments(
            this._workspaceId,
            groupId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getGroupAppliedRenewalsRate(
        groupId: string,
        rangeStart: string,
        rangeEnd: string
    ): Observable<number> {
        const route: string = routes.groupAppliedRenewals(
            this._workspaceId,
            groupId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getGroupCancelledPoliciesRate(groupId: string): Observable<number> {
        const route: string = routes.groupCancelledPolicies(
            this._workspaceId,
            groupId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getGroupWalletDecreaseRate(groupId: string): Observable<number> {
        const route: string = routes.groupWalletDecrease(
            this._workspaceId,
            groupId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getLatePayments(contactId: string, policyId: string): Observable<number> {
        const route: string = routes.latePayments(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getLastPercentageIncrease(
        contactId: string,
        policyId: string
    ): Observable<number> {
        const route: string = routes.lastPercentageIncrease(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getReportedSinisters(
        contactId: string,
        policyId: string
    ): Observable<number> {
        const route: string = routes.reportedSinisters(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getPartnerAppliedPaymentsRate(
        partnerId: number,
        rangeStart: string,
        rangeEnd: string
    ): Observable<number> {
        const route: string = routes.partnerAppliedPayments(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getPartnerAppliedRenewalsRate(
        partnerId: number,
        rangeStart: string,
        rangeEnd: string
    ): Observable<number> {
        const route: string = routes.partnerAppliedRenewals(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getPartnerCancelledPoliciesRate(partnerId: number): Observable<number> {
        const route: string = routes.partnerCancelledPolicies(
            this._workspaceId,
            partnerId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getPartnerWalletDecreaseRate(partnerId: number): Observable<number> {
        const route: string = routes.partnerWalletDecrease(
            this._workspaceId,
            partnerId
        );
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }
}
