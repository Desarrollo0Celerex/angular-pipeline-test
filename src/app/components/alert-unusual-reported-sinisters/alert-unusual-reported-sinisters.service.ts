import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertUnusualReportedSinistersService {
    reportedSinisters: number = 0;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadReportedSinisters(contactId: string, policyId: string): void {
        this.businessIntelligenceService.getReportedSinisters(contactId, policyId).subscribe((res: number) => {
            this.reportedSinisters = res;
        })
    }
}
