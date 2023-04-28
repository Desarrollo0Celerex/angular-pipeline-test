import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateContactDataSend } from '@interfaces/create-contact-data-send.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { SelectContactSourceData } from '@interfaces/select-contact-source-data.interface';
import { UpdateContactDataSend } from '@interfaces/update-contact-data-send.interface';
import { AuthService } from '@core/services/auth.service';

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

@Injectable()
export class ContactService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Create the contact in the API
     * @param  requestBody Contact data to create
     * @return             The contact ID
     */
    createContact(
        requestBody: CreateContactDataSend
    ): Observable<HttpResponse> {
        const route: string = routes.contacts(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }

    deleteContact(contactId: string): Observable<void> {
        const route: string = routes.contact(this._workspaceId, contactId);
        return this._httpClient.delete<void>(route);
    }

    /**
     * Get a contact from the API
     * @param  contactId The contact ID
     * @param  fields    The fields to get
     * @return           The contact data
     */
    getContact(
        contactId: string,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.contact(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the contact annual wallet from the API
     * @param  contactId The contact ID
     * @param  number    The year to get
     * @return           The contact annual wallet
     */
    getContactAnnualWallet(
        contactId: string,
        year: number,
        fields: string
    ): Observable<HttpResponse> {
        const route: string = routes.contactAnnualWallet(
            this._workspaceId,
            contactId,
            year
        );
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the contacts from the API
     * @param  page            The page number
     * @param  fields          The fields to get
     * @param  query           The search to do
     * @return                 The leads
     */
    getContacts(
        page: number = 1,
        fields: string = '',
        query: string = '',
        specialQuery: SearchContactData | null = null,
        perPage: number = 12,
        sortBy: string = '-createdAt'
    ): Observable<HttpResponse> {
        const route: string = routes.contacts(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!query) params = params.append('search', 'contactName:' + query);
        if (!!specialQuery)
            params = params.append(
                'search',
                this._getSpecialSearch(specialQuery)
            );
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Update the contact data
     * @param  contactId The contact ID
     * @param  requestBody The contact data
     * @return             Notification of action done
     */
    updateContact(
        contactId: string,
        requestBody: UpdateContactDataSend
    ): Observable<void> {
        const route: string = routes.contact(this._workspaceId, contactId);
        return this._httpClient.put<void>(route, requestBody);
    }

    /**
     * Update the contact source data
     * @param  contactId The contact ID
     * @param  requestBody The contact data
     * @return             Notification of action done
     */
    updateContactSource(
        contactId: string,
        requestBody: SelectContactSourceData
    ): Observable<void> {
        const route: string = routes.contactSource(
            this._workspaceId,
            contactId
        );
        return this._httpClient.put<void>(route, requestBody);
    }

    /**
     * Get special search
     * @param  specialQuery The query data
     * @return              The special search
     */
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
