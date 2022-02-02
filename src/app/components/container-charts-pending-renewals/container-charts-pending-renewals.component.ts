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
    @Output() insuranceFiltersSelected: EventEmitter<string> = new EventEmitter<string>();
    modalIdFilterResults: string = 'agt-filter-results';
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
        const insuranceFilters: string = UtilitiesHelper.generateHttpSpecialFilter('insuranceId', filterIds);
        this.model.filtersData!.insurances.specialFilter = insuranceFilters;
        this.model.generateSpecialFilter();
        this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        //this.insuranceFiltersSelected.emit(insuranceFilters);
    }

    showModalToApplyFilter(): void {
        ModalPlugin.show(this.modalIdFilterResults);
    }

}
