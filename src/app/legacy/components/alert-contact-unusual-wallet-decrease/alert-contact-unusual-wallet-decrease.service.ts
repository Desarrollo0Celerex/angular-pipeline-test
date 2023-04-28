import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertContactUnusualWalletDecreaseService {
    walletDecreaseRate: number = 0;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadWalletDecreaseRate(contactId: string): void {
        this.businessIntelligenceService.getContactWalletDecreaseRate(contactId).subscribe((res: number) => {
            this.walletDecreaseRate = res;
        });
    }
}
