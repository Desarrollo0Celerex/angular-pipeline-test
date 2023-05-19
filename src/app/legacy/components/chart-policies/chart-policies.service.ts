import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartPoliciesService {
    policiesStatsData: any[] = [];

    constructor(private _policyService: PolicyService) { }

    getPoliciesStats(range: ComparisonRangeData): Observable<StatRangeData[][]> {
        this.policiesStatsData = [];
        const rangeField: string = 'validityStartDate';
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._policyService.getPoliciesStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._policyService.getPoliciesStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadPoliciesStatsData(policiesStats: StatRangeData[][]): void {
        const headerData: any[] = [['Pólizas', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.policiesStatsData = ChartHelper.generateChartDataByRanges(policiesStats, headerData);
    }
}
