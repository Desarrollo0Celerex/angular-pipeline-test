import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { UtilitiesHelper } from '@core/helpers/utilities.helper';

import { ContainerChartsWorkspacePoliciesPendingService } from './container-charts-workspace-policies-pending.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-charts-workspace-policies-pending',
    templateUrl: './container-charts-workspace-policies-pending.component.html',
    styles: [],
    providers: [ContainerChartsWorkspacePoliciesPendingService],
    standalone: false
})
export class ContainerChartsWorkspacePoliciesPendingComponent
    implements OnInit
{
    @Output() specialFilterChanged: EventEmitter<string> =
        new EventEmitter<string>();
    modalIdInsuranceFilterResults: string = 'agt-insurance-filter-results';
    modalIdInsurerFilterResults: string = 'agt-insurer-filter-results';
    modalIdContactTypeFilterResults: string = 'agt-contact-type-filter-results';
    specialFilter: string = '';

    constructor(public model: ContainerChartsWorkspacePoliciesPendingService) {}

    ngOnInit(): void {
        this.model.loadData();
    }

    applyInsuranceFilters(filterIds: number[]): void {
        const insuranceFilters: string = UtilitiesHelper.generateHttpFilter(
            'insuranceId',
            filterIds
        );
        this.model.filtersData!.insurances.specialFilter = insuranceFilters;
        this.model.specialFilter =
            this.model.filtersData!.insurances.specialFilter + ';';
        this.model.loadData();
        this.specialFilterChanged.emit(this.model.specialFilter);
    }

    applyInsurerFilters(filterIds: number[]): void {
        const insurerFilters: string = UtilitiesHelper.generateHttpFilter(
            'insurerId',
            filterIds
        );
        this.model.filtersData!.insurers.specialFilter = insurerFilters;
        this.model.specialFilter =
            this.model.filtersData!.insurances.specialFilter +
            ';' +
            this.model.filtersData!.insurers.specialFilter;
        this.model.loadData();
        this.specialFilterChanged.emit(this.model.specialFilter);
    }

    applyContactTypeFilters(filterIds: number[]): void {
        const contactTypeFilters: string = UtilitiesHelper.generateHttpFilter(
            'contactTypeId',
            filterIds
        );
        this.model.filtersData!.contactTypes.specialFilter = contactTypeFilters;
        this.model.specialFilter =
            this.model.filtersData!.insurances.specialFilter +
            ';' +
            this.model.filtersData!.insurers.specialFilter +
            ';' +
            this.model.filtersData!.contactTypes.specialFilter;
        this.model.loadData();
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
