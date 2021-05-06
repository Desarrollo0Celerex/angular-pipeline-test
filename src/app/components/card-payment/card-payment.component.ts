import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Payment } from '@interfaces/payment.interface';
import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';

@Component({
  selector: 'agt-card-payment',
  templateUrl: './card-payment.component.html',
  styles: [
  ]
})
export class CardPaymentComponent {
    @Input() payment: Payment | null = null;
    @Output() applyPayment: EventEmitter<ShowPaymentHistoryData> = new EventEmitter<ShowPaymentHistoryData>();
    @Output() cancelPolicy: EventEmitter<{ policyId: string, contactId: string }> = new EventEmitter<{ policyId: string, contactId: string }>();
    @Output() showContactData: EventEmitter<string> = new EventEmitter<string>();
    @Output() showHistoryPolicy: EventEmitter<{ policyId: string, contactId: string }> = new EventEmitter<{ policyId: string, contactId: string }>();
    @Output() showPaymentHistory: EventEmitter<ShowPaymentHistoryData> = new EventEmitter<ShowPaymentHistoryData>();

    constructor() { }

    /**
     * Click event to request apply the payment
     */
    onClickApplyPayment(): void {
        if(!!this.payment) {
            this.applyPayment.emit({policyId: this.payment.policyId, contactId: this.payment.contactId, paymentId: this.payment.paymentId});
        }
    }

    /**
     * Click event to request cancel the policy
     */
    onClickCancelPolicy(): void {
        if(!!this.payment) {
            this.cancelPolicy.emit({policyId: this.payment.policyId, contactId: this.payment.contactId});
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

    /**
     * Click event to request show the history policy
     */
    onClickShowHistoryPolicy(): void {
        if(!!this.payment) {
            this.showHistoryPolicy.emit({policyId: this.payment.policyId, contactId: this.payment.contactId});
        }
    }

    /**
     * Click event to request show the payment history
     */
    onClickShowPaymentHistory(): void {
        if(!!this.payment) {
            this.showPaymentHistory.emit({policyId: this.payment.policyId, contactId: this.payment.contactId, paymentId: this.payment.paymentId});
        }
    }

}
