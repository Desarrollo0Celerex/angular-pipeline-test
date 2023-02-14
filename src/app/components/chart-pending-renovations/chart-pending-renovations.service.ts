import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { POLICY_STATUS } from '@constants/global';
import { ChartHelper } from '@helpers/chart.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartPendingRenovationsService {
    pendingRenovationsStatsData: any[] = [];

    constructor(private _policyService: PolicyService) { }

    getPendingRenovationsStats(range: ComparisonRangeData): Observable<StatRangeData[][]> {
        this.pendingRenovationsStatsData = [];
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const rangeField: string = 'validityEndDate';
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._policyService.getPendingRenovationsStats(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._policyService.getPendingRenovationsStats(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadPendingRenovationsStatsData(pendingRenovationsStats: StatRangeData[][]): void {
        const headerData: any[] = [['Pólizas', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.pendingRenovationsStatsData = ChartHelper.generateChartDataByRanges(pendingRenovationsStats, headerData);
    }
}
