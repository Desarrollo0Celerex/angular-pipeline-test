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
    @Input() modalId: string = '';
    @Input() increasedAmount: number = 0;
    @Output() endorsementPaymentMethodSelected: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Select the payment method: policy receipts
     */
    selectPolicyReceipts(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementPaymentMethodSelected.emit(ENDORSEMENT_PAYMENT_METHODS.POLICY_RECEIPTS);
    }

    /**
     * Select the payment method: independent receipts
     */
    selectIndependentReceipts(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementPaymentMethodSelected.emit(ENDORSEMENT_PAYMENT_METHODS.INDEPENDENT_RECEIPTS);
    }
}
