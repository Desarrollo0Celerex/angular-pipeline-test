import { Injectable } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardKpiWorkspacePoliciesIssuedService {
    totalWorkspacePoliciesIssued: number = 0;

    constructor(private _policyService: PolicyService) { }

    loadTotalWorkspacePoliciesIssued(range: RangeData): void {
      const filters: string = '';
        this._policyService.getTotalWorkspacePolicies(filters, range.rangeField, range.rangeStart, range.rangeEnd).subscribe((res: number) => {
            this.totalWorkspacePoliciesIssued = res;
        });
    }
}
