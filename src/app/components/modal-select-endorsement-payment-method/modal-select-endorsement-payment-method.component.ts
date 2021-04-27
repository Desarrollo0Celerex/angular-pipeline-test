import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ENDORSEMENT_PAYMENT_METHODS } from '@constants/global';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-endorsement-payment-method',
  templateUrl: './modal-select-endorsement-payment-method.component.html',
  styles: [
  ]
})
export class ModalSelectEndorsementPaymentMethodComponent {
    @Input() currencyName: string = '';
    @Input() increasedAmount: number = 0;
    @Input() modalId: string = '';
    @Output() endorsementPaymentMethodSelected: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Click event to select the payment method: policy receipts
     */
    onClickSelectPolicyReceipts(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementPaymentMethodSelected.emit(ENDORSEMENT_PAYMENT_METHODS.POLICY_RECEIPTS);
    }

    /**
     * Click event to select the payment method: independent receipts
     */
    onClickSelectIndependentReceipts(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementPaymentMethodSelected.emit(ENDORSEMENT_PAYMENT_METHODS.INDEPENDENT_RECEIPTS);
    }
}
