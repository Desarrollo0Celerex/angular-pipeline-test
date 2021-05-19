import { Injectable } from '@angular/core';

import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class ModalShowContactDataService {
    contact: Contact | null = null;

    constructor(private _contactService: ContactService) { }

    /**
     * Load the contact
     */
    loadContact(contactId: string): void {
        const fields: string = 'contactName';
        this._contactService.getContact(contactId, fields).subscribe( (res: HttpResponse) => {
            this.contact = res.data;
        })
    }
}
