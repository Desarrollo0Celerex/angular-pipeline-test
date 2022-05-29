import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertPartnerUnusualCancelledPoliciesService {
    cancelledPoliciesRate: number = 0;

    constructor(private gusinessIntelligenceService: BusinessIntelligenceService) { }

    loadCancelledPoliciesRate(partnerId: number): void {
        this.gusinessIntelligenceService.getPartnerCancelledPoliciesRate(partnerId).subscribe((res: number) => {
            this.cancelledPoliciesRate = res;
        });
    }
}
