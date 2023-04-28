import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class ContainerLastContactsService {
    lastContacts: Contact[] = [];

    constructor(private _contactService: ContactService) { }

    deleteContact(contactId: string): Observable<void> {
        return this._contactService.deleteContact(contactId);
    }

    loadLastContacts(): void {
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        const page: number = 1;
        const perPage: number = 4;
        this._contactService.getContacts(page, fields, '', null, perPage).subscribe((res: HttpResponse) => {
            this.lastContacts = res.data.items;
        })
    }
}
