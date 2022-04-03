import { Injectable } from '@angular/core';

import { PolicyService } from '@services/policy.service';

@Injectable()
export class AlertUnusualPolicyIncreaseService {
    lastPercentageIncrease: number = 0;

    constructor(private policyService: PolicyService) { }

    loadLastPercentageIncrease(contactId: string, policyId: string): void {
        this.policyService.getLastPercentageIncrease(contactId, policyId).subscribe((res: number) => {
            this.lastPercentageIncrease = res;
        })
    }
}
