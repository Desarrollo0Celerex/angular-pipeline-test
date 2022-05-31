import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertGroupUnusualAppliedPaymentsService {
    appliedPaymentsRate: number = -1;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadAppliedPaymentsRate(groupId: string, rangeStart: string, rangeEnd: string): void {
        this.businessIntelligenceService.getGroupAppliedPaymentsRate(groupId, rangeStart, rangeEnd).subscribe((res: number) => {
            this.appliedPaymentsRate = res;
        });
    }
}
