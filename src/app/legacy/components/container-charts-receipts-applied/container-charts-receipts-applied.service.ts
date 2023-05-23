import { Injectable } from '@angular/core';

import { FiltersHelper } from '@helpers/filters.helper';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ContainerChartsReceiptsAppliedService {
    chartsData: ContainerCharts = this._getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _receiptPaidService: ReceiptPaidService) { }

    loadData(rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.chartsData = this._getDefaultChartsData();
        const filters: string = '';
        this._receiptPaidService.getReceiptsAppliedStats(filters, rangeField, rangeStart, rangeEnd, this.specialFilter).subscribe((res: ContainerCharts) => {
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
