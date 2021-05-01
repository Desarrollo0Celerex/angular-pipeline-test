import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { CreateReceiptPaidDataSend } from '@interfaces/create-receipt-paid-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ModalApplyPaymentService {
    balanceOutstanding: number = 0;
    balanceRemaining: number = 0;
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
     * Check if the finish paying has a remaining balance
     * @return True if it is, otherwise false
     * @note If the policy is muytiyear, this validation does not apply
     */
    checkHasBalanceRemaining(): boolean {
        const amount: number = parseFloat(this.f.amount.value);
        return (!!this.payment && (amount > this.payment.pendingAmount) && (this.payment.isMultiyear === '0')) ? true : false;
    }

    /**
     * Check if the finish paying has a outstanding balance
     * @return True if it is, otherwise false
     */
    checkHasBalanceOutstanding(): boolean {
        const amount: number = parseFloat(this.f.amount.value);
        const receipts: number = parseInt(this.f.receipts.value);
        return (!!this.payment && (receipts >= this.payment.pendingReceipts) && (amount < this.payment.pendingAmount )) ? true : false;
    }

    /**
     * Build the payment form
     */
    buildPaymentForm(): void {
        if(!!this.payment) {
            this.paymentForm = this._formBuilder.group({
                amount: [this._calculateAmount(), [Validators.required]],
                receipts: [1, [Validators.required]],
                applicationDate: [moment().format('DD/MM/YYYY'), Validators.required],
                nextPaymentDate: [this._calculateNextPatmentDate(), [Validators.required]]
            });
        }
    }

    /**
     * Create a receipt paid
     * @return Notice of action done
     */
    createReceiptPaid(paymentId: string): Observable<HttpResponse> {
        const requestBody: CreateReceiptPaidDataSend = this.paymentForm.value;
        return this._receiptPaidService.createReceiptPaid(paymentId, requestBody);
    }

    /**
     * Calculate the balance outstanding
     */
    calculateBalanceOutstanding(): void {
        const amount: number = parseFloat(this.f.amount.value);
        if(!!this.payment) {
            this.balanceOutstanding = this.payment.pendingAmount - amount;
        }
    }

    /**
     * Calculate the balance remaining
     */
    calculateBalanceRemaining(): void {
        const amount: number = parseFloat(this.f.amount.value);
        if(!!this.payment) {
            this.balanceRemaining = amount - this.payment.pendingAmount;
        }
    }

    /**
     * Load the policy data
     * @param  paymentId The payment ID
     * @return           Notice of action done
     */
    loadPolicy(paymentId: string): Observable<void> {
        const fields: string = 'policyNumber,paymentPlanName,paymentPlanMonths,validityStartDate,validityEndDate,pendingAmount,pendingReceipts,paymentDate,currencyName,isMultiyear';
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
            amount = this._currencyPipe.transform(this.payment.pendingAmount / this.payment.pendingReceipts, '', '', '0.2-2') || '';
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
