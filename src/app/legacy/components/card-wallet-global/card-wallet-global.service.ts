import { Injectable } from '@angular/core';

import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class CardWalletGlobalService {
    contact: Contact | null = null;

    constructor(private _contactService: ContactService) {}

    /**
     * Load the contact
     * @param contactId The contact ID
     */
    loadContact(contactId: string): void {
        const fields: string =
            'totalGlobalCurrentWallet,currencyName,totalActivePolicies,totalExpiredPolicies,totalCancelledPolicies';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: HttpResponse) => {
                this.contact = res.data;
            });
    }
}
