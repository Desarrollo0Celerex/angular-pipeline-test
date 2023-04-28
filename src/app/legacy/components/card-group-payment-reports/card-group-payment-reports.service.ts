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
export class CardGroupPaymentReportsService {
    REPORT_TYPES: any = REPORT_TYPES;
    loadedContent: boolean = false;
    selectedReportType: number = REPORT_TYPES.PENDING_PAYMENTS;
    totalGroupAppliedPayments: number = 0;
    totalGroupPendingPayments: number = 0;

    constructor(
        private _paymentService: PaymentService,
        private _receiptPaidService: ReceiptPaidService
    ) { }

    downloadReport(groupId: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        switch(this.selectedReportType) {
            case REPORT_TYPES.APPLIED_PAYMENTS:
                return this._downloadReportAppliedPayments(groupId, rangeStart, rangeEnd, formatType);

            default:
                return this._downloadReportPendingPayments(groupId, rangeStart, rangeEnd, formatType);
        }
    }

    loadTotalPayments(groupId: string, rangeStart: string, rangeEnd: string): void {
        this.loadedContent = false;
        const rangeField: string = 'paymentDate';
        const renewalRequests: Observable<number[]> = this._generatePaymentRequests(groupId, rangeField, rangeStart, rangeEnd);
        renewalRequests.subscribe((res: number[]) => {
            this.totalGroupAppliedPayments = res[0];
            this.totalGroupPendingPayments = res[1];
            this.loadedContent = true;
        });
    }

    private _downloadReportAppliedPayments(groupId: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        return new Promise((resolve) => {
            const rangeField: string = 'paymentDate';
            const sortBy: string = 'applicationDate';
            this._receiptPaidService.downloadReportGroupAppliedPayments(groupId, rangeField, rangeStart, rangeEnd, formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }

    private _downloadReportPendingPayments(groupId: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        return new Promise((resolve) => {
            const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE])
            const rangeField: string = 'paymentDate';
            const sortBy: string = 'paymentDate';
            this._paymentService.downloadReportGroupPendingPayments(groupId, filters, rangeField, rangeStart, rangeEnd, formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }

    private _generatePaymentRequests(groupId: string, rangeField: string, rangeStart: string, rangeEnd: string): Observable<number[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE])
        let requests: Observable<number>[] = [];
        const requestTotalGroupAppliedPayments: Observable<number> = this._receiptPaidService.getTotalGroupReceiptsPaid(groupId, rangeField, rangeStart, rangeEnd);
        const requestTotalGroupPendingPayments: Observable<number> = this._paymentService.getTotalGroupPayments(groupId, filters, rangeField, rangeStart, rangeEnd);
        requests.push(requestTotalGroupAppliedPayments);
        requests.push(requestTotalGroupPendingPayments);
        return forkJoin(requests);
    }
}
