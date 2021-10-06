import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class ContainerPaymentsManagerService {
    payment: Payment | null = null;

    constructor(private _paymentService: PaymentService) { }

    loadPayment(paymentId: string): void {
        const fields: string = 'paymentDate,policyUrl';
        this._paymentService.getPayment(paymentId, fields).subscribe((res: HttpResponse) => {
            this.payment = res.data;
        })
    }
}
