import { Injectable } from '@angular/core';

import { SINISTER_STATUS } from '@constants/global';
import { FiltersHelper } from '@helpers/filters.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ContainerCharts } from '@interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ContainerChartsOpenedSinistersService {
    chartsData: ContainerCharts = this._getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _sinisterService: SinisterService) {}

    loadData(rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.chartsData = this._getDefaultChartsData();
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'sinisterStatusId',
            [
                SINISTER_STATUS.RECENT,
                SINISTER_STATUS.PENDING,
                SINISTER_STATUS.UNFINISHED,
                SINISTER_STATUS.CONFLICTIVE,
            ]
        );
        this._sinisterService
            .getSinisterStats(
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

    private _getDefaultChartsData(): ContainerCharts {
        return {
            insurers: [],
            insurances: [],
            contactTypes: [],
        };
    }
}
