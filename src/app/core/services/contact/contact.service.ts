import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CONTACT_ENDPOINTS } from '@configs/endpoints.config';
import { CreateContactDataSend } from '@interfaces/create-contact-data-send.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { SelectContactSourceData } from '@interfaces/select-contact-source-data.interface';
import { UpdateContactDataSend } from '@interfaces/update-contact-data-send.interface';
import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@core/services/auth/auth.service';
import { Contact } from '@core/interfaces/contact.interface';
import { AnnualWallet } from '@interfaces/annual-wallet.interface';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';

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
            CONTACT_ENDPOINTS.contacts(this._workspaceId),
            requestBody
        );
    }

    deleteContact(contactId: string): Observable<void> {
        return this._apiHttp.delete(
            CONTACT_ENDPOINTS.contact(this._workspaceId, contactId)
        );
    }

    getContact(contactId: string, fields: string = ''): Observable<Contact> {
        return this._apiHttp
            .param('fields', fields)
            .get(CONTACT_ENDPOINTS.contact(this._workspaceId, contactId));
    }

    getContactAnnualWallet(
        contactId: string,
        year: number,
        fields: string
    ): Observable<AnnualWallet> {
        return this._apiHttp
            .param('fields', fields)
            .get(
                CONTACT_ENDPOINTS.contactAnnualWallet(
                    this._workspaceId,
                    contactId,
                    year
                )
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
            .get(CONTACT_ENDPOINTS.contacts(this._workspaceId));
    }

    updateContact(
        contactId: string,
        requestBody: UpdateContactDataSend
    ): Observable<void> {
        return this._apiHttp.put(
            CONTACT_ENDPOINTS.contact(this._workspaceId, contactId),
            requestBody
        );
    }

    updateContactSource(
        contactId: string,
        requestBody: SelectContactSourceData
    ): Observable<void> {
        return this._apiHttp.put(
            CONTACT_ENDPOINTS.contactSource(this._workspaceId, contactId),
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
