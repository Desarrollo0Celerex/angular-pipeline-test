import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CONTENT_TYPES } from '@constants/global';
import { HttpResponse } from '@core/interfaces/http-response.interface';

import { ContainerInsurancesByCategoryService } from './container-insurances-by-category.service';

@Component({
    selector: 'agt-container-insurances-by-category',
    templateUrl: './container-insurances-by-category.component.html',
    styles: [],
    providers: [ContainerInsurancesByCategoryService],
})
export class ContainerInsurancesByCategoryComponent implements OnInit {
    @Input() contactId: string = '';
    @Output() insuranceIdSelected: EventEmitter<number> =
        new EventEmitter<number>();
    CONTENT_TYPES: any = CONTENT_TYPES;

    constructor(public model: ContainerInsurancesByCategoryService) {}

    ngOnInit(): void {
        this.model.insurancesByCategories = [];
        this._loadContact();
    }

    selectInsurance(insuranceId: number): void {
        this.insuranceIdSelected.emit(insuranceId);
    }

    private _loadContact(): void {
        this.model
            .loadContact(this.contactId)
            .subscribe((res: HttpResponse) => {
                this._loadCategories(res.data.contactTypeId);
            });
    }

    private _loadCategories(contactTypeId: number): void {
        this.model
            .getCategories(contactTypeId)
            .subscribe((res: HttpResponse) => {
                this.model.loadInsurances(res.data);
            });
    }
}
