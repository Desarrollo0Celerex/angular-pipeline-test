import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PAYMENT_STATUS } from '@constants/global';
import { Payment } from '@interfaces/payment.interface';

@Component({
  selector: 'agt-card-payment-short',
  templateUrl: './card-payment-short.component.html',
  styles: [
  ]
})
export class CardPaymentShortComponent {
    @Input() payment: Payment | null = null;
    @Output() paymentSelected: EventEmitter<Payment> = new EventEmitter<Payment>();
    PAYMENT_STATUS: any = PAYMENT_STATUS;

    selectPayment(payment: Payment): void {
        this.paymentSelected.emit(payment);
    }
}
