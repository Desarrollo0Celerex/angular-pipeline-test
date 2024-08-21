import { Injectable } from '@angular/core';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class ModalShowPaymentDetailsService {
    payment: Payment | undefined = undefined;
    constructor(private _paymentService: PaymentService) {}

    loadPayment(paymentId: string): void {
        const fields: string =
            'paymentDate,titularName,coveredProperty,insuranceName,insuranceTypeName,policyNumber,bills,tickets,currencyName,paymentPlanReceips,netPay,feePay,coverPay,noTaxPay,extraPay,taxPay,discount,paymentSourceTypeId,paymentPlanId,pendingAmount,pendingReceipts,comment';
        this._paymentService
            .getPayment(paymentId, fields)
            .subscribe((res: HttpResponse) => {
                this.payment = res.data;
            });
    }
}
