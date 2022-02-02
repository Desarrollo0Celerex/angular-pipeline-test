import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ContainerCharts } from '@interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerChartsPendingRenewalsService {
    chartsData: ContainerCharts = this._getDefaultChartsData();
    filtersData: ContainerFilters | null = null;
    specialFilter: string = '';

    constructor(private _policyService: PolicyService) { }

    loadData(rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.chartsData = this._getDefaultChartsData();
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const sortBy: string = 'validityEndDate';
        this._policyService.getPendingRenewalStats(filters, rangeField, rangeStart, rangeEnd, sortBy, this.specialFilter).subscribe((res: ContainerCharts) => {
            this.chartsData = res;
            if(this.filtersData === null) {
                this._loadFiltersData(res);
                this.generateSpecialFilter();
            }
        });
    }

    generateSpecialFilter(): void {
        this.specialFilter = this.filtersData!.insurances.specialFilter + this.filtersData!.insurers.specialFilter + this.filtersData!.contactTypes.specialFilter;
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
        this.filtersData.insurances.specialFilter = UtilitiesHelper.generateHttpSpecialFilter('insuranceId', insuranceIds);

        const insurerIds: number[] = [];
        for(let insurerData of containerCharts.insurers) {
            this.filtersData.insurers.filters.push({
                id: insurerData.id,
                name: insurerData.name,
                selected: true
            });
            insurerIds.push(insurerData.id);
        }
        this.filtersData.insurers.specialFilter = UtilitiesHelper.generateHttpSpecialFilter('insurerId', insurerIds);

        const contactTypeIds: number[] = [];
        for(let contactTypeData of containerCharts.contactTypes) {
            this.filtersData.contactTypes.filters.push({
                id: contactTypeData.id,
                name: contactTypeData.name,
                selected: true
            });
            contactTypeIds.push(contactTypeData.id);
        }
        this.filtersData.contactTypes.specialFilter = UtilitiesHelper.generateHttpSpecialFilter('contactTypeId', contactTypeIds);
    }
}
