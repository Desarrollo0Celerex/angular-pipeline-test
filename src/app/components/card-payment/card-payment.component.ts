import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Payment } from '@interfaces/payment.interface';

@Component({
  selector: 'agt-card-payment',
  templateUrl: './card-payment.component.html',
  styles: [
  ]
})
export class CardPaymentComponent {
    @Input() payment: Payment | null = null;
    @Output() applyPayment: EventEmitter<string> = new EventEmitter<string>();
    @Output() showContactData: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    /**
     * Click event to request apply the payment
     */
    onClickApplyPayment(): void {
        if(!!this.payment) {
            this.applyPayment.emit(this.payment.paymentId);
        }
    }

    /**
     * Click event to request show the contact data
     */
    onClickShowContactData(): void {
        if(!!this.payment) {
            this.showContactData.emit(this.payment.contactId);
        }
    }

}
