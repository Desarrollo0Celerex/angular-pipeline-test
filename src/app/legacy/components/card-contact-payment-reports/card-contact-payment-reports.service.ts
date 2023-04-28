import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class CardContactPaymentReportsService {
    loadedContent: boolean = false;
    totalContactAppliedPayments: number = 0;
    totalContactPendingPayments: number = 0;

    constructor(
        private _paymentService: PaymentService,
        private _receiptPaidService: ReceiptPaidService
    ) { }

    loadTotalPayments(contactId: string, rangeStart: string, rangeEnd: string): void {
        this.loadedContent = false;
        const rangeField: string = 'paymentDate';
        const renewalRequests: Observable<number[]> = this._generatePaymentRequests(contactId, rangeField, rangeStart, rangeEnd);
        renewalRequests.subscribe((res: number[]) => {
            this.totalContactAppliedPayments = res[0];
            this.totalContactPendingPayments = res[1];
            this.loadedContent = true;
        });
    }

    private _generatePaymentRequests(contactId: string, rangeField: string, rangeStart: string, rangeEnd: string): Observable<number[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE])
        let requests: Observable<number>[] = [];
        const requestTotalContactAppliedPayments: Observable<number> = this._receiptPaidService.getTotalContactReceiptsPaid(contactId, rangeField, rangeStart, rangeEnd);
        const requestTotalContactPendingPayments: Observable<number> = this._paymentService.getTotalContactPayments(contactId, filters, rangeField, rangeStart, rangeEnd);
        requests.push(requestTotalContactAppliedPayments);
        requests.push(requestTotalContactPendingPayments);
        return forkJoin(requests);
    }
}
