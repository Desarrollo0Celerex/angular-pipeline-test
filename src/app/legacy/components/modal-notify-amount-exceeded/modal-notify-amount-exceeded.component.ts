import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-notify-amount-exceeded',
  templateUrl: './modal-notify-amount-exceeded.component.html',
  styles: [
  ]
})
export class ModalNotifyAmountExceededComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() paymentId: string = '';
    @Input() policyId: string = '';
    @Input() amountExceeded: number = 0;
    @Input() currencyName: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(private _router: Router) { }

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

    goToPaymentHistory(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.paymentHistory(this.contactId, this.policyId, this.paymentId));
    }
}
