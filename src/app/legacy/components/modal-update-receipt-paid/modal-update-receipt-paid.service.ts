import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PaymentType } from '@interfaces/payment-type.interface';
import { ReceiptPaid } from '@interfaces/receipt-paid.interface';
import { UpdateReceiptPaidDataSend } from '@interfaces/update-receipt-paid-data-send.interface';

import { PaymentTypeService } from '@services/payment-type.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ModalUpdateReceiptPaidService {
    form: UntypedFormGroup = this._formBuilder.group({});
    paymentTypes: PaymentType[] = [];
    receiptPaid: ReceiptPaid | null = null;
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _paymentTypeService: PaymentTypeService,
        private _receiptPaidService: ReceiptPaidService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    loadPaymentTypes(): void {
        const fields: string = 'paymentTypeId,name';
        this._paymentTypeService
            .getPaymentTypes(fields)
            .subscribe((res: HttpResponse) => {
                this.paymentTypes = res.data;
            });
    }

    loadReceiptPaid(receiptPaidId: string): Observable<void> {
        const fields: string =
            'policyNumber,paymentPlanName,validityStartDate,validityEndDate,receiptsAmount,applicationDate,currencyName,paymentTypeId,paymentReference';
        return this._receiptPaidService
            .getReceiptPaid(receiptPaidId, fields)
            .pipe(
                tap((res: HttpResponse) => {
                    this.receiptPaid = res.data;
                }),
                map(() => {})
            );
    }

    buildForm(): void {
        if (!!this.receiptPaid) {
            this.form = this._formBuilder.group({
                receiptsAmount: [
                    this.receiptPaid.receiptsAmount,
                    [Validators.required, ValidatorsHelper.amount],
                ],
                applicationDate: [
                    moment(this.receiptPaid.applicationDate).format(
                        'DD/MM/YYYY'
                    ),
                    [Validators.required, ValidatorsHelper.date],
                ],
                paymentTypeId: [
                    this.receiptPaid.paymentTypeId,
                    [Validators.required],
                ],
                paymentReference: [
                    this.receiptPaid.paymentReference,
                    [Validators.required],
                ],
                paymentEvidence: [''],
            });
            this.isBuiltForm = true;
        }
    }

    updateReceipPaid(
        contactId: string,
        policyId: string,
        paymentId: string,
        receiptPaidId: string
    ): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._receiptPaidService.updateReceiptPaid(
            contactId,
            policyId,
            paymentId,
            receiptPaidId,
            requestBody
        );
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('receiptsAmount', this.f.receiptsAmount.value);
        requestBody.append('applicationDate', this.f.applicationDate.value);
        requestBody.append('paymentTypeId', this.f.paymentTypeId.value);
        requestBody.append('paymentReference', this.f.paymentReference.value);
        requestBody.append('paymentEvidence', this.f.paymentEvidence.value);
        return requestBody;
    }
}
