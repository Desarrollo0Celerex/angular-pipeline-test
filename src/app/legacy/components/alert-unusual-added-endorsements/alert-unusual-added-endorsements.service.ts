import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertUnusualAddedEndorsementsService {
    addedEndorsements: number = 0;

    constructor(private gusinessIntelligenceService: BusinessIntelligenceService) { }

    loadAddedEndorsements(contactId: string, policyId: string): void {
        this.gusinessIntelligenceService.getAddedEndorsements(contactId, policyId).subscribe((res: number) => {
            this.addedEndorsements = res;
        })
    }
}
