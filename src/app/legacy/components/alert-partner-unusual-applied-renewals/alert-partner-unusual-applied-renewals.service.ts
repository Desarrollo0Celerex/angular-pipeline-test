import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertPartnerUnusualAppliedRenewalsService {
    appliedRenewalsRate: number = -1;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadAppliedRenewalsRate(partnerId: number, rangeStart: string, rangeEnd: string): void {
        this.businessIntelligenceService.getPartnerAppliedRenewalsRate(partnerId, rangeStart, rangeEnd).subscribe((res: number) => {
            this.appliedRenewalsRate = res;
        });
    }
}
