import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Payment } from '@interfaces/payment.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-payment',
  templateUrl: './modal-select-payment.component.html',
  styles: [
  ]
})
export class ModalSelectPaymentComponent {
    @Input() modalId: string = '';
    @Input() payments: Payment[] = [];
    @Output() paymentSelected: EventEmitter<Payment> = new EventEmitter<Payment>();

    /**
     * Click event to select the payment
     * @param payment The selected payment
     */
    selectPayment(payment: Payment): void {
        ModalPlugin.hide(this.modalId);
        this.paymentSelected.emit(payment);
    }
}
