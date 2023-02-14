import { Component, Input, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';

import { UtilitiesHelper } from '@helpers/utilities.helper';

import { ContainerChartsWorkspaceQuotationsClosedService } from './container-charts-workspace-quotations-closed.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-charts-workspace-quotations-closed',
  templateUrl: './container-charts-workspace-quotations-closed.component.html',
  styles: [
  ],
  providers: [ContainerChartsWorkspaceQuotationsClosedService]
})
export class ContainerChartsWorkspaceQuotationsClosedComponent {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Output() specialFilterChanged: EventEmitter<string> = new EventEmitter<string>();
    modalIdInsuranceFilterResults: string = 'agt-insurance-filter-results';
    modalIdInsurerFilterResults: string = 'agt-insurer-filter-results';
    modalIdContactTypeFilterResults: string = 'agt-contact-type-filter-results';
    specialFilter: string = '';

    constructor(public model: ContainerChartsWorkspaceQuotationsClosedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(
            (!!changes.rangeField && !!changes.rangeField.currentValue) ||
            (!!changes.rangeStart && !!changes.rangeStart.currentValue) ||
            (!!changes.rangeEnd && !!changes.rangeEnd.currentValue)
        ) {
            this.model.specialFilter = '';
            this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        }
    }

    applyInsuranceFilters(filterIds: number[]): void {
        const insuranceFilters: string = UtilitiesHelper.generateHttpFilter('insuranceId', filterIds);
        this.model.filtersData!.insurances.specialFilter = insuranceFilters;
        this.model.specialFilter = this.model.filtersData!.insurances.specialFilter+';';
        this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        this.specialFilterChanged.emit(this.model.specialFilter);
    }

    applyInsurerFilters(filterIds: number[]): void {
        const insurerFilters: string = UtilitiesHelper.generateHttpFilter('insurerId', filterIds);
        this.model.filtersData!.insurers.specialFilter = insurerFilters;
        this.model.specialFilter = this.model.filtersData!.insurances.specialFilter+';'+this.model.filtersData!.insurers.specialFilter;
        this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        this.specialFilterChanged.emit(this.model.specialFilter);
    }

    applyContactTypeFilters(filterIds: number[]): void {
        const contactTypeFilters: string = UtilitiesHelper.generateHttpFilter('contactTypeId', filterIds);
        this.model.filtersData!.contactTypes.specialFilter = contactTypeFilters;
        this.model.specialFilter = this.model.filtersData!.insurances.specialFilter+';'+this.model.filtersData!.insurers.specialFilter+';'+this.model.filtersData!.contactTypes.specialFilter;
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
