import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { Contact } from '@core/interfaces/contact.interface';

@Component({
    selector: 'agt-card-contact',
    templateUrl: './card-contact.component.html',
    styles: [],
})
export class CardContactComponent {
    @Input() contact: Contact | null;
    @Input() buttonLabel: string = 'SELECCIONAR';
    @Input() canDeleteContact: boolean = true;
    @Output() contactSelected: EventEmitter<Contact>;
    @Output() showContactData: EventEmitter<string>;
    @Output() deleteContactRequested: EventEmitter<string> =
        new EventEmitter<string>();
    ROUTES_NAME: any;

    constructor() {
        this.contact = null;
        this.contactSelected = new EventEmitter<Contact>();
        this.showContactData = new EventEmitter<string>();
        this.ROUTES_NAME = ROUTES_NAME;
    }

    get canShowDeleteContactButton(): boolean {
        return !!this.contact &&
            !!!this.contact.clientStatusName &&
            !!!this.contact.leadStatusName &&
            !!this.canDeleteContact
            ? true
            : false;
    }

    onClickSelectContact(contact: Contact): void {
        this.contactSelected.emit(contact);
    }

    /**
     * Click event to show the contact data
     * @param contactId The contact ID
     */
    onClickShowContactData(contactId: string): void {
        this.showContactData.emit(contactId);
    }

    requestDeleteContact(): void {
        if (!!this.contact) {
            this.deleteContactRequested.emit(this.contact.contactId);
        }
    }
}
