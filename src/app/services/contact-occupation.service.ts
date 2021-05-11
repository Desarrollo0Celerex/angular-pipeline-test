import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    contactOccupations: `${environment.apiUrl}/contact-occupations`
}

@Injectable()
export class ContactOccupationService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the contact occupations from the API
     * @param  fields The fields to get
     * @return        The contact occupations
     */
    getContactOccupations(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactOccupations;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
