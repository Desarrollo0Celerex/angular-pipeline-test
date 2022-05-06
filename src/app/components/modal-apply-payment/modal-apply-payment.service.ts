import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { PAYMENT_PLANS } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { PaymentType } from '@interfaces/payment-type.interface';
import { PaymentService } from '@services/payment.service';
import { PaymentTypeService } from '@services/payment-type.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ModalApplyPaymentService {
    payment: Payment | null = null;
    paymentTypes: PaymentType[] = [];
    paymentForm: FormGroup = this._formBuilder.group({});

    constructor(
        private _currencyPipe: CurrencyPipe,
        private _receiptPaidService: ReceiptPaidService,
        private _formBuilder: FormBuilder,
        private _paymentService: PaymentService,
        private _paymentTypeService: PaymentTypeService
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
                amount: [this._calculatePaymentAmount(), [Validators.required]],
                receipts: [1, [Validators.required]],
                applicationDate: [moment(this.payment.paymentDate).format('DD/MM/YYYY'), Validators.required],
                nextPaymentDate: [this._calculateNextPatmentDate(), [Validators.required]],
                paymentTypeId: [1, [Validators.required]],
                paymentReference: [this._calculatePaymentReference(), [Validators.required]],
                paymentEvidence: ['']
            });
        }
    }

    /**
     * Create a receipt paid
     * @return Notice of action done
     */
    createReceiptPaid(contactId: string, policyId: string, paymentId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._receiptPaidService.createReceiptPaid(contactId, policyId, paymentId, requestBody);
    }

    /**
     * Load the policy data
     * @param  paymentId The payment ID
     * @return           Notice of action done
     */
    loadPayment(paymentId: string): Observable<void> {
        const fields: string = 'policyNumber,paymentPlanName,paymentPlanMonths,validityStartDate,validityEndDate,pendingAmount,pendingReceipts,paymentDate,currencyName,isMultiyear,bills,tickets,netPay,taxPay,feePay,coverPay,extraPay,paymentPlanReceips,paymentPlanId';
        return this._paymentService.getPayment(paymentId, fields).pipe(
            tap( (res: HttpResponse) => {
                this.payment = res.data;
            }),
            map( () => {})
        )
    }

    loadPaymentTypes(): void {
        const fields: string = 'paymentTypeId,name';
        this._paymentTypeService.getPaymentTypes(fields).subscribe((res: HttpResponse) => {
            this.paymentTypes = res.data;
        });
    }

    private _calculateFirstPaymentAmount(paymentPlanReceips: number, netPay: number, feePay: number, coverPay: number, extraPay: number, taxPay: number): number {
        let sumPayments: number =
            (parseFloat(netPay.toString()) / paymentPlanReceips) +
            (parseFloat(feePay.toString()) / paymentPlanReceips) +
            (parseFloat(extraPay.toString()) / paymentPlanReceips) +
            parseFloat(coverPay.toString());
        const taxes: number = (taxPay != 0) ? sumPayments * 0.16 : 0;
        const paymentAmount = sumPayments + taxes;
        return paymentAmount;
    }

    /**
     * Calculate the payment amount to pay
     * @return The payment amount
     */
    private _calculatePaymentAmount(): string {
        let formattedPaymentAmount: string = '';
        if(!!this.payment) {
            console.log('this.payment.pendingAmount: ',this.payment.pendingAmount)
            console.log('this.payment.pendingReceipts: ',this.payment.pendingReceipts)
            let receiptsAmount: number = 0;
            receiptsAmount = (this.payment.tickets === 0 && this.payment.paymentPlanId != PAYMENT_PLANS.SINGLE_PAYMENT && this.payment.paymentPlanId != PAYMENT_PLANS.ANNUAL)
                ? this._calculateFirstPaymentAmount(this.payment.paymentPlanReceips, this.payment.netPay, this.payment.feePay, this.payment.coverPay, this.payment.extraPay, this.payment.taxPay)
                : this.payment.pendingAmount / this.payment.pendingReceipts;
                console.log('receiptsAmount: ',receiptsAmount);
            formattedPaymentAmount = this._currencyPipe.transform(receiptsAmount, '', '', '0.2-2') || '';
            console.log('formattedPaymentAmount: ',formattedPaymentAmount);
        }
        return  formattedPaymentAmount;
    }

    private _calculatePaymentReference(): string {
        const tickets: number = parseInt(this.payment!.tickets.toString()) + 1;
        return 'PAG-'+tickets+'-'+this.payment!.bills;
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

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('amount', this.f.amount.value);
        requestBody.append('receipts', this.f.receipts.value);
        requestBody.append('applicationDate', this.f.applicationDate.value);
        requestBody.append('nextPaymentDate', this.f.nextPaymentDate.value);
        requestBody.append('paymentTypeId', this.f.paymentTypeId.value);
        requestBody.append('paymentReference', this.f.paymentReference.value);
        requestBody.append('paymentEvidence', this.f.paymentEvidence.value);
        return requestBody;
    }
}
