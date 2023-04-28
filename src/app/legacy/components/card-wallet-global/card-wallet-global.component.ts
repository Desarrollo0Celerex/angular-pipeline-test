import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardWalletGlobalService } from './card-wallet-global.service';

@Component({
  selector: 'agt-card-wallet-global',
  templateUrl: './card-wallet-global.component.html',
  styles: [
  ],
  providers: [CardWalletGlobalService]
})
export class CardWalletGlobalComponent implements OnChanges {
    @Input() contactId: string = '';

    constructor(
        public cardWalletGlobalService: CardWalletGlobalService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && !!changes.contactId.currentValue) {
            this.cardWalletGlobalService.loadContact(changes.contactId.currentValue);
        }
    }

    get currencyName(): string {
        return (!!this.cardWalletGlobalService.contact) ? this.cardWalletGlobalService.contact.currencyName : '';
    }

    get totalActivePolicies(): number {
        return (!!this.cardWalletGlobalService.contact) ? this.cardWalletGlobalService.contact.totalActivePolicies : 0;
    }

    get totalCancelledPolicies(): number {
        return (!!this.cardWalletGlobalService.contact) ? this.cardWalletGlobalService.contact.totalCancelledPolicies : 0;
    }

    get totalExpiredPolicies(): number {
        return (!!this.cardWalletGlobalService.contact) ? this.cardWalletGlobalService.contact.totalExpiredPolicies : 0;
    }

    get totalGlobalCurrentWallet(): number {
        return (!!this.cardWalletGlobalService.contact) ? this.cardWalletGlobalService.contact.totalGlobalCurrentWallet : 0;
    }

    /**
     * Navigate to policies
     */
    goToPolicies(): void {
        this._router.navigateByUrl(ROUTES_NAME.listContactPolicies(this.contactId));
    }

}
