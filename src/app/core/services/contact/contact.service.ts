import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateContactDataSend } from '@interfaces/create-contact-data-send.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { SelectContactSourceData } from '@interfaces/select-contact-source-data.interface';
import { UpdateContactDataSend } from '@interfaces/update-contact-data-send.interface';
import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@core/services/auth/auth.service';
import { Contact } from '@core/interfaces/contact.interface';
import { AnnualWallet } from '@interfaces/annual-wallet.interface';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';

const routes: any = {
    contact: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId,
    contactSource: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/contact-source',
    contacts: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/contacts',
    contactAnnualWallet: (
        workspaceId: string,
        contactId: string,
        year: number
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/annual-wallet/' +
        year,
};

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private _workspaceId: string;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {
        this._workspaceId = this._authService.workspaceId;
    }

    createContact(requestBody: CreateContactDataSend): Observable<string> {
        return this._apiHttp.post(
            routes.contacts(this._workspaceId),
            requestBody
        );
    }

    deleteContact(contactId: string): Observable<void> {
        return this._apiHttp.delete(
            routes.contact(this._workspaceId, contactId)
        );
    }

    getContact(contactId: string, fields: string = ''): Observable<Contact> {
        return this._apiHttp
            .param('fields', fields)
            .get(routes.contact(this._workspaceId, contactId));
    }

    getContactAnnualWallet(
        contactId: string,
        year: number,
        fields: string
    ): Observable<AnnualWallet> {
        return this._apiHttp
            .param('fields', fields)
            .get(
                routes.contactAnnualWallet(this._workspaceId, contactId, year)
            );
    }

    getContacts(
        page: number = 1,
        fields: string = '',
        query: string = '',
        specialQuery: SearchContactData | null = null,
        perPage: number = 12,
        sortBy: string = '-createdAt'
    ): Observable<HttpResponseItems> {
        const searchValue: string = specialQuery
            ? this._getSpecialSearch(specialQuery)
            : 'contactName:' + query;
        return this._apiHttp
            .param('fields', fields)
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .param('search', searchValue)
            .param('sortBy', sortBy)
            .get(routes.contacts(this._workspaceId));
    }

    updateContact(
        contactId: string,
        requestBody: UpdateContactDataSend
    ): Observable<void> {
        return this._apiHttp.put(
            routes.contact(this._workspaceId, contactId),
            requestBody
        );
    }

    updateContactSource(
        contactId: string,
        requestBody: SelectContactSourceData
    ): Observable<void> {
        return this._apiHttp.put(
            routes.contactSource(this._workspaceId, contactId),
            requestBody
        );
    }

    private _getSpecialSearch(specialQuery: any): string {
        let specialSearch: string = '';
        for (const field in specialQuery) {
            if (!!specialQuery[field]) {
                specialSearch += field + ':' + specialQuery[field] + '|';
            }
        }
        specialSearch = specialSearch.substring(0, specialSearch.length - 1);
        return specialSearch;
    }
}
