import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ChartReceiptsPaidService {
    receiptsPaidStatsData: any[] = [];

    constructor(private _receiptPaidService: ReceiptPaidService) { }

    getReceiptsPaidStats(range: ComparisonRangeData): Observable<StatRangeData[][]> {
        this.receiptsPaidStatsData = [];
        const rangeField: string = 'paymentDate';
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._receiptPaidService.getReceiptsPaidStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._receiptPaidService.getReceiptsPaidStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadReceiptsPaidStatsData(receiptsPaidStats: StatRangeData[][]): void {
        const headerData: any[] = [['Cobranza', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.receiptsPaidStatsData = ChartHelper.generateChartDataByRanges(receiptsPaidStats, headerData);
    }
}
