import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    leadStatus: `${environment.apiUrl}/lead-status`
}

@Injectable()
export class LeadStatusService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the lead status from the API
     * @param  fields The fields to get
     * @return        The lead status
     */
    getLeadStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.leadStatus;
        let params: HttpParams = new HttpParams;
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
