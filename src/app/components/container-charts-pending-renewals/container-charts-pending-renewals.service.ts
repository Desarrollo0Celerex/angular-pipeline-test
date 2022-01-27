import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ContainerCharts } from '@interfaces/container-charts.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerChartsPendingRenewalsService {
    chartsData: ContainerCharts = {
        insurers: [],
        insurances: [],
        contactTypes: []
    };

    constructor(private _policyService: PolicyService) { }

    loadClientsData(rangeField: string, rangeStart: string, rangeEnd: string): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const sortBy: string = 'validityEndDate';
        this._policyService.getPendingRenewalStats(filters, rangeField, rangeStart, rangeEnd, sortBy).subscribe((res: ContainerCharts) => {
            this.chartsData = res;
        });
    }
}
