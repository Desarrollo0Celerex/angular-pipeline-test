import { Injectable } from '@angular/core';

import { FiltersHelper } from '@helpers/filters.helper';
import { ContainerCharts } from '@interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerChartsActivePoliciesService {
    chartsData: ContainerCharts = this._getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _policyService: PolicyService) { }

    loadData(rangeStart: string, rangeEnd: string): void {
        this.chartsData = this._getDefaultChartsData();
        this._policyService.getActivePolicieStats(rangeStart, rangeEnd, this.specialFilter).subscribe((res: ContainerCharts) => {
            this.chartsData = res;
            if(this.filtersData === null) {
                this.filtersData = FiltersHelper.generateFiltersData(res);
                this.specialFilter = this.filtersData!.insurances.specialFilter + ';' + this.filtersData!.insurers.specialFilter + ';' + this.filtersData!.contactTypes.specialFilter;
            } else {
                this.filtersData = FiltersHelper.updateFiltersData(res, this.filtersData);
            }
        });
    }

    private _getDefaultChartsData(): ContainerCharts {
        return {
            insurers: [],
            insurances: [],
            contactTypes: []
        };
    }
}
