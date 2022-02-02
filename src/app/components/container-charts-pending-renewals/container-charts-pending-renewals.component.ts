import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { UtilitiesHelper } from '@helpers/utilities.helper';

import { ContainerChartsPendingRenewalsService } from './container-charts-pending-renewals.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-charts-pending-renewals',
  templateUrl: './container-charts-pending-renewals.component.html',
  styles: [
  ],
  providers: [ContainerChartsPendingRenewalsService]
})
export class ContainerChartsPendingRenewalsComponent implements OnChanges {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Output() specialFilterChanged: EventEmitter<string> = new EventEmitter<string>();
    modalIdInsuranceFilterResults: string = 'agt-insurance-filter-results';
    modalIdInsurerFilterResults: string = 'agt-insurer-filter-results';
    modalIdContactTypeFilterResults: string = 'agt-contact-type-filter-results';
    specialFilter: string = '';

    constructor(public model: ContainerChartsPendingRenewalsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(
            (!!changes.rangeField && !!changes.rangeField.currentValue) ||
            (!!changes.rangeStart && !!changes.rangeStart.currentValue) ||
            (!!changes.rangeEnd && !!changes.rangeEnd.currentValue)
        ) {
            this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        }
    }

    applyInsuranceFilters(filterIds: number[]): void {
        const insuranceFilters: string = UtilitiesHelper.generateHttpFilter('insuranceId', filterIds);
        this.model.filtersData!.insurances.specialFilter = insuranceFilters;
        this.model.generateSpecialFilter();
        this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        this.specialFilterChanged.emit(this.model.specialFilter);
    }

    applyInsurerFilters(filterIds: number[]): void {
        const insurerFilters: string = UtilitiesHelper.generateHttpFilter('insurerId', filterIds);
        this.model.filtersData!.insurers.specialFilter = insurerFilters;
        this.model.generateSpecialFilter();
        this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        this.specialFilterChanged.emit(this.model.specialFilter);
    }

    applyContactTypeFilters(filterIds: number[]): void {
        const contactTypeFilters: string = UtilitiesHelper.generateHttpFilter('contactTypeId', filterIds);
        this.model.filtersData!.contactTypes.specialFilter = contactTypeFilters;
        this.model.generateSpecialFilter();
        this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        this.specialFilterChanged.emit(this.model.specialFilter);
    }

    showModalInsurancesToApplyFilter(): void {
        ModalPlugin.show(this.modalIdInsuranceFilterResults);
    }

    showModalInsurersToApplyFilter(): void {
        ModalPlugin.show(this.modalIdInsurerFilterResults);
    }

    showModalContactTypesToApplyFilter(): void {
        ModalPlugin.show(this.modalIdContactTypeFilterResults);
    }

}
