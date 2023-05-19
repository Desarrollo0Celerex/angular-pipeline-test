import { Injectable } from '@angular/core';
import { EXTERNAL_POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';

import { ExternalPolicyService } from '@services/external-policy.service';

@Injectable()
export class AlertWorkspaceExternalPoliciesService {
    totalWorkspaceExternalPolicies: number = 0;

    constructor(private _externalPolicyService: ExternalPolicyService) {}

    loadTotalWorkspaceExternalPolicies(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'externalPolicyStatusId',
            [EXTERNAL_POLICY_STATUS.INCOMPLETE, EXTERNAL_POLICY_STATUS.CURRENT]
        );
        this._externalPolicyService
            .getTotalWorkspaceExternalPolicies(filters)
            .subscribe((res: number) => {
                this.totalWorkspaceExternalPolicies = res;
            });
    }
}
