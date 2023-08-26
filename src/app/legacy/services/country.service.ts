import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    countries: `${environment.agenthos.apiUrl}/countries`,
};

@Injectable()
export class CountryService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the countries from API
     * @param  fields Fields
     * @return        Countries
     */
    getCountries(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.countries;
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
