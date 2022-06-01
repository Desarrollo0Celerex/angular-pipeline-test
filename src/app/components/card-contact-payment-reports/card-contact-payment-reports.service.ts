import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

const REPORT_TYPES: any = {
    APPLIED_PAYMENTS: 1,
    PENDING_PAYMENTS: 2
};

@Injectable()
export class CardContactPaymentReportsService {
    REPORT_TYPES: any = REPORT_TYPES;
    loadedContent: boolean = false;
    selectedReportType: number = REPORT_TYPES.PENDING_PAYMENTS;
    totalContactAppliedPayments: number = 0;
    totalContactPendingPayments: number = 0;

    constructor(
        private _paymentService: PaymentService,
        private _receiptPaidService: ReceiptPaidService
    ) { }

    downloadReport(contactId: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        switch(this.selectedReportType) {
            case REPORT_TYPES.APPLIED_PAYMENTS:
                return this._downloadReportAppliedPayments(contactId, rangeStart, rangeEnd, formatType);

            default:
                return this._downloadReportPendingPayments(contactId, rangeStart, rangeEnd, formatType);
        }
    }

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

    private _downloadReportAppliedPayments(contactId: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        return new Promise((resolve) => {
            const rangeField: string = 'paymentDate';
            const sortBy: string = 'applicationDate';
            this._receiptPaidService.downloadReportContactAppliedPayments(contactId, rangeField, rangeStart, rangeEnd, formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }

    private _downloadReportPendingPayments(contactId: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        return new Promise((resolve) => {
            const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE])
            const rangeField: string = 'paymentDate';
            const sortBy: string = 'paymentDate';
            this._paymentService.downloadReportContactPendingPayments(contactId, filters, rangeField, rangeStart, rangeEnd, formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
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
