import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardKpiWorkspacePoliciesCancelledService {
    totalWorkspacePoliciesCanceled: number = 0;

    constructor(private _policyService: PolicyService) { }

    loadTotalWorkspacePoliciesCanceled(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CANCELLED])
        this._policyService.getTotalWorkspacePolicies(filters, range.rangeField, range.rangeStart, range.rangeEnd).subscribe((res: number) => {
            this.totalWorkspacePoliciesCanceled = res;
        });
    }
}
