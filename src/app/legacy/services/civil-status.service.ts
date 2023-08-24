import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    civilStatus: `${environment.agenthos.apiUrl}/civil-status`,
};

@Injectable()
export class CivilStatusService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the civil status from the API
     * @param  fields The fields to get
     * @return        The civil status
     */
    getCivilStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.civilStatus;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
