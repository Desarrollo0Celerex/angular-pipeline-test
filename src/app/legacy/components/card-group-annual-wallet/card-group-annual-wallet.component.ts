import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { UtilitiesHelper } from '@core/helpers/utilities.helper';

import { CardGroupAnnualWalletService } from './card-group-annual-wallet.service';

@Component({
    selector: 'agt-card-group-annual-wallet',
    templateUrl: './card-group-annual-wallet.component.html',
    styles: [],
    providers: [CardGroupAnnualWalletService],
    standalone: false
})
export class CardGroupAnnualWalletComponent implements OnChanges {
    @Input() groupId: string = '';
    year: number = UtilitiesHelper.getCurrentYear();

    constructor(public model: CardGroupAnnualWalletService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.groupId && !!changes.groupId.currentValue) {
            this.model.loadGroupAnnualWallet(
                changes.groupId.currentValue,
                this.year
            );
        }
    }
}
