import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';

import { ContainerListInsurancesService } from './container-list-insurances.service';

@Component({
  selector: 'agt-container-list-insurances',
  templateUrl: './container-list-insurances.component.html',
  styles: [
  ],
  providers: [ContainerListInsurancesService]
})
export class ContainerListInsurancesComponent implements OnInit {
    @Input() contactId: string = '';
    @Output() insuranceSelected: EventEmitter<number> = new EventEmitter<number>();
    CONTENT_TYPES: any = CONTENT_TYPES;

    constructor(public model: ContainerListInsurancesService) { }

    ngOnInit(): void {
        this.model.insurancesByCategories = [];
        this._loadContact();
    }

    selectInsurance(insuranceId: number): void {
        this.insuranceSelected.emit(insuranceId);
    }

    private _loadContact(): void {
        this.model.loadContact(this.contactId).subscribe((res: HttpResponse) => {
            this.model.loadMostUsedInsurances(res.data.contactTypeId);
            this._loadCategories(res.data.contactTypeId);
        })
    }

    private _loadCategories(contactTypeId: number): void {
        this.model.getCategories(contactTypeId).subscribe( (res: HttpResponse) => {
            this.model.loadInsurances(res.data);
        });
    }
}
