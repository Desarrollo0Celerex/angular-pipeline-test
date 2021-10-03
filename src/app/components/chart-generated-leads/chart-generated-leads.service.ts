import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { LeadService } from '@services/lead.service';

@Injectable()
export class ChartGeneratedLeadsService {
    leadsGeneratedStatsData: any[] = [];

    constructor(private _leadService: LeadService) { }

    getLeadsGeneratedStats(range: RangeData): Observable<RangeStat[][]> {
        this.leadsGeneratedStatsData = [];
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._leadService.getLeadsGeneratedStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._leadService.getLeadsGeneratedStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadLeadsGeneratedStatsData(leadsGeneratedStats: RangeStat[][]): void {
        const headerData: any[] = [['Prospectos', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.leadsGeneratedStatsData = ChartHelper.generateChartDataByRanges(leadsGeneratedStats, headerData);
    }
}
