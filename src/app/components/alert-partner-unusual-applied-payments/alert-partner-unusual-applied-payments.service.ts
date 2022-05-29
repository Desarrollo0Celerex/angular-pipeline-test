import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertPartnerUnusualAppliedPaymentsService {
    appliedPaymentsRate: number = 0;

    constructor(private gusinessIntelligenceService: BusinessIntelligenceService) { }

    loadAppliedPaymentsRate(partnerId: number, rangeStart: string, rangeEnd: string): void {
        this.gusinessIntelligenceService.getPartnerAppliedPaymentsRate(partnerId, rangeStart, rangeEnd).subscribe((res: number) => {
            this.appliedPaymentsRate = res;
        });
    }
}
