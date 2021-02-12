import { Component, Input, OnInit } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

@Component({
  selector: 'agt-modal-show-contact-data',
  templateUrl: './modal-show-contact-data.component.html',
  styles: [
  ]
})
export class ModalShowContactDataComponent implements OnInit {
    @Input() contactId: string;
    @Input() modalId: string;
    BUTTON_TYPES: any;

    constructor() {
        this.contactId = '';
        this.modalId = '';
        this.BUTTON_TYPES = BUTTON_TYPES;
    }

    ngOnInit(): void {
    }

}
