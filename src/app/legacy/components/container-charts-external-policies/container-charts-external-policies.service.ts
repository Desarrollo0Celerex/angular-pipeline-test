import { Injectable } from '@angular/core';

import { EXTERNAL_POLICY_STATUS } from '@constants/global';
import { FiltersHelper } from '@helpers/filters.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { ExternalPolicyService } from '@services/external-policy.service';
import { ChartHelper } from '@helpers/chart.helper';

@Injectable()
export class ContainerChartsExternalPoliciesService {
    chartsData: ContainerCharts = ChartHelper.getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _externalPolicyService: ExternalPolicyService) {}

    loadData(): void {
        this.chartsData = ChartHelper.getDefaultChartsData();
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'externalPolicyStatusId',
            [EXTERNAL_POLICY_STATUS.INCOMPLETE, EXTERNAL_POLICY_STATUS.CURRENT]
        );
        this._externalPolicyService
            .getExternalPolicyStats(filters, '', '', '', this.specialFilter)
            .subscribe((res: ContainerCharts) => {
                this.chartsData = res;
                this.filtersData = FiltersHelper.generateFiltersData(res);
                this.specialFilter =
                    this.filtersData!.insurances.specialFilter +
                    ';' +
                    this.filtersData!.insurers.specialFilter +
                    ';' +
                    this.filtersData!.contactTypes.specialFilter;
            });
    }
}
