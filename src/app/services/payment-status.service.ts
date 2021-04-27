import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    paymentStatus: `${environment.apiUrl}/payment-status`
}

@Injectable()
export class PaymentStatusService {
    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the payment status from the API
     * @param  fields The fields to get
     * @return        The payment status
     */
    getPaymentStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.paymentStatus;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
