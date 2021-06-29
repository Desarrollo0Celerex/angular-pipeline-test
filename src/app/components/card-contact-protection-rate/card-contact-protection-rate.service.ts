import { Injectable } from '@angular/core';

import { ContactRate } from '@interfaces/contact-rate.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class CardContactProtectionRateService {
    protectionRate: ContactRate = {
        contact: 0,
        workspace: 0
    }

    constructor(private _contactService: ContactService) { }

    /**
     * Load the protection rate
     * @param contactId The contact ID
     */
    loadProtectionRate(contactId: string): void {
        const fields: string = 'protectionRate,workspaceProtectionRate';
        this._contactService.getContact(contactId, fields).subscribe((res: HttpResponse) => {
            this.protectionRate = {
                contact: res.data.protectionRate,
                workspace: res.data.workspaceProtectionRate
            }
        });
    }
}
