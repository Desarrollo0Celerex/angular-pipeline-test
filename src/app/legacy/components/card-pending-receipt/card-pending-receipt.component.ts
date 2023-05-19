import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Payment } from '@core/interfaces/payment.interface';
import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';

@Component({
    selector: 'agt-card-pending-receipt',
    templateUrl: './card-pending-receipt.component.html',
    styles: [],
})
export class CardPendingReceiptComponent {
    @Input() pendingReceipt: Payment | null = null;
    @Input() index: number | null = null;
    @Output() showContactData: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() applyPayment: EventEmitter<ShowPaymentHistoryData> =
        new EventEmitter<ShowPaymentHistoryData>();

    requestApplyPayment(): void {
        if (this.pendingReceipt) {
            const data: ShowPaymentHistoryData = {
                contactId: this.pendingReceipt.contactId,
                policyId: this.pendingReceipt.policyId,
                paymentId: this.pendingReceipt.paymentId,
            };
            this.applyPayment.emit(data);
        }
    }

    requestShowContactData(): void {
        if (this.pendingReceipt) {
            this.showContactData.emit(this.pendingReceipt.contactId);
        }
    }
}
