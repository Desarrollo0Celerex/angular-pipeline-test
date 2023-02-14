import { Injectable } from '@angular/core';

import { EXTERNAL_POLICY_STATUS } from '@constants/global';
import { FiltersHelper } from '@helpers/filters.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ContainerCharts } from '@interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { ExternalPolicyService } from '@services/external-policy.service';

@Injectable()
export class ContainerChartsExternalPoliciesService {
    chartsData: ContainerCharts = this._getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _externalPolicyService: ExternalPolicyService) { }

    loadData(): void {
        this.chartsData = this._getDefaultChartsData();
        const filters: string = UtilitiesHelper.generateHttpFilter('externalPolicyStatusId', [EXTERNAL_POLICY_STATUS.INCOMPLETE, EXTERNAL_POLICY_STATUS.CURRENT]);
        this._externalPolicyService.getExternalPolicyStats(filters, '', '', '', this.specialFilter).subscribe((res: ContainerCharts) => {
            this.chartsData = res;
            this.filtersData = FiltersHelper.generateFiltersData(res);
            this.specialFilter = this.filtersData!.insurances.specialFilter + ';' + this.filtersData!.insurers.specialFilter + ';' + this.filtersData!.contactTypes.specialFilter;
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
