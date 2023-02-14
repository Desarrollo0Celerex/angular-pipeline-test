import { Injectable } from '@angular/core';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class CardKpiWorkspaceReceiptsPendingService {
    totalWorkspaceReceiptsPending: number = 0;

    constructor(private _paymentService: PaymentService) { }

    loadTotalWorkspaceReceiptsPending(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE, PAYMENT_STATUS.STANDBY])
        this._paymentService.getTotalPayments(filters, range.rangeField, range.rangeStart, range.rangeEnd).subscribe((res: number) => {
            this.totalWorkspaceReceiptsPending = res;
        });
    }
}
