import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { Contact } from '@interfaces/contact.interface';

@Component({
  selector: 'agt-card-contact',
  templateUrl: './card-contact.component.html',
  styles: [
  ]
})
export class CardContactComponent {
    @Input() contact: Contact | null;
    @Output() contactSelected: EventEmitter<string>;
    @Output() showContactData: EventEmitter<string>;
    ROUTES_NAME: any;

    constructor() {
        this.contact = null;
        this.contactSelected = new EventEmitter<string>();
        this.showContactData = new EventEmitter<string>();
        this.ROUTES_NAME = ROUTES_NAME;
    }

    /**
     * Click event to select the contact
     * @param contactId The contact ID to select
     */
    onClickSelectContact(contactId: string): void {
        this.contactSelected.emit(contactId);
    }

    /**
     * Click event to show the contact data
     * @param contactId The contact ID
     */
    onClickShowContactData(contactId: string): void {
        this.showContactData.emit(contactId);
    }

}
