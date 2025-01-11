import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';

import { ModalShowReceiptAppliedDetailsService } from './modal-show-receipt-applied-details.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-receipt-applied-details',
    templateUrl: './modal-show-receipt-applied-details.component.html',
    styles: [],
    providers: [
        ModalShowReceiptAppliedDetailsService
    ],
    standalone: false
})
export class ModalShowReceiptAppliedDetailsComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() receiptAppliedId: string = '';
    @Output() showPaymentHistory: EventEmitter<ShowPaymentHistoryData> = new EventEmitter<ShowPaymentHistoryData>();

    constructor(public model: ModalShowReceiptAppliedDetailsService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.receiptAppliedId.currentValue) {
            this.model.loadReceiptApplied(this.receiptAppliedId);
        }
    }

    onShowPaymentHistory(): void {
        if(!!this.model.receiptApplied) {
            ModalPlugin.hide(this.modalId);
            this.showPaymentHistory.emit({
                contactId: this.model.receiptApplied.contactId,
                policyId: this.model.receiptApplied.policyId,
                paymentId: this.model.receiptApplied.paymentId,
            });
        }
    }
}
