import { Injectable } from '@angular/core';

import { Contact } from '@core/interfaces/contact.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@core/services/contact/contact.service';

@Injectable()
export class ModalShowContactDataService {
    contact: Contact | null = null;

    constructor(private _contactService: ContactService) {}

    /**
     * Load the contact
     */
    loadContact(contactId: string): void {
        const fields: string = 'contactName';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: Contact) => {
                this.contact = res;
            });
    }
}
