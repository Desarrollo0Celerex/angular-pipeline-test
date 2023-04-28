import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    partnerStatus: `${environment.apiUrl}/partner-status`,
};

@Injectable()
export class PartnerStatusService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the partner status from the API
     * @param  fields The fields to get
     * @return        The partner status
     */
    getPartnerStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.partnerStatus;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
