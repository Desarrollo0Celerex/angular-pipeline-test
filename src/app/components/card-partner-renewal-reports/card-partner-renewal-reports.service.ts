import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardPartnerRenewalReportsService {
    totalPartnerAppliedRenewals: number = 0;
    totalPartnerPendingRenewals: number = 0;
    loadedContent: boolean = false;

    constructor(private _policyService: PolicyService) { }

    loadTotalRenewals(parnerId: number, rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.loadedContent = false;
        const renewalRequests: Observable<HttpResponse[]> = this._generateRenewalRequests(parnerId, rangeField, rangeStart, rangeEnd);
        renewalRequests.subscribe((res: HttpResponse[]) => {
            this.totalPartnerAppliedRenewals = res[0].data;
            this.totalPartnerPendingRenewals = res[1].data;
            this.loadedContent = true;
        });
    }

    private _generateRenewalRequests(parnerId: number, rangeField: string, rangeStart: string, rangeEnd: string): Observable<HttpResponse[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        let requests: Observable<HttpResponse>[] = [];
        const requestTotalPartnerAppliedRenewals: Observable<HttpResponse> = this._policyService.getTotalPartnerAppliedRenewals(parnerId, filters, rangeField, rangeStart, rangeEnd);
        const requestTotalPartnerPendingRenewals: Observable<HttpResponse> = this._policyService.getTotalPartnerPendingRenewals(parnerId, filters, rangeField, rangeStart, rangeEnd);
        requests.push(requestTotalPartnerAppliedRenewals);
        requests.push(requestTotalPartnerPendingRenewals);
        return forkJoin(requests);
    }
}
