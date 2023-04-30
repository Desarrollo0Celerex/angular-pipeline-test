import { Injectable } from '@angular/core';
import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';

import { PolicyService } from '@services/policy.service';

@Injectable()
export class AlertWorkspacePoliciesPendingService {
    totalWorkspacePoliciesPending: number = 0;

    constructor(private _policyService: PolicyService) {}

    loadTotalWorkspacePoliciesPending(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policyStatusId',
            [POLICY_STATUS.PENDING]
        );
        this._policyService
            .getTotalWorkspacePolicies(filters)
            .subscribe((res: number) => {
                this.totalWorkspacePoliciesPending = res;
            });
    }
}
