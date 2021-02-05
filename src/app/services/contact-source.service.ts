import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    contactSources: `${environment.apiUrl}/contact-sources`
}

@Injectable()
export class ContactSourceService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the contact sources from the API
     * @param  fields Fields to get
     * @return        The contact sources
     */
    getContactSources(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactSources;
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }
}
