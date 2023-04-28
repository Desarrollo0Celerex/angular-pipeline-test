import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class SpeechRecognitionService {
    constructor(private _contactService: ContactService) {}

    /**
     * Search for a contact by name
     * @param  contactName The contact name
     * @return             The contacts found
     */
    searchContact(contactName: string): Observable<HttpResponse> {
        const page: number = 1;
        const perPage: number = 100;
        const fields: string =
            'contactId,contactName,clientStatusName,leadStatusName,clientStatusBackground,leadStatusBackground,totalGlobalWallet,currencyName,totalActivePolicies';
        return this._contactService.getContacts(
            page,
            fields,
            contactName,
            null,
            perPage
        );
    }
}
