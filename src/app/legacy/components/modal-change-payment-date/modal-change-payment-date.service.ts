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

import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { UpdatePaymentDateDataSend } from '@interfaces/update-payment-date-data-send.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class ModalChangePaymentDateService {
    form: UntypedFormGroup = this._formBuilder.group({});
    payment: Payment | null = null;
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _paymentService: PaymentService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    buildForm(paymentDate: string): void {
        paymentDate = moment(paymentDate).format('DD/MM/YYYY');
        this.form = this._formBuilder.group({
            paymentDate: [
                paymentDate,
                [Validators.required, ValidatorsHelper.date],
            ],
        });
        this.isBuiltForm = true;
    }

    loadPayment(paymentId: string): Observable<Payment> {
        const fields: string =
            'policyNumber,paymentPlanName,validityStartDate,validityEndDate,paymentAmountPaid,paymentDate,currencyName';
        return this._paymentService.getPayment(paymentId, fields).pipe(
            tap((res: HttpResponse) => {
                this.payment = res.data;
            }),
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    updatePaymentDate(paymentId: string): Observable<void> {
        const requestBody: UpdatePaymentDateDataSend = this.form.value;
        return this._paymentService.updatePaymentDate(paymentId, requestBody);
    }
}
