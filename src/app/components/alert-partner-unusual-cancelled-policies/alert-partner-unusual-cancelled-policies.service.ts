import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertPartnerUnusualCancelledPoliciesService {
    cancelledPoliciesPercentage: number = 0;

    constructor(private gusinessIntelligenceService: BusinessIntelligenceService) { }

    loadCancelledPoliciesPercentage(contactId: number): void {
        this.gusinessIntelligenceService.getPartnerCancelledPoliciesPercentage(contactId).subscribe((res: number) => {
            this.cancelledPoliciesPercentage = res;
        });
    }
}
