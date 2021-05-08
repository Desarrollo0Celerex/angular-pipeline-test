import { Injectable } from '@angular/core';

import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class ContainerContactDetailsService {
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
            totalPolicies: 0,
            currencyName: ''
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
