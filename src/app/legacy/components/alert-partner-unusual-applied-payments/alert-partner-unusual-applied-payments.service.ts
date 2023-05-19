import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertPartnerUnusualAppliedPaymentsService {
    appliedPaymentsRate: number = -1;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadAppliedPaymentsRate(partnerId: number, rangeStart: string, rangeEnd: string): void {
        this.businessIntelligenceService.getPartnerAppliedPaymentsRate(partnerId, rangeStart, rangeEnd).subscribe((res: number) => {
            this.appliedPaymentsRate = res;
        });
    }
}
