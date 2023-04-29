import { Injectable } from '@angular/core';

import { ContactRate } from '@interfaces/contact-rate.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { Contact } from '@core/interfaces/contact.interface';

@Injectable()
export class CardContactSinistersRateService {
    sinistersRate: ContactRate = {
        contact: 0,
        workspace: 0,
    };

    constructor(private _contactService: ContactService) {}

    loadSinistersRate(contactId: string): void {
        const fields: string = 'sinistersRate,workspaceSinistersRate';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: Contact) => {
                this.sinistersRate = {
                    contact: res.sinistersRate,
                    workspace: res.workspaceSinistersRate,
                };
            });
    }
}
