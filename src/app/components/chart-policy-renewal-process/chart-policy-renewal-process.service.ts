import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartPolicyRenewalProcessService {
    renewalProcessStatsData: any[] = [];

    constructor(private _policyService: PolicyService) { }

    getRenewalProcessStats(range: ComparisonRangeData): Observable<number[]> {
        this.renewalProcessStatsData = [];
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const rangeField: string = 'validityEndDate';
        let requests: Observable<number>[] = [];
        requests.push(this._policyService.getTotalWorkspaceRenewalsApplied(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._policyService.getTotalWorkspaceRenewalsPending(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        return forkJoin(requests);
    }

    loadRenewalProcessStatsData(renewalProcessStats: number[]): void {
        this.renewalProcessStatsData.push(['Estatus', 'Renovaciones Aplicadas', 'Renovaciones Pendientes', { role: 'annotation'} ]);
        this.renewalProcessStatsData.push(['', renewalProcessStats[0], renewalProcessStats[1], '']);
    }
}
