import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartPoliciesService {
    policiesStatsData: any[] = [];

    constructor(private _policyService: PolicyService) { }

    getPoliciesStats(range: RangeData): Observable<RangeStat[][]> {
        this.policiesStatsData = [];
        const rangeField: string = 'validityStartDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._policyService.getPoliciesStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._policyService.getPoliciesStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadPoliciesStatsData(policiesStats: RangeStat[][]): void {
        const headerData: any[] = [['Pólizas', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.policiesStatsData = ChartHelper.generateChartDataByRanges(policiesStats, headerData);
    }
}
