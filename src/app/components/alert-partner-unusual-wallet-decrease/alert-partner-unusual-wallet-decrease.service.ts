import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertPartnerUnusualWalletDecreaseService {
    walletDecreaseRate: number = 0;

    constructor(private gusinessIntelligenceService: BusinessIntelligenceService) { }

    loadWalletDecreaseRate(partnerId: number): void {
        this.gusinessIntelligenceService.getPartnerWalletDecreaseRate(partnerId).subscribe((res: number) => {
            this.walletDecreaseRate = res;
        });
    }
}
