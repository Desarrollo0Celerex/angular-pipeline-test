import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentService } from '@services/payment.service';

@Injectable()
export class ModalSelectPaymentRegistrationTypeService {

    constructor(private _paymentService: PaymentService) { }

    preauthorizePayment(paymentId: string): Observable<void> {
        return this._paymentService.preauthorizePayment(paymentId);
    }
}
