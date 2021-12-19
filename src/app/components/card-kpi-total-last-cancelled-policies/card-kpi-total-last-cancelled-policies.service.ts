import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PolicyService } from '@services/policy.service';

import * as moment from 'moment';

@Injectable()
export class CardKpiTotalLastCancelledPoliciesService {
    rangeStart: string = moment().subtract(3, 'months').format('DD/MM/YYYY');
    rangeEnd: string = moment().format('DD/MM/YYYY');
    totalLastCancelledPolicies: number = 0;

    constructor(private _policyService: PolicyService) { }

    loadTotalCancelledPolicies(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CANCELLED])
        const rangeField: string = 'updatedAt';
        this._policyService.getTotalWorkspacePolicies(filters, rangeField, this.rangeStart, this.rangeEnd).subscribe((res: number) => {
            this.totalLastCancelledPolicies = res;
        })
    }
}
