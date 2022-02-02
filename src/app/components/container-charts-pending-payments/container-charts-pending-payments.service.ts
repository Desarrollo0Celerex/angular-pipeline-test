import { Injectable } from '@angular/core';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ContainerCharts } from '@interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class ContainerChartsPendingPaymentsService {
    chartsData: ContainerCharts = this._getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _paymentService: PaymentService) { }

    loadData(rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.chartsData = this._getDefaultChartsData();
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE]);
        this._paymentService.getPendingPaymentStats(filters, rangeField, rangeStart, rangeEnd, this.specialFilter).subscribe((res: ContainerCharts) => {
            this.chartsData = res;
            if(this.filtersData === null) {
                this._loadFiltersData(res);
                this.generateSpecialFilter();
            }
        });
    }

    generateSpecialFilter(): void {
        this.specialFilter = this.filtersData!.insurances.specialFilter + ';' + this.filtersData!.insurers.specialFilter + ';' + this.filtersData!.contactTypes.specialFilter;
    }

    private _getDefaultChartsData(): ContainerCharts {
        return {
            insurers: [],
            insurances: [],
            contactTypes: []
        };
    }

    private _loadFiltersData(containerCharts: ContainerCharts): void {
        this.filtersData = {
            insurances: {
                filters: [],
                specialFilter: ''
            },
            insurers: {
                filters: [],
                specialFilter: ''
            },
            contactTypes: {
                filters: [],
                specialFilter: ''
            }
        };

        const insuranceIds: number[] = [];
        for(let insuranceData of containerCharts.insurances) {
            this.filtersData.insurances.filters.push({
                id: insuranceData.id,
                name: insuranceData.name,
                selected: true
            });
            insuranceIds.push(insuranceData.id);
        }
        this.filtersData.insurances.specialFilter = UtilitiesHelper.generateHttpFilter('insuranceId', insuranceIds);

        const insurerIds: number[] = [];
        for(let insurerData of containerCharts.insurers) {
            this.filtersData.insurers.filters.push({
                id: insurerData.id,
                name: insurerData.name,
                selected: true
            });
            insurerIds.push(insurerData.id);
        }
        this.filtersData.insurers.specialFilter = UtilitiesHelper.generateHttpFilter('insurerId', insurerIds);

        const contactTypeIds: number[] = [];
        for(let contactTypeData of containerCharts.contactTypes) {
            this.filtersData.contactTypes.filters.push({
                id: contactTypeData.id,
                name: contactTypeData.name,
                selected: true
            });
            contactTypeIds.push(contactTypeData.id);
        }
        this.filtersData.contactTypes.specialFilter = UtilitiesHelper.generateHttpFilter('contactTypeId', contactTypeIds);
    }
}
