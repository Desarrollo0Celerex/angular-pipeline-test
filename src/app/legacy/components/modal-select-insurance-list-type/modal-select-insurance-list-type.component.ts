import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { INSURANCE_LIST_TYPES } from '@constants/global';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-insurance-list-type',
  templateUrl: './modal-select-insurance-list-type.component.html',
  styles: [
  ]
})
export class ModalSelectInsuranceListTypeComponent implements OnInit {
    @Input() modalId: string = '';
    @Output() listTypeSelected: EventEmitter<number> = new EventEmitter<number>();
    INSURANCE_LIST_TYPES: any = INSURANCE_LIST_TYPES;

    constructor() { }

    ngOnInit(): void {
    }

    selectListType(listType: number): void {
        ModalPlugin.hide(this.modalId);
        this.listTypeSelected.emit(listType);
    }

}
