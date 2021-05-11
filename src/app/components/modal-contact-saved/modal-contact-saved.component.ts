import { Component, Input } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

@Component({
  selector: 'agt-modal-contact-saved',
  templateUrl: './modal-contact-saved.component.html',
  styles: [
  ]
})
export class ModalContactSavedComponent {
    @Input() contactId: string;
    @Input() isContactSaved: boolean = false;
    @Input() modalId: string;
    BUTTON_TYPES: any;

    constructor() {
        this.contactId = '';
        this.modalId = '';
        this.BUTTON_TYPES = BUTTON_TYPES;
    }
}
