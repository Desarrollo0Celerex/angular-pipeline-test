import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ChartReceiptsPaidService {
    receiptsPaidStatsData: any[] = [];

    constructor(private _receiptPaidService: ReceiptPaidService) { }

    getReceiptsPaidStats(range: RangeData): Observable<RangeStat[][]> {
        this.receiptsPaidStatsData = [];
        const rangeField: string = 'paymentDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._receiptPaidService.getReceiptsPaidStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._receiptPaidService.getReceiptsPaidStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadReceiptsPaidStatsData(receiptsPaidStats: RangeStat[][]): void {
        const headerData: any[] = [['Cobranza', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.receiptsPaidStatsData = ChartHelper.generateChartDataByRanges(receiptsPaidStats, headerData);
    }
}
