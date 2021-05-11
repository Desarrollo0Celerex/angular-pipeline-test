import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    contactRelations: `${environment.apiUrl}/contact-relations`
}

@Injectable()
export class ContactRelationService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the contact relations from the API
     * @param  fields The fields to get
     * @return        The contact relations
     */
    getContactRelations(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactRelations;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
