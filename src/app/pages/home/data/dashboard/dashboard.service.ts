import { Injectable } from '@angular/core';

import { POLICY_STATUS, QUOTATION_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { QuotationService } from '@services/quotation.service';
import { PolicyService } from '@services/policy.service';

import * as moment from 'moment';

@Injectable()
export class DashboardService {
    totalCurrentPolicies: number = 0;
    totalLastPoliciesToRenew: number = 0;
    totalPendingQuotations: number = 0;

    constructor(
        private _policyService: PolicyService,
        private _quotationService: QuotationService
    ) { }

    loadTotalCurrentPolicies(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CURRENT])
        this._policyService.getTotalWorkspacePolicies(filters).subscribe((res: number) => {
            this.totalCurrentPolicies = res;
        })
    }

    loadTotalLastPoliciesToRenew(): void {
        const rangeField: string = 'validityEndDate';
        const rangeStart: string = moment().subtract(60, 'days').format('DD/MM/YYYY');
        const rangeEnd: string = moment().add(30, 'days').format('DD/MM/YYYY');
        this._quotationService.getTotalWorkspaceQuotations('', rangeField, rangeStart, rangeEnd).subscribe((res: number) => {
            this.totalLastPoliciesToRenew = res;
        })
    }

    loadTotalPendingQuotations(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('quotationStatusId', [QUOTATION_STATUS.PENDING])
        this._quotationService.getTotalWorkspaceQuotations(filters).subscribe((res: number) => {
            this.totalPendingQuotations = res;
        })
    }
}
