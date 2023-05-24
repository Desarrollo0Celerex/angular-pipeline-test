import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class CardReportPartnerPaymentsAppliedService {
    constructor(private _receiptPaidService: ReceiptPaidService) {}

    downloadReport(
        partnerId: string,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string,
        specialFilter: string,
        formatType: number
    ): Promise<void> {
        return new Promise((resolve) => {
            const sortBy: string = 'paymentDate';
            this._receiptPaidService
                .downloadReportPartnerAppliedPayments(
                    parseInt(partnerId),
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy,
                    specialFilter
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
}
