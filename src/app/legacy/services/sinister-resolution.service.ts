import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    sinisterResolutions: `${environment.agenthos.apiUrl}/sinister-resolutions`,
};

@Injectable()
export class SinisterResolutionService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the sinister resolutions from the API
     * @param  fields The fields to get
     * @return        The sinister resolutions
     */
    getSinisterResolutions(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.sinisterResolutions;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
