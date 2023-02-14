import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { LeadService } from '@services/lead.service';

@Injectable()
export class ChartGeneratedLeadsService {
    leadsGeneratedStatsData: any[] = [];

    constructor(private _leadService: LeadService) { }

    getLeadsGeneratedStats(range: ComparisonRangeData): Observable<StatRangeData[][]> {
        this.leadsGeneratedStatsData = [];
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._leadService.getLeadsGeneratedStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._leadService.getLeadsGeneratedStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadLeadsGeneratedStatsData(leadsGeneratedStats: StatRangeData[][]): void {
        const headerData: any[] = [['Prospectos', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.leadsGeneratedStatsData = ChartHelper.generateChartDataByRanges(leadsGeneratedStats, headerData);
    }
}
