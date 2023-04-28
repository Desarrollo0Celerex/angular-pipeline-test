import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ChartGeneratedQuotesService {
    quotationsStatsData: any[] = [];

    constructor(private _quotationService: QuotationService) { }

    getQuotationsStats(range: ComparisonRangeData): Observable<StatRangeData[][]> {
        this.quotationsStatsData = [];
        const rangeField: string = 'createdAt';
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._quotationService.getQuotationsStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._quotationService.getQuotationsStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadQuotationsStatsData(quotationsStats: StatRangeData[][]): void {
        const headerData: any[] = [['Cotizaciones', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.quotationsStatsData = ChartHelper.generateChartDataByRanges(quotationsStats, headerData);
    }
}
