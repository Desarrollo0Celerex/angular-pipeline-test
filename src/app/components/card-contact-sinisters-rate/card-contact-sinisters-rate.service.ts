import { Injectable } from '@angular/core';

import { ContactRate } from '@interfaces/contact-rate.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class CardContactSinistersRateService {
    sinistersRate: ContactRate = {
        contact: 0,
        workspace: 0
    }

    constructor(private _contactService: ContactService) { }

    loadSinistersRate(contactId: string): void {
        const fields: string = 'sinistersRate,workspaceSinistersRate';
        this._contactService.getContact(contactId, fields).subscribe((res: HttpResponse) => {
            this.sinistersRate = {
                contact: res.data.sinistersRate,
                workspace: res.data.workspaceSinistersRate
            }
        });
    }
}
