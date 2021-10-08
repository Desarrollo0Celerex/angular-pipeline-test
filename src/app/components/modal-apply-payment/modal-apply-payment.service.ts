import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { UtilitiesHelper } from '@helpers/utilities.helper';
import { CreateReceiptPaidDataSend } from '@interfaces/create-receipt-paid-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ModalApplyPaymentService {
    payment: Payment | null = null;
    paymentForm: FormGroup = this._formBuilder.group({});

    constructor(
        private _currencyPipe: CurrencyPipe,
        private _receiptPaidService: ReceiptPaidService,
        private _formBuilder: FormBuilder,
        private _paymentService: PaymentService
    ) { }

    get f(): { [key: string]: AbstractControl } {
        return this.paymentForm.controls;
    }

    /**
     * Build the payment form
     */
    buildPaymentForm(): void {
        if(!!this.payment) {
            this.paymentForm = this._formBuilder.group({
                amount: [this._calculateAmount(), [Validators.required]],
                receipts: [1, [Validators.required]],
                applicationDate: [moment(this.payment.paymentDate).format('DD/MM/YYYY'), Validators.required],
                nextPaymentDate: [this._calculateNextPatmentDate(), [Validators.required]]
            });
        }
    }

    /**
     * Create a receipt paid
     * @return Notice of action done
     */
    createReceiptPaid(contactId: string, policyId: string, paymentId: string): Observable<void> {
        const requestBody: CreateReceiptPaidDataSend = this.paymentForm.value;
        return this._receiptPaidService.createReceiptPaid(contactId, policyId, paymentId, requestBody);
    }

    /**
     * Load the policy data
     * @param  paymentId The payment ID
     * @return           Notice of action done
     */
    loadPayment(paymentId: string): Observable<void> {
        this.payment = null;
        const fields: string = 'policyNumber,paymentPlanName,paymentPlanMonths,validityStartDate,validityEndDate,pendingAmount,pendingReceipts,paymentDate,currencyName,isMultiyear,titularName,bills,tickets,netPay,taxPay,feePay,coverPay,extraPay';
        return this._paymentService.getPayment(paymentId, fields).pipe(
            tap( (res: HttpResponse) => {
                this.payment = res.data;
            }),
            map( () => {})
        )
    }

    /**
     * Calculate the amount to pay
     * @return The calculated amount
     */
    private _calculateAmount(): string {
        let amount: string = '';
        if(!!this.payment) {
            let receiptsAmount: number;
            // If it is the first receipt to pay
            if(this.payment.tickets === 0) {
                receiptsAmount = (parseFloat(this.payment.netPay.toString()) / this.payment.pendingReceipts) + parseFloat(this.payment.taxPay.toString()) + parseFloat(this.payment.feePay.toString()) + parseFloat(this.payment.coverPay.toString()) + parseFloat(this.payment.extraPay.toString());
            } else {
                receiptsAmount = this.payment.pendingAmount / this.payment.pendingReceipts;
            }
            amount = this._currencyPipe.transform(receiptsAmount, '', '', '0.2-2') || '';
        }
        return  amount;
    }

    /**
     * Calculate the next payment date
     * @return The calculated date
     */
    private _calculateNextPatmentDate(): string {
        let nextPaymentDate: string = '';
        if(!!this.payment) {
            nextPaymentDate = moment(this.payment.paymentDate).add(this.payment.paymentPlanMonths, 'M').format('DD/MM/YYYY');
        }
        return nextPaymentDate;
    }
}
