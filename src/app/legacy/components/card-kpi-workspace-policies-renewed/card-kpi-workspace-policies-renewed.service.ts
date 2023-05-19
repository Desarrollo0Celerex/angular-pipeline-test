import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardKpiWorkspacePoliciesRenewedService {
    totalWorkspaceRenewals: number | null = null;
    totalWorkspacePoliciesRenewed: number | null = null;

    constructor(private _policyService: PolicyService) {}

    loadTotalWorkspaceRenewals(range: RangeData): void {
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
        const rangeField: string = 'validityEndDate';
        this._policyService
            .getTotalWorkspaceRenewals(
                filters,
                rangeField,
                range.rangeStart,
                range.rangeEnd
            )
            .subscribe((res: number) => {
                this.totalWorkspaceRenewals = res;
            });
    }

    loadTotalWorkspacePoliciesRenewed(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policyStatusId',
            [
                POLICY_STATUS.ISSUED,
                POLICY_STATUS.CURRENT,
                POLICY_STATUS.PENDING,
                POLICY_STATUS.SUSPENDED,
                POLICY_STATUS.FINISHED,
                POLICY_STATUS.CANCELLED,
            ]
        );
        const rangeField: string = 'emissionDate';
        this._policyService
            .getTotalWorkspacePoliciesRenewed(
                filters,
                rangeField,
                range.rangeStart,
                range.rangeEnd
            )
            .subscribe((res: number) => {
                this.totalWorkspacePoliciesRenewed = res;
            });
    }
}
