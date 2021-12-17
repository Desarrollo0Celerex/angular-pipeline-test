import { Injectable } from '@angular/core';

import { POLICY_STATUS, QUOTATION_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { QuotationService } from '@services/quotation.service';
import { PolicyService } from '@services/policy.service';

import * as moment from 'moment';

@Injectable()
export class DashboardService {
    totalCurrentPolicies: number = 0;
    totalCancelledPolicies: number = 0;
    totalRenewals: number = 0;


    constructor(
        private _policyService: PolicyService,
    ) { }

    loadTotalCurrentPolicies(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CURRENT])
        this._policyService.getTotalWorkspacePolicies(filters).subscribe((res: number) => {
            this.totalCurrentPolicies = res;
        })
    }

    loadTotalCancelledPolicies(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CANCELLED])
        const rangeField: string = 'updatedAt';
        const rangeStart: string = moment().subtract(90, 'days').format('DD/MM/YYYY');
        const rangeEnd: string = moment().format('DD/MM/YYYY');
        this._policyService.getTotalWorkspacePolicies(filters, rangeField, rangeStart, rangeEnd).subscribe((res: number) => {
            this.totalCancelledPolicies = res;
        })
    }

    loadTotalRenewals(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const rangeField: string = 'validityEndDate';
        const rangeStart: string = moment().subtract(60, 'days').format('DD/MM/YYYY');
        const rangeEnd: string = moment().add(30, 'days').format('DD/MM/YYYY');
        this._policyService.getTotalWorkspacePoliciesToRenew(filters, rangeField, rangeStart, rangeEnd).subscribe((res: number) => {
            this.totalRenewals = res;
        })
    }


}
