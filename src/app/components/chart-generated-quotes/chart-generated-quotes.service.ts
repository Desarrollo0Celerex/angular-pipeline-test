import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeStat } from '@interfaces/range-stat.interface';
import { RangeData } from '@interfaces/range-data.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ChartGeneratedQuotesService {
    quotationsStatsData: any[] = [];

    constructor(private _quotationService: QuotationService) { }

    getQuotationsStats(range: RangeData): Observable<RangeStat[][]> {
        this.quotationsStatsData = [];
        const rangeField: string = 'createdAt';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._quotationService.getQuotationsStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._quotationService.getQuotationsStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadQuotationsStatsData(quotationsStats: RangeStat[][]): void {
        const headerData: any[] = [['Cotizaciones', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.quotationsStatsData = ChartHelper.generateChartDataByRanges(quotationsStats, headerData);
    }
}
