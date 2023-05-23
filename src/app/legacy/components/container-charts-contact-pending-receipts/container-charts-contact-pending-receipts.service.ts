import { Injectable } from '@angular/core';

import { PAYMENT_STATUS } from '@constants/global';
import { FiltersHelper } from '@helpers/filters.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { PaymentService } from '@core/services/payment/payment.service';

@Injectable()
export class ContainerChartsContactPendingReceiptsService {
    chartsData: ContainerCharts = this._getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _paymentService: PaymentService) {}

    loadData(contactId:string, rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.chartsData = this._getDefaultChartsData();
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [
                PAYMENT_STATUS.INTIME,
                PAYMENT_STATUS.PENDING,
                PAYMENT_STATUS.LATE,
                PAYMENT_STATUS.OVERDUE,
            ]
        );
        this._paymentService
            .getContactPendingPaymentStats(
                contactId,
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
