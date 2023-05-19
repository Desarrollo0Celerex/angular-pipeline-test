import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardKpiWorkspaceRenewalsPendingService {
    totalWorkspaceRenewalsPending: number = 0;

    constructor(private _policyService: PolicyService) {}

    loadTotalWorkspaceRenewalsPending(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policyStatusId',
            [
                POLICY_STATUS.ISSUED,
                POLICY_STATUS.CURRENT,
                POLICY_STATUS.PENDING,
                POLICY_STATUS.SUSPENDED,
                POLICY_STATUS.FINISHED,
            ]
        );
        this._policyService
            .getTotalWorkspaceRenewalsPending(
                filters,
                range.rangeField,
                range.rangeStart,
                range.rangeEnd
            )
            .subscribe((res: number) => {
                this.totalWorkspaceRenewalsPending = res;
            });
    }
}
