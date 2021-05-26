import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    sinisterEventTypes: `${environment.apiUrl}/sinister-event-types`
}

@Injectable()
export class SinisterEventTypeService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the sinister event types from the API
     * @param  fields      The fields to get
     * @return             The sinister event types
     */
    getSinisterEventTypes(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.sinisterEventTypes;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
