import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    paymentPlans: `${environment.apiUrl}/payment-plans`,
};

@Injectable()
export class PaymentPlanService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get the payment plans from the API
     * @param  fields The fields to get
     * @return        The payment plans
     */
    getPaymentPlans(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.paymentPlans;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
