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
    @Input() endorsementAmount: number = 0;
    @Input() modalId: string = '';
    @Output() endorsementPaymentMethodSelected: EventEmitter<number> = new EventEmitter<number>();
    ENDORSEMENT_PAYMENT_METHODS: any = ENDORSEMENT_PAYMENT_METHODS;

    selectMethod(selectedMethod: number): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementPaymentMethodSelected.emit(selectedMethod);
    }
}
