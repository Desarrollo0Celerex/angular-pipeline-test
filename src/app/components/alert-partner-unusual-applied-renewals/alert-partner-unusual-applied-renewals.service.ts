import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertPartnerUnusualAppliedRenewalsService {
    appliedRenewalsRate: number = 0;

    constructor(private gusinessIntelligenceService: BusinessIntelligenceService) { }

    loadAppliedRenewalsRate(partnerId: number, rangeStart: string, rangeEnd: string): void {
        this.gusinessIntelligenceService.getPartnerAppliedRenewalsRate(partnerId, rangeStart, rangeEnd).subscribe((res: number) => {
            console.log('res: ',res);
            this.appliedRenewalsRate = res;
        });
    }
}
