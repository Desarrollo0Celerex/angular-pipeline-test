import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertGroupUnusualWalletDecreaseService } from './alert-group-unusual-wallet-decrease.service';

@Component({
    selector: 'agt-alert-group-unusual-wallet-decrease',
    templateUrl: './alert-group-unusual-wallet-decrease.component.html',
    styles: [],
    providers: [AlertGroupUnusualWalletDecreaseService],
    standalone: false
})
export class AlertGroupUnusualWalletDecreaseComponent implements OnChanges {
    @Input() groupId: string = '';

    constructor(public model: AlertGroupUnusualWalletDecreaseService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && !!changes.groupId.currentValue) {
            this.model.loadWalletDecreaseRate(changes.groupId.currentValue);
        }
    }
}
