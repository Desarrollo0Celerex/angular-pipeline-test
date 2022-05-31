import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertGroupUnusualCancelledPoliciesService {
    cancelledPoliciesRate: number = 0;

    constructor(private gusinessIntelligenceService: BusinessIntelligenceService) { }

    loadCancelledPoliciesRate(groupId: string): void {
        this.gusinessIntelligenceService.getGroupCancelledPoliciesRate(groupId).subscribe((res: number) => {
            this.cancelledPoliciesRate = res;
        });
    }
}
