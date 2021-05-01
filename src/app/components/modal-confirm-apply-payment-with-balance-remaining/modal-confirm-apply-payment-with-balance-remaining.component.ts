import { Component, EventEmitter, Input, Output } from '@angular/core';

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
    @Output() paymentApplicationCancelled: EventEmitter<void> = new EventEmitter<void>();
    @Output() paymentApplicationConfirmed: EventEmitter<void> = new EventEmitter<void>();

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
}
