import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PolicyService } from '@services/policy.service';

import * as moment from 'moment';

@Injectable()
export class DashboardService {
    totalCancelledPolicies: number = 0;
    totalRenewals: number = 0;

    constructor(
        private _policyService: PolicyService,
    ) { }

    loadTotalCancelledPolicies(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CANCELLED])
        const rangeField: string = 'updatedAt';
        const rangeStart: string = moment().subtract(90, 'days').format('DD/MM/YYYY');
        const rangeEnd: string = moment().format('DD/MM/YYYY');
        this._policyService.getTotalWorkspacePolicies(filters, rangeField, rangeStart, rangeEnd).subscribe((res: number) => {
            this.totalCancelledPolicies = res;
        })
    }




}
