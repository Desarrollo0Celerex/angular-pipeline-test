import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateQuotationDataSend } from '@interfaces/create-quotation-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    contactQuotation: (workspaceId: string, contactId: string, quotationId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/quotations/' + quotationId,
    contactQuotations: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/quotations',
}

@Injectable()
export class QuotationService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Create a quotation in the API
     * @param  contactId   The contact ID
     * @param  requestBody The quotation data
     * @return             The quotation ID
     */
    createQuotation(contactId: string, requestBody: CreateQuotationDataSend): Observable<HttpResponse> {
        const route: string = routes.contactQuotations(this._workspaceId, contactId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }

    /**
     * Get the contact quotations from the API
     * @param  contactId The contact ID
     * @param  page      The page number
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The contact quotations
     */
    getContactQuotations(contactId: string, page: number = 1, fields: string = '', filter: number = 0, search: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactQuotations(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filter) params = params.append('filter', 'quotationStatusId[=]' + filter);
        if(!!search) params = params.append('search', search);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the contact quotation from the API
     * @param  contactId   The contact ID
     * @param  quotationId The quotation ID
     * @param  fields      The fields to get
     * @return             The quotation data
     */
    getContactQuotation(contactId: string, quotationId: string, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactQuotation(this._workspaceId, contactId, quotationId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
