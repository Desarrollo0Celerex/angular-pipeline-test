import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertContactUnusualCancelledPoliciesService {
    cancelledPoliciesRate: number = 0;

    constructor(private gusinessIntelligenceService: BusinessIntelligenceService) { }

    loadCancelledPoliciesRate(contactId: string): void {
        this.gusinessIntelligenceService.getContactCancelledPoliciesRate(contactId).subscribe((res: number) => {
            this.cancelledPoliciesRate = res;
        });
    }
}
