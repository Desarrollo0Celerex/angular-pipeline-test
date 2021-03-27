import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

import { Contact } from '@interfaces/contact.interface';

@Injectable()
export class ContactProfileService {
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
            contactScoreName: '',
            leadStatusName: '',
            leadStatusBackground: '',
            clientStatusName: '',
            clientStatusBackground: '',
            totalWallet: 0,
            totalPolicies: 0
        }
    }

    /**
     * Load the contact
     * @param contactId The contact ID
     */
    loadContact(contactId: string): void {
        const fields: string = 'contactId,avatarUrl,contactName,contactSourceName,phoneCode,phoneNumber';
        this._contactService.getContact(contactId, fields).subscribe( (res: HttpResponse) => {
            this.contact = res.data;
        });
    }
}
