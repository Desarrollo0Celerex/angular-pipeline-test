import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertPartnerUnusualWalletDecreaseService {
    walletDecreaseRate: number = 0;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadWalletDecreaseRate(partnerId: number): void {
        this.businessIntelligenceService.getPartnerWalletDecreaseRate(partnerId).subscribe((res: number) => {
            this.walletDecreaseRate = res;
        });
    }
}
