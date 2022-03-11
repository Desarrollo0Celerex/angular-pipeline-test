import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { POLICY_STATUS } from '@constants/global';
import { ChartHelper } from '@helpers/chart.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartRenewedPoliciesService {
    renewedPoliciesStatsData: any[] = [];

    constructor(private _policyService: PolicyService) { }

    getRenewedPoliciesStats(range: RangeData): Observable<RangeStat[][]> {
        this.renewedPoliciesStatsData = [];
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const rangeField: string = 'validityEndDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._policyService.getRenewedPoliciesStats(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._policyService.getRenewedPoliciesStats(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadRenewedPoliciesStatsData(renewedPoliciesStats: RangeStat[][]): void {
        const headerData: any[] = [['Pólizas', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.renewedPoliciesStatsData = ChartHelper.generateChartDataByRanges(renewedPoliciesStats, headerData);
    }
}
