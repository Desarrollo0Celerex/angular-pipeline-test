import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { PAYMENT_TYPE_ENDPOINTS } from '@payment-type/constants/endpoints';
import { PaymentType } from '@payment-type/interfaces/payment-type.interface';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentTypeService {
    constructor(private _apiHttp: ApiHttp) {}

    getPaymentTypes(fields: string = ''): Observable<PaymentType[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(PAYMENT_TYPE_ENDPOINTS.paymentTypes);
    }
}
