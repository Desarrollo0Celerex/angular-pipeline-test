import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertUnusualLatePaymentsService {
    latePayments: number = 0;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadLatePayments(contactId: string, policyId: string): void {
        this.businessIntelligenceService.getLatePayments(contactId, policyId).subscribe((res: number) => {
            this.latePayments = res;
        })
    }
}
