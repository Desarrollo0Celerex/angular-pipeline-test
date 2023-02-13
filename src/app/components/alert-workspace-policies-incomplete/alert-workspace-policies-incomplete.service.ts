import { Injectable } from '@angular/core';
import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { PolicyService } from '@services/policy.service';

@Injectable()
export class AlertWorkspacePoliciesIncompleteService {
    totalWorkspacePoliciesIncomplete: number = 0;

    constructor(private _policyService: PolicyService) { }

    loadTotalWorkspacePoliciesIncomplete(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.INCOMPLETE]);
        this._policyService.getTotalWorkspacePolicies(filters).subscribe((res: number) => {
            this.totalWorkspacePoliciesIncomplete = res;
        })
    }
}
