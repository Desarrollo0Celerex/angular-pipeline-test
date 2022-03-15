import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ChartTicketPaymentProcessService {
    paymentProcessStatsData: any[] = [];

    constructor(
        private _paymentService: PaymentService,
        private _receiptPaidService: ReceiptPaidService
    ) { }

    getPaymentProcessStats(range: RangeData): Observable<number[]> {
        this.paymentProcessStatsData = [];
        const rangeField: string = 'paymentDate';
        const receiptsPaidFilters: string = '';
        const paymentsFilters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE]);
        let requests: Observable<number>[] = [];
        requests.push(this._receiptPaidService.getTotalReceiptsPaid(receiptsPaidFilters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._paymentService.getTotalPayments(paymentsFilters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        return forkJoin(requests);
    }

    loadPaymentProcessStatsData(paymentProcessStats: number[]): void {
        this.paymentProcessStatsData.push(['Estatus', 'Recibos Aplicados', 'Recibos Pendientes', { role: 'annotation'} ]);
        this.paymentProcessStatsData.push(['', paymentProcessStats[0], paymentProcessStats[1], '']);
    }
}
