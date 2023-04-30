import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

const REPORT_TYPES: any = {
    APPLIED_PAYMENTS: 1,
    PENDING_PAYMENTS: 2,
};

@Injectable()
export class CardPartnerPaymentReportsService {
    REPORT_TYPES: any = REPORT_TYPES;
    loadedContent: boolean = false;
    selectedReportType: number = REPORT_TYPES.PENDING_PAYMENTS;
    totalPartnerAppliedPayments: number = 0;
    totalPartnerPendingPayments: number = 0;

    constructor(
        private _paymentService: PaymentService,
        private _receiptPaidService: ReceiptPaidService
    ) {}

    downloadReport(
        partnerId: number,
        rangeStart: string,
        rangeEnd: string,
        formatType: number
    ): Promise<void> {
        switch (this.selectedReportType) {
            case REPORT_TYPES.APPLIED_PAYMENTS:
                return this._downloadReportAppliedPayments(
                    partnerId,
                    rangeStart,
                    rangeEnd,
                    formatType
                );

            default:
                return this._downloadReportPendingPayments(
                    partnerId,
                    rangeStart,
                    rangeEnd,
                    formatType
                );
        }
    }

    loadTotalPayments(
        parnerId: number,
        rangeStart: string,
        rangeEnd: string
    ): void {
        this.loadedContent = false;
        const rangeField: string = 'paymentDate';
        const renewalRequests: Observable<number[]> =
            this._generatePaymentRequests(
                parnerId,
                rangeField,
                rangeStart,
                rangeEnd
            );
        renewalRequests.subscribe((res: number[]) => {
            this.totalPartnerAppliedPayments = res[0];
            this.totalPartnerPendingPayments = res[1];
            this.loadedContent = true;
        });
    }

    private _downloadReportAppliedPayments(
        partnerId: number,
        rangeStart: string,
        rangeEnd: string,
        formatType: number
    ): Promise<void> {
        return new Promise((resolve) => {
            const rangeField: string = 'paymentDate';
            const sortBy: string = 'applicationDate';
            this._receiptPaidService
                .downloadReportPartnerAppliedPayments(
                    partnerId,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy
                )
                .then((response: any) => {
                    const filename = response.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .split('"')[1]
                        .trim();
                    const blob = new Blob([response.body], {
                        type: response.type.toString(),
                    });
                    saveAs(blob, filename);
                    resolve();
                });
        });
    }

    private _downloadReportPendingPayments(
        partnerId: number,
        rangeStart: string,
        rangeEnd: string,
        formatType: number
    ): Promise<void> {
        return new Promise((resolve) => {
            const filters: string = UtilitiesHelper.generateHttpFilter(
                'paymentStatusId',
                [
                    PAYMENT_STATUS.INTIME,
                    PAYMENT_STATUS.PENDING,
                    PAYMENT_STATUS.LATE,
                    PAYMENT_STATUS.OVERDUE,
                ]
            );
            const rangeField: string = 'paymentDate';
            const sortBy: string = 'paymentDate';
            this._paymentService
                .downloadReportPartnerPendingPayments(
                    partnerId,
                    filters,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy
                )
                .then((response: any) => {
                    const filename = response.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .split('"')[1]
                        .trim();
                    const blob = new Blob([response.body], {
                        type: response.type.toString(),
                    });
                    saveAs(blob, filename);
                    resolve();
                });
        });
    }

    private _generatePaymentRequests(
        parnerId: number,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string
    ): Observable<number[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [
                PAYMENT_STATUS.INTIME,
                PAYMENT_STATUS.PENDING,
                PAYMENT_STATUS.LATE,
                PAYMENT_STATUS.OVERDUE,
            ]
        );
        let requests: Observable<number>[] = [];
        const requestTotalPartnerAppliedPayments: Observable<number> =
            this._receiptPaidService.getTotalPartnerReceiptsPaid(
                parnerId,
                rangeField,
                rangeStart,
                rangeEnd
            );
        const requestTotalPartnerPendingPayments: Observable<number> =
            this._paymentService.getTotalPartnerPayments(
                parnerId,
                filters,
                rangeField,
                rangeStart,
                rangeEnd
            );
        requests.push(requestTotalPartnerAppliedPayments);
        requests.push(requestTotalPartnerPendingPayments);
        return forkJoin(requests);
    }
}
