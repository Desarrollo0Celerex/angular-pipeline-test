import { Injectable } from '@angular/core';

import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerContactDetailsService {
    contact: Contact | null = null;
    policyNumber: string = '';

    constructor(
        private _contactService: ContactService,
        private _policyService: PolicyService
    ) {}

    /**
     * Load the contact
     * @param contactId The contact ID
     */
    loadContact(contactId: string): void {
        const fields: string =
            'avatarUrl,contactName,contactSourceName,contactSourceTypeName,contactTypeName,contactScoreName,clientStatusName,leadStatusName,clientStatusBackground,leadStatusBackground';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: HttpResponse) => {
                this.contact = res.data;
            });
    }

    loadPolicyNumber(contactId: string, policyId: string): void {
        const fields: string = 'policyNumber';
        this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .subscribe((res: HttpResponse) => {
                this.policyNumber = res.data.policyNumber;
            });
    }
}
