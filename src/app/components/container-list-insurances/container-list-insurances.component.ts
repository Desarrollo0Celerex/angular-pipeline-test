import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

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
    @Output() insuranceSelected: EventEmitter<number> = new EventEmitter<number>();;

    constructor(public model: ContainerListInsurancesService) { }

    ngOnInit(): void {
        this.model.insurancesByCategories = [];
        this._loadContact();
    }

    get contactName(): string {
        return (!!this.model.contact) ? `${this.model.contact.name} ${this.model.contact.namePaternal} ${this.model.contact.nameMaternal}` : '';
    }

    selectInsurance(insuranceId: number): void {
        console.log('insuranceId: ',insuranceId);
        //this.insuranceSelected.emit(insuranceId);
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
