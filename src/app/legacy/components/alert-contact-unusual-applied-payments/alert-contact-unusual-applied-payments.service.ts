import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertContactUnusualAppliedPaymentsService {
    appliedPaymentsRate: number = -1;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadAppliedPaymentsRate(contactId: string, rangeStart: string, rangeEnd: string): void {
        this.businessIntelligenceService.getContactAppliedPaymentsRate(contactId, rangeStart, rangeEnd).subscribe((res: number) => {
            this.appliedPaymentsRate = res;
        });
    }
}
