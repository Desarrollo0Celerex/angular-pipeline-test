import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertUnusualPolicyIncreaseService {
    lastPercentageIncrease: number = 0;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadLastPercentageIncrease(contactId: string, policyId: string): void {
        this.businessIntelligenceService.getLastPercentageIncrease(contactId, policyId).subscribe((res: number) => {
            this.lastPercentageIncrease = res;
        })
    }
}
