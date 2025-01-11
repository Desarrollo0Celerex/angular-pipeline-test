import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

import { ModalShowContactDataService } from './modal-show-contact-data.service';

@Component({
    selector: 'agt-modal-show-contact-data',
    templateUrl: './modal-show-contact-data.component.html',
    styles: [],
    standalone: false
})
export class ModalShowContactDataComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() modalId: string = '';
    BUTTON_TYPES: any = BUTTON_TYPES;

    constructor(public modalShowContactDataService: ModalShowContactDataService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId.currentValue) {
            this.modalShowContactDataService.loadContact(changes.contactId.currentValue);
        }
    }
}
