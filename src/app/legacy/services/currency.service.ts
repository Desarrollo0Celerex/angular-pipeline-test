import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    currencies: `${environment.apiUrl}/currencies`,
};

@Injectable()
export class CurrencyService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the currencies from the API
     * @param  fields The fields to get
     * @return        The currencies
     */
    getCurrencies(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.currencies;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
