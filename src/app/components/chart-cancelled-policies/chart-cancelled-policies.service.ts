import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { POLICY_STATUS } from '@constants/global';
import { ChartHelper } from '@helpers/chart.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartCancelledPoliciesService {
    cancelledPoliciesStatsData: any[] = [];

    constructor(private _policyService: PolicyService) { }

    getCancelledPoliciesStats(range: RangeData): Observable<RangeStat[][]> {
        this.cancelledPoliciesStatsData = [];
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CANCELLED])
        const rangeField: string = 'updatedAt';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._policyService.getCancelledPoliciesStats(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._policyService.getCancelledPoliciesStats(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadCancelledPoliciesStatsData(cancelledPoliciesStats: RangeStat[][]): void {
        const headerData: any[] = [['Pólizas', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.cancelledPoliciesStatsData = ChartHelper.generateChartDataByRanges(cancelledPoliciesStats, headerData);
    }
}
