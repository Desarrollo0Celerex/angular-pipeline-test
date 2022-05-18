import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardKpiTotalActivePoliciesService {
    totalActivePolicies: number = 0;

    constructor(private _policyService: PolicyService) { }

    loadTotalActivePolicies(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.SUSPENDED]);
        this._policyService.getTotalWorkspacePolicies(filters).subscribe((res: number) => {
            this.totalActivePolicies = res;
        })
    }
}
