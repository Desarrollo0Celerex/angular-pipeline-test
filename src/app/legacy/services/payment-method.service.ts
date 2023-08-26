import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    paymentMethods: `${environment.agenthos.apiUrl}/payment-methods`,
};

@Injectable()
export class PaymentMethodService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the payment methods from the API
     * @param  fields The fields to get
     * @return        The payment methods
     */
    getPaymentMethods(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.paymentMethods;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
