import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { InsuranceCategory } from '@interfaces/insurance-category.interface';
import { ContainerListInsurancesService } from './container-list-insurances.service';

@Component({
  selector: 'agt-container-list-insurances',
  templateUrl: './container-list-insurances.component.html',
  styles: [
  ]
})
export class ContainerListInsurancesComponent implements OnInit {
    @Output() insuranceSelected: EventEmitter<number> = new EventEmitter<number>();;

    constructor(public containerListInsurancesService: ContainerListInsurancesService) { }

    ngOnInit(): void {
        this._loadInsuranceCategories();
    }

    /**
     * Event to catch the selected insurance ID
     * @param insuranceId The selected insurance ID
     */
    onInsuranceSelected(insuranceId: number): void {
        this.insuranceSelected.emit(insuranceId);
    }

    /**
     * Load the insurance categories
     * And load the insurances by category
     */
    private _loadInsuranceCategories(): void {
        this.containerListInsurancesService.getInsuranceCategories().subscribe( (res: HttpResponse) => {
            const insuranceCategories: InsuranceCategory[] = res.data;
            this.containerListInsurancesService.loadCategoryInsurances(insuranceCategories);
        })
    }
}
