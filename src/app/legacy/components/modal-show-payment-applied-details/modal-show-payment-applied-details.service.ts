import { Injectable } from '@angular/core';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PaymentApplied } from '@core/interfaces/payment-applied.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ModalShowPaymentAppliedDetailsService {
    payment: PaymentApplied | undefined = undefined;
    constructor(private _receiptPaidService: ReceiptPaidService) {}

    loadPayment(receiptPaidId: string): void {
        const fields: string =
            'paymentDate,titularName,coveredProperty,insuranceName,insuranceTypeName,policyNumber,bills,tickets,currencyName,paymentPlanReceips,netPay,feePay,coverPay,extraPay,taxPay,discount,paymentSourceTypeId,paymentPlanId,pendingAmount,pendingReceipts,previouslyAppliedReceipts,receiptsAmount,applicationDate';
        this._receiptPaidService
            .getReceiptPaid(receiptPaidId, fields)
            .subscribe((res: HttpResponse) => {
                this.payment = res.data;
            });
    }
}
