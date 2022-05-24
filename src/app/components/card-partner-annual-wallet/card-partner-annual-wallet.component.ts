import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { UtilitiesHelper } from '@helpers/utilities.helper';

import { CardPartnerAnnualWalletService } from './card-partner-annual-wallet.service';

@Component({
  selector: 'agt-card-partner-annual-wallet',
  templateUrl: './card-partner-annual-wallet.component.html',
  styles: [
  ],
  providers: [CardPartnerAnnualWalletService]
})
export class CardPartnerAnnualWalletComponent implements OnChanges {
    @Input() partnerId: string = '';
    year: number = UtilitiesHelper.getCurrentYear();

    constructor(public model: CardPartnerAnnualWalletService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && !!changes.partnerId.currentValue) {
            this.model.loadPartnerAnnualWallet(changes.partnerId.currentValue, this.year);
        }
    }

}
