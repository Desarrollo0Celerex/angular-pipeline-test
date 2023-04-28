import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ReceiptAppliedDetails } from '@interfaces/receipt-applied-details.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ModalShowReceiptAppliedDetailsService {
    receiptApplied: ReceiptAppliedDetails = this._buidReceiptApplied();

    constructor(private _receiptPaidService: ReceiptPaidService) {}

    loadReceiptApplied(receiptAppliedId: string): void {
        const fields: string =
            'contactId,policyId,paymentId,titularName,policyNumber,validityStartDate,validityEndDate,paymentPlanName,paymentAmount,paymentAmountPaid,currencyName,bills,receiptsAmount,applicationDate';
        this._receiptPaidService
            .getReceiptPaid(receiptAppliedId, fields)
            .subscribe((res: HttpResponse) => {
                this.receiptApplied = res.data;
            });
    }

    private _buidReceiptApplied(): ReceiptAppliedDetails {
        return {
            contactId: '',
            policyId: '',
            paymentId: '',
            titularName: '',
            policyNumber: '',
            validityStartDate: '',
            validityEndDate: '',
            paymentPlanName: '',
            paymentAmount: 0,
            paymentAmountPaid: 0,
            currencyName: '',
            bills: 0,
            receiptsAmount: 0,
            applicationDate: '',
        };
    }
}
