import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class CardReportContactAppliedReceiptsService {

    constructor(private _receiptPaidService: ReceiptPaidService) { }

    downloadReport(contactId: string, rangeField: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        return new Promise((resolve) => {
            const sortBy: string = 'applicationDate';
            this._receiptPaidService.downloadReportContactAppliedPayments(contactId, rangeField, rangeStart, rangeEnd, formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }
}
