import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ChartAppliedPaymentsService {
    appliedPaymentsStatsData: any[] = [];

    constructor(private _receiptPaidService: ReceiptPaidService) { }

    getAppliedPaymentsStats(range: RangeData): Observable<RangeStat[][]> {
        this.appliedPaymentsStatsData = [];
        const rangeField: string = 'applicationDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._receiptPaidService.getAppliedPaymentsStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._receiptPaidService.getAppliedPaymentsStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadAppliedPaymentsStatsData(appliedPaymentsStats: RangeStat[][]): void {
        const headerData: any[] = [['Cobranza', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.appliedPaymentsStatsData = ChartHelper.generateChartDataByRanges(appliedPaymentsStats, headerData);
    }
}
