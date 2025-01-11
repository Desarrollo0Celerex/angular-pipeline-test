import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertPartnerUnusualWalletDecreaseService } from './alert-partner-unusual-wallet-decrease.service';

@Component({
    selector: 'agt-alert-partner-unusual-wallet-decrease',
    templateUrl: './alert-partner-unusual-wallet-decrease.component.html',
    styles: [],
    providers: [AlertPartnerUnusualWalletDecreaseService],
    standalone: false
})
export class AlertPartnerUnusualWalletDecreaseComponent implements OnChanges {
    @Input() partnerId: number = 0;

    constructor(public model: AlertPartnerUnusualWalletDecreaseService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && !!changes.partnerId.currentValue) {
            this.model.loadWalletDecreaseRate(changes.partnerId.currentValue);
        }
    }

}
