import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-modal-contact-saved',
  templateUrl: './modal-contact-saved.component.html',
  styles: [
  ]
})
export class ModalContactSavedComponent {
    @Input() contactId: string;
    @Input() modalId: string;

    constructor() {
        this.contactId = '';
        this.modalId = '';
    }
}
