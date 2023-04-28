import { Injectable } from '@angular/core';

import { ContactRate } from '@interfaces/contact-rate.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

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
            .subscribe((res: HttpResponse) => {
                this.conversionRate = {
                    contact: res.data.conversionRate,
                    workspace: res.data.workspaceConversionRate,
                };
            });
    }
}
