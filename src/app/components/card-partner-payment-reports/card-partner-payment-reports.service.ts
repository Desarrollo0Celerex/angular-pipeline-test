import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class CardPartnerPaymentReportsService {
    totalPartnerAppliedPayments: number = 0;
    totalPartnerPendingPayments: number = 0;
    loadedContent: boolean = false;

    constructor(
        private _paymentService: PaymentService,
        private _receiptPaidService: ReceiptPaidService
    ) { }

    loadTotalPayments(parnerId: number, rangeStart: string, rangeEnd: string): void {
        this.loadedContent = false;
        const rangeField: string = 'paymentDate';
        const renewalRequests: Observable<number[]> = this._generatePaymentRequests(parnerId, rangeField, rangeStart, rangeEnd);
        renewalRequests.subscribe((res: number[]) => {
            this.totalPartnerAppliedPayments = res[0];
            this.totalPartnerPendingPayments = res[1];
            this.loadedContent = true;
        });
    }

    private _generatePaymentRequests(parnerId: number, rangeField: string, rangeStart: string, rangeEnd: string): Observable<number[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE, PAYMENT_STATUS.FINISHED])
        let requests: Observable<number>[] = [];
        const requestTotalPartnerAppliedPayments: Observable<number> = this._receiptPaidService.getTotalPartnerReceiptsPaid(parnerId, rangeField, rangeStart, rangeEnd);
        const requestTotalPartnerPendingPayments: Observable<number> = this._paymentService.getTotalPartnerPayments(parnerId, filters, rangeField, rangeStart, rangeEnd);
        requests.push(requestTotalPartnerAppliedPayments);
        requests.push(requestTotalPartnerPendingPayments);
        return forkJoin(requests);
    }
}
