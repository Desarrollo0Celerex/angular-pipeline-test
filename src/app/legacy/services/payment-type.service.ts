import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    paymentTypes: `${environment.apiUrl}/payment-types`,
};

@Injectable()
export class PaymentTypeService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the payment types from the API
     * @param  fields The fields to get
     * @return        The payment types
     */
    getPaymentTypes(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.paymentTypes;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
