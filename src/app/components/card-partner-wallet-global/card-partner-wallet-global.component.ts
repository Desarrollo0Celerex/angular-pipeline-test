import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardPartnerWalletGlobalService } from './card-partner-wallet-global.service';

@Component({
  selector: 'agt-card-partner-wallet-global',
  templateUrl: './card-partner-wallet-global.component.html',
  styles: [
  ],
  providers: [CardPartnerWalletGlobalService]
})
export class CardPartnerWalletGlobalComponent implements OnChanges {
    @Input() partnerId: number = 0;

    constructor(
        public model: CardPartnerWalletGlobalService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && !!changes.partnerId.currentValue) {
            this.model.loadPartner(changes.partnerId.currentValue);
        }
    }

    goToPartnerPolicies(): void {
        this._router.navigateByUrl(ROUTES_NAME.partnerPolicies(this.partnerId.toString()));
    }
}
