import { Injectable } from '@angular/core';

import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class CardContactService {
    contact: Contact;

    constructor(private _contactService: ContactService) {
        this.contact = {
            contactId: '',
            avatarUrl: '',
            contactName: '',
            contactSourceName: '',
            phoneCode: '',
            phoneNumber: '',
            email: '',
            contactTypeName: '',
            contactScoreName: ''
        };
    }

    /**
     * Load the contact
     * @param contactId The contact ID
     */
    loadContact(contactId: string): void {
        const fields: string = 'avatarUrl,contactName,contactSourceName,contactTypeName,contactScoreName';
        this._contactService.getContact(contactId, fields).subscribe( (res: HttpResponse) => {
            this.contact = res.data;
        })
    }
}
