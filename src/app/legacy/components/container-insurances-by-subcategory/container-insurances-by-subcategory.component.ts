import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse } from '@core/interfaces/http-response.interface';

import { ContainerInsurancesBySubcategoryService } from './container-insurances-by-subcategory.service';

@Component({
    selector: 'agt-container-insurances-by-subcategory',
    templateUrl: './container-insurances-by-subcategory.component.html',
    styles: [],
    providers: [ContainerInsurancesBySubcategoryService],
})
export class ContainerInsurancesBySubcategoryComponent implements OnInit {
    @Output() insuranceIdSelected: EventEmitter<number> =
        new EventEmitter<number>();

    constructor(public model: ContainerInsurancesBySubcategoryService) {}

    ngOnInit(): void {
        this.model.insurancesBySubcategories = [];
        this._loadSubcategories();
    }

    selectInsurance(insuranceId: number): void {
        this.insuranceIdSelected.emit(insuranceId);
    }

    private _loadSubcategories(): void {
        this.model.getSubcategories().subscribe((res: HttpResponse) => {
            this.model.loadInsurances(res.data);
        });
    }
}
