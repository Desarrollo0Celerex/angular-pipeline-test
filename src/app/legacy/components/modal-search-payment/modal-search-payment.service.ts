import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { PaymentService } from '@services/payment.service';

import { FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';

@Injectable()
export class ModalSearchPaymentService {
    form: UntypedFormGroup = this._buildSearchForm();

    constructor(
        private _formbuilder: UntypedFormBuilder,
        private _paymentService: PaymentService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    /**
     * Search the policy
     * @return The payments
     */
    searchPayment(): Observable<HttpResponse> {
        const page: number = 1;
        const fields: string =
            'paymentSourceTypeName,paymentStatusId,paymentStatusBackground,paymentStatusName,currencyName,pendingAmount,insuranceName,policyNumber,paymentId,policyId,contactId';
        const query: string =
            'policyNumber:' + this.f.policyNumber.value.trim();
        return this._paymentService.getPayments(page, fields, '', query);
    }

    /**
     * Build the search form
     * @return The search form
     */
    private _buildSearchForm(): UntypedFormGroup {
        return this._formbuilder.group({
            policyNumber: [
                '',
                [
                    Validators.required,
                    Validators.minLength(FREE_TEXT_LENGTH.MIN),
                    Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                    ValidatorsHelper.freeText,
                ],
            ],
        });
    }
}
