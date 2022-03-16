import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PAYMENT_STATUS } from '@constants/global';
import { ReceiptApplied } from '@interfaces/receipt-applied.interface';
import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';


@Component({
  selector: 'agt-card-receipt-applied',
  templateUrl: './card-receipt-applied.component.html',
  styles: [
  ]
})
export class CardReceiptAppliedComponent {
    @Input() receiptApplied: ReceiptApplied | null = null;
    @Output() showContactData: EventEmitter<string> = new EventEmitter<string>();
    @Output() showHistoryPolicy: EventEmitter<{ policyId: string, contactId: string }> = new EventEmitter<{ policyId: string, contactId: string }>();
    @Output() showPaymentHistory: EventEmitter<ShowPaymentHistoryData> = new EventEmitter<ShowPaymentHistoryData>();
    @Output() showPolicy: EventEmitter<{ policyId: string, contactId: string }> = new EventEmitter<{ policyId: string, contactId: string }>();
    @Output() showReceiptAppliedDetails: EventEmitter<string> = new EventEmitter<string>();
    PAYMENT_STATUS: any = PAYMENT_STATUS;

    constructor() { }

    onClickShowContactData(): void {
        if(!!this.receiptApplied) {
            this.showContactData.emit(this.receiptApplied.contactId);
        }
    }

    onClickShowReceiptAppliedDetails(): void {
        if(!!this.receiptApplied) {
            this.showReceiptAppliedDetails.emit(this.receiptApplied.receiptPaidId);
        }
    }

    onClickShowHistoryPolicy(): void {
        if(!!this.receiptApplied) {
            this.showHistoryPolicy.emit({policyId: this.receiptApplied.policyId, contactId: this.receiptApplied.contactId});
        }
    }

    onClickShowPaymentHistory(): void {
        if(!!this.receiptApplied) {
            this.showPaymentHistory.emit({policyId: this.receiptApplied.policyId, contactId: this.receiptApplied.contactId, paymentId: this.receiptApplied.paymentId});
        }
    }

    onClickShowPolicy(): void {
        if(!!this.receiptApplied) {
            this.showPolicy.emit({policyId: this.receiptApplied.policyId, contactId: this.receiptApplied.contactId});
        }
    }
}
