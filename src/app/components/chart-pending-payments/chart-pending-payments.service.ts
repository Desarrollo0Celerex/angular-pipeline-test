import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PAYMENT_STATUS } from '@constants/global';
import { ChartHelper } from '@helpers/chart.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class ChartPendingPaymentsService {
    pendingPaymentsStatsData: any[] = [];

    constructor(private _paymentService: PaymentService) { }

    getPendingPaymentsStats(range: ComparisonRangeData): Observable<StatRangeData[][]> {
        this.pendingPaymentsStatsData = [];
        const rangeField: string = 'paymentDate';
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE]);
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._paymentService.getCollectionStats(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._paymentService.getCollectionStats(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadPendingPaymentsStatsData(pendingPaymentsStats: StatRangeData[][]): void {
        const headerData: any[] = [['Cobranza', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.pendingPaymentsStatsData = ChartHelper.generateChartDataByRanges(pendingPaymentsStats, headerData);
    }
}
