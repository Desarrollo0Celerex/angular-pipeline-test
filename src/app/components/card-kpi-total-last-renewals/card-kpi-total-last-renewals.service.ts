import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PolicyService } from '@services/policy.service';

import * as moment from 'moment';

@Injectable()
export class CardKpiTotalLastRenewalsService {
    totalRenewals: number = 0;

    constructor(private _policyService: PolicyService) { }

    loadTotalRenewals(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const rangeField: string = 'validityEndDate';
        const rangeStart: string = moment().subtract(2, 'month').format('DD/MM/YYYY');
        const rangeEnd: string = moment().add(1, 'month').format('DD/MM/YYYY');
        this._policyService.getTotalWorkspacePoliciesToRenew(filters, rangeField, rangeStart, rangeEnd).subscribe((res: number) => {
            this.totalRenewals = res;
        })
    }
}
