import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { FiltersHelper } from '@helpers/filters.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { PolicyService } from '@services/policy.service';
import { ChartHelper } from '@helpers/chart.helper';

@Injectable()
export class ContainerChartsRenewedPoliciesService {
    chartsData: ContainerCharts = ChartHelper.getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _policyService: PolicyService) {}

    loadData(rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.chartsData = ChartHelper.getDefaultChartsData();
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policyStatusId',
            [
                POLICY_STATUS.ISSUED,
                POLICY_STATUS.CURRENT,
                POLICY_STATUS.PENDING,
                POLICY_STATUS.SUSPENDED,
                POLICY_STATUS.FINISHED,
            ]
        );
        this._policyService
            .getRenewedPoliciesSpecialFilters(
                filters,
                rangeField,
                rangeStart,
                rangeEnd,
                this.specialFilter
            )
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
