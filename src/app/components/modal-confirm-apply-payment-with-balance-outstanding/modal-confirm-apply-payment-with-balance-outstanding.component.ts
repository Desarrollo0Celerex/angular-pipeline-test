import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-apply-payment-with-balance-outstanding',
  templateUrl: './modal-confirm-apply-payment-with-balance-outstanding.component.html',
  styles: [
  ]
})
export class ModalConfirmApplyPaymentWithBalanceOutstandingComponent {
    @Input() balanceOutstanding: number = 0;
    @Input() modalId: string = '';
    @Input() currencyName: string = '';
    @Output() paymentApplicationCancelled: EventEmitter<void> = new EventEmitter<void>();
    @Output() paymentApplicationConfirmed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to cancel apply payment with balance outstanding
     */
    onClickCancel(): void {
        ModalPlugin.hide(this.modalId);
        this.paymentApplicationCancelled.emit();
    }

    /**
     * Click event to confirm apply payment with balance outstanding
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.paymentApplicationConfirmed.emit();
    }
}
