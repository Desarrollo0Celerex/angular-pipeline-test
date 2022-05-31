import { Injectable } from '@angular/core';

import { BusinessIntelligenceService } from '@services/business-intelligence.service';

@Injectable()
export class AlertGroupUnusualWalletDecreaseService {
    walletDecreaseRate: number = 0;

    constructor(private businessIntelligenceService: BusinessIntelligenceService) { }

    loadWalletDecreaseRate(groupId: string): void {
        this.businessIntelligenceService.getGroupWalletDecreaseRate(groupId).subscribe((res: number) => {
            this.walletDecreaseRate = res;
        });
    }
}
