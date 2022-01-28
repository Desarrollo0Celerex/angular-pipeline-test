import { Injectable } from '@angular/core';

import { ContainerCharts } from '@interfaces/container-charts.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerChartsActivePoliciesService {
    chartsData: ContainerCharts = this._getDefaultData();

    constructor(private _policyService: PolicyService) { }

    loadData(rangeStart: string, rangeEnd: string): void {
        this.chartsData = this._getDefaultData();
        this._policyService.getActivePolicieStats(rangeStart, rangeEnd).subscribe((res: ContainerCharts) => {
            this.chartsData = res;
        });
    }

    private _getDefaultData(): ContainerCharts {
        return {
            insurers: [],
            insurances: [],
            contactTypes: []
        };
    }
}
