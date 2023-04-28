import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { PolicyService } from '@services/policy.service';

import * as moment from 'moment';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { POLICY_STATUS } from '@constants/global';

@Injectable()
export class ChartWorkspaceCancellationsVsEmissionsService {
    statsData: any[] = [];

    constructor(
        private _policyService: PolicyService
    ) { }

    getStats(rangeStart: string, rangeEnd: string): Observable<StatRangeData[][]> {
        this.statsData = [];
        let requests: Observable<StatRangeData[]>[] = [];
        const rangeFieldCancellations: string = 'updatedAt';
        const rangeFieldEmissions: string = 'emissionDate';
        const filterCancellations: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CANCELLED]);
        const filterEmissions: string = '';
        requests.push(this._policyService.getTotalPoliciesStats(filterCancellations, rangeFieldCancellations, rangeStart, rangeEnd));
        requests.push(this._policyService.getTotalPoliciesStats(filterEmissions, rangeFieldEmissions, rangeStart, rangeEnd));
        return forkJoin(requests);
    }

    loadStatsData(stats: StatRangeData[][]): void {
        const headerData: any[] = [['', 'Cancelaciones', 'Emisiones']];
        this.statsData = ChartHelper.generateChartDataByRanges(stats, headerData, false);
    }
}
