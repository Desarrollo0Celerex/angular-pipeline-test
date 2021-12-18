import { Injectable } from '@angular/core';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class CardKpiTotalPendingPaymentsService {
    totalPendingReceipts: number = 0;

    constructor(private _paymentService: PaymentService) { }

    loadTotalPendingReceipts(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE])
        this._paymentService.getTotalPayments(filters).subscribe((res: number) => {
            this.totalPendingReceipts = res;
        })
    }
}
