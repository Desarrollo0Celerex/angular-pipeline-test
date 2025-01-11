import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertContactUnusualWalletDecreaseService } from './alert-contact-unusual-wallet-decrease.service';

@Component({
    selector: 'agt-alert-contact-unusual-wallet-decrease',
    templateUrl: './alert-contact-unusual-wallet-decrease.component.html',
    styles: [],
    providers: [AlertContactUnusualWalletDecreaseService],
    standalone: false
})
export class AlertContactUnusualWalletDecreaseComponent implements OnChanges {
    @Input() contactId: string = '';

    constructor(public model: AlertContactUnusualWalletDecreaseService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && !!changes.contactId.currentValue) {
            this.model.loadWalletDecreaseRate(changes.contactId.currentValue);
        }
    }
}
