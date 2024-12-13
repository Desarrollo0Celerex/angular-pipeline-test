import { Injectable } from '@angular/core';

import { FiltersHelper } from '@helpers/filters.helper';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';
import { ChartHelper } from '@helpers/chart.helper';

@Injectable()
export class ContainerChartsReceiptsAppliedService {
    chartsData: ContainerCharts = ChartHelper.getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _receiptPaidService: ReceiptPaidService) {}

    loadData(rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.chartsData = ChartHelper.getDefaultChartsData();
        const filters: string = '';
        this._receiptPaidService
            .getReceiptsAppliedStats(
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
