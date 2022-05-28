import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    addedEndorsements: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/business-intelligences/added-endorsements',
    lastPercentageIncrease: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/business-intelligences/last-percentage-increase',
    latePayments: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/business-intelligences/late-payments',
    reportedSinisters: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/business-intelligences/reported-sinisters',
    partnerAppliedPayments: (workspaceId: string, partnerId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/' + partnerId + '/business-intelligences/applied-payments',
    partnerAppliedRenewals: (workspaceId: string, partnerId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/' + partnerId + '/business-intelligences/applied-renewals',
    partnerCancelledPolicies: (workspaceId: string, partnerId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/' + partnerId + '/business-intelligences/cancelled-policies',
}

@Injectable()
export class BusinessIntelligenceService {
    private _workspaceId: string = this._authService.workspaceId;;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    getAddedEndorsements(contactId: string, policyId: string): Observable<number> {
        const route: string = routes.addedEndorsements(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getLatePayments(contactId: string, policyId: string): Observable<number> {
        const route: string = routes.latePayments(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getLastPercentageIncrease(contactId: string, policyId: string): Observable<number> {
        const route: string = routes.lastPercentageIncrease(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getReportedSinisters(contactId: string, policyId: string): Observable<number> {
        const route: string = routes.reportedSinisters(this._workspaceId, contactId, policyId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getPartnerAppliedPaymentsRate(partnerId: number, rangeStart: string, rangeEnd: string): Observable<number> {
        const route: string = routes.partnerAppliedPayments(this._workspaceId, partnerId);
        let params: HttpParams = new HttpParams();
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getPartnerAppliedRenewalsRate(partnerId: number, rangeStart: string, rangeEnd: string): Observable<number> {
        const route: string = routes.partnerAppliedRenewals(this._workspaceId, partnerId);
        let params: HttpParams = new HttpParams();
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getPartnerCancelledPoliciesRate(partnerId: number): Observable<number> {
        const route: string = routes.partnerCancelledPolicies(this._workspaceId, partnerId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

}
