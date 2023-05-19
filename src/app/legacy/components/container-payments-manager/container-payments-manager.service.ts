import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { UpdatePolicyStatusDataSend } from '@interfaces/update-policy-status-data-send.interface';
import { PaymentService } from '@services/payment.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerPaymentsManagerService {
    payment: Payment | null = null;

    constructor(
        private _paymentService: PaymentService,
        private _policyService: PolicyService
    ) {}

    loadPayment(paymentId: string): void {
        const fields: string = 'paymentDate,policyUrl,policyStatusId,policyId';
        this._paymentService
            .getPayment(paymentId, fields)
            .subscribe((res: HttpResponse) => {
                this.payment = res.data;
            });
    }

    updatePolicyStatus(
        policyId: string,
        policyStatusId: number
    ): Observable<void> {
        const requestBody: UpdatePolicyStatusDataSend = { policyStatusId };
        return this._policyService.updatePolicyStatus(policyId, requestBody);
    }
}
