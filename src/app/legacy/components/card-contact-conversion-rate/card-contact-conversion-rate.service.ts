import { Injectable } from '@angular/core';

import { ContactRate } from '@interfaces/contact-rate.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { Contact } from '@core/interfaces/contact.interface';

@Injectable()
export class CardContactConversionRateService {
    conversionRate: ContactRate = {
        contact: 0,
        workspace: 0,
    };

    constructor(private _contactService: ContactService) {}

    /**
     * Load the conversion rate
     * @param contactId The contact ID
     */
    loadConversionRate(contactId: string): void {
        const fields: string = 'conversionRate,workspaceConversionRate';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: Contact) => {
                this.conversionRate = {
                    contact: res.conversionRate,
                    workspace: res.workspaceConversionRate,
                };
            });
    }
}
