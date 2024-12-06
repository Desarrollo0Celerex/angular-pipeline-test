import { Injectable } from '@angular/core';

import { SINISTER_STATUS } from '@constants/global';
import { FiltersHelper } from '@helpers/filters.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { SinisterService } from '@services/sinister.service';
import { ChartHelper } from '@helpers/chart.helper';

@Injectable()
export class ContainerFiltersInsuranceSinistersService {
    chartsData: ContainerCharts = ChartHelper.getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _sinisterService: SinisterService) {}

    loadData(
        insuranceId: number,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string
    ): void {
        this.chartsData = ChartHelper.getDefaultChartsData();
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'sinisterStatusId',
            [
                SINISTER_STATUS.RECENT,
                SINISTER_STATUS.PENDING,
                SINISTER_STATUS.UNFINISHED,
                SINISTER_STATUS.CONFLICTIVE,
                SINISTER_STATUS.FINISHED,
            ]
        );
        this._sinisterService
            .getInsuranceSinisterFilters(
                insuranceId,
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
