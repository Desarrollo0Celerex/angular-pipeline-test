import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertContactUnusualAppliedRenewalsService {
    appliedRenewalsRate: number = -1;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadAppliedRenewalsRate(contactId: string, rangeStart: string, rangeEnd: string): void {
        this.businessIntelligenceService.getContactAppliedRenewalsRate(contactId, rangeStart, rangeEnd).subscribe((res: number) => {
            this.appliedRenewalsRate = res;
        });
    }
}
