import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-apply-payment-with-balance-remaining',
  templateUrl: './modal-confirm-apply-payment-with-balance-remaining.component.html',
  styles: [
  ]
})
export class ModalConfirmApplyPaymentWithBalanceRemainingComponent {
    @Input() balanceRemaining: number = 0;
    @Input() modalId: string = '';
    @Input() currencyName: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Output() paymentApplicationCancelled: EventEmitter<void> = new EventEmitter<void>();
    @Output() paymentApplicationConfirmed: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _router: Router) { }

    /**
     * Click event to cancel apply payment with balance remaining
     */
    onClickCancel(): void {
        ModalPlugin.hide(this.modalId);
        this.paymentApplicationCancelled.emit();
    }

    /**
     * Click event to confirm apply payment with balance remaining
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.paymentApplicationConfirmed.emit();
    }

    /**
     * Click event to show the payment history
     */
    onClickShowPaymentHistory(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.paymentHistory(this.contactId, this.policyId, this.paymentId))
    }
}
