import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    sinisterReactivations: `${environment.apiUrl}/sinister-reactivations`,
};

@Injectable()
export class SinisterReactivationService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the sinister reactivations from the API
     * @param  fields The fields to get
     * @return        The sinister reactivations
     */
    getSinisterReactivations(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.sinisterReactivations;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
