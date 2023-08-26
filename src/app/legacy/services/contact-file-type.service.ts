import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    contactFileTypes: `${environment.agenthos.apiUrl}/contact-file-types`,
};

@Injectable()
export class ContactFileTypeService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the contact file types from the API
     * @param  fields The fields to get
     * @return        The contact file types
     */
    getContactFileTypes(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactFileTypes;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
