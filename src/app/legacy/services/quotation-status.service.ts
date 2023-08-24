import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    quotationStatus: `${environment.agenthos.apiUrl}/quotation-status`,
};

@Injectable()
export class QuotationStatusService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the quotation status from the API
     * @param  fields Fields to get
     * @return        The quotation status
     */
    getQuotationStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.quotationStatus;
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
