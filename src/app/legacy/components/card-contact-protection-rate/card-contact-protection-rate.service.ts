import { Injectable } from '@angular/core';

import { ContactRate } from '@interfaces/contact-rate.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { Contact } from '@core/interfaces/contact.interface';

@Injectable()
export class CardContactProtectionRateService {
    protectionRate: ContactRate = {
        contact: 0,
        workspace: 0,
    };

    constructor(private _contactService: ContactService) {}

    /**
     * Load the protection rate
     * @param contactId The contact ID
     */
    loadProtectionRate(contactId: string): void {
        const fields: string = 'protectionRate,workspaceProtectionRate';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: Contact) => {
                this.protectionRate = {
                    contact: res.protectionRate,
                    workspace: res.workspaceProtectionRate,
                };
            });
    }
}
