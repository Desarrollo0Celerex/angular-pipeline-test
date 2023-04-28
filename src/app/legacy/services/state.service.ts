import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    countryStates: (countryId: number) => `${environment.apiUrl}/countries/${countryId}/states`
}

@Injectable()
export class StateService {
    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the country states from API
     * @param  fields Fields
     * @return        Country states
     */
    getCountryStates(countryId: number, fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.countryStates(countryId);
        let params: HttpParams = new HttpParams;
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
