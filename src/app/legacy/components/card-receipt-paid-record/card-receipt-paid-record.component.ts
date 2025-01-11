import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DeleteReceiptPaidData } from '@interfaces/delete-receipt-paid-data.interface';
import { ReceiptPaid } from '@interfaces/receipt-paid.interface';

@Component({
    selector: 'agt-card-receipt-paid-record',
    templateUrl: './card-receipt-paid-record.component.html',
    styles: [],
    standalone: false
})
export class CardReceiptPaidRecordComponent {
    @Input() receiptPaid: ReceiptPaid | null = null;
    @Input() index: number | null = null;
    @Output() deleteReceiptPaid: EventEmitter<DeleteReceiptPaidData> = new EventEmitter<DeleteReceiptPaidData>();
    @Output() updateReceiptPaid: EventEmitter<string> = new EventEmitter<string>();
    @Output() showPaymentEvidence: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Click event to delete the receipt paid
     */
    onClickDeleteReceiptPaid(): void {
        if(!!this.receiptPaid) {
            this.deleteReceiptPaid.emit({paymentId: this.receiptPaid.paymentId, receiptPaidId: this.receiptPaid.receiptPaidId})
        }
    }

    onClickShowPaymentEvidence(): void {
        if(!!this.receiptPaid) {
            this.showPaymentEvidence.emit(this.receiptPaid.paymentEvidenceUrl)
        }
    }

    requestUpdateReceiptPaid(): void {
        if(!!this.receiptPaid) {
            this.updateReceiptPaid.emit(this.receiptPaid.receiptPaidId);
        }
    }

}
