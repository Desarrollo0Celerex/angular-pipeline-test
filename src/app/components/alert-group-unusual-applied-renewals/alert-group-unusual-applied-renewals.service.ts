import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertGroupUnusualAppliedRenewalsService {
    appliedRenewalsRate: number = -1;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadAppliedRenewalsRate(groupId: string, rangeStart: string, rangeEnd: string): void {
        this.businessIntelligenceService.getGroupAppliedRenewalsRate(groupId, rangeStart, rangeEnd).subscribe((res: number) => {
            this.appliedRenewalsRate = res;
        });
    }
}
