import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class CardKpiWorkspaceReceiptsPaidService {
    totalWorkspaceReceipts: number | null = null;
    totalWorkspaceReceiptsPaid: number | null = null;

    constructor(
        private _paymentService: PaymentService,
        private _receiptPaidService: ReceiptPaidService,
    ) { }

    loadTotalWorkspaceReceipts(range: RangeData): void {
        this._paymentService.getTotalWorkspaceReceipts(range.rangeField, range.rangeStart, range.rangeEnd).subscribe((res: number) => {
            this.totalWorkspaceReceipts = res;
        });
    }

    loadTotalWorkspaceReceiptsPaid(range: RangeData): void {
        this._receiptPaidService.getTotalWorkspaceReceiptsPaid(range.rangeField, range.rangeStart, range.rangeEnd).subscribe((res: number) => {
            this.totalWorkspaceReceiptsPaid = res;
        });
    }
}
