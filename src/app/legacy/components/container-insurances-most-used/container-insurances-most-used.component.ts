import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ACTION_TYPES } from '@constants/global';

import { ContainerInsurancesMostUsedService } from './container-insurances-most-used.service';

@Component({
  selector: 'agt-container-insurances-most-used',
  templateUrl: './container-insurances-most-used.component.html',
  styles: [
  ],
  providers: [ContainerInsurancesMostUsedService]
})
export class ContainerInsurancesMostUsedComponent implements OnInit {
    @Input() actionType: number = 0;
    @Input() contactId: string = '';
    @Output() insuranceIdSelected: EventEmitter<number> = new EventEmitter<number>();

    constructor(public model: ContainerInsurancesMostUsedService) { }

    ngOnInit(): void {
        this._loadContact(this.contactId);
    }

    get contentTypeName(): string {
        return (this.actionType === ACTION_TYPES.CREATE_QUOTATION) ? 'cotización' : 'póliza';
    }

    selectInsurance(insuranceId: number): void {
        this.insuranceIdSelected.emit(insuranceId);
    }

    private _loadContact(contactId: string) {
        this.model.loadContact(contactId).subscribe((contactTypeId: number) => {
            this.model.loadInsurancesMostUsed(contactTypeId);
        })
    }

}
