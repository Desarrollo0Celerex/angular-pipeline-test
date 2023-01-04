import { Injectable } from '@angular/core';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SHORT_ALPHANUMERIC_LENGTH, LONG_ALPHANUMERIC_LENGTH, FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Currency } from '@interfaces/currency.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@interfaces/policy.interface';
import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';

@Injectable()
export class CreatePolicyInsuredService {
    currencies: Currency[] = [];
    form: FormGroup = this._buildForm();
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];
    policy: Policy | null = null;

    constructor(
        private _currencyService: CurrencyService,
        private _formBuilder: FormBuilder,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _policyService: PolicyService,
        private _policyInsuredService: PolicyInsuredService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    createPolicyInsured(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._policyInsuredService.createPolicyInsured(contactId, policyId, requestBody);
    }

    loadCurrencies(): void {
        const fields: string = 'currencyId,name';
        this._currencyService.getCurrencies(fields).subscribe((res: HttpResponse) => {
            this.currencies = res.data;
        })
    }

    loadPaymentMethods(): void {
        const fields: string = 'paymentMethodId,name';
        this._paymentMethodService.getPaymentMethods(fields).subscribe((res: HttpResponse) => {
            this.paymentMethods = res.data;
        })
    }

    loadPaymentPlans(): void {
        const fields: string = 'paymentPlanId,name,months';
        this._paymentPlanService.getPaymentPlans(fields).subscribe((res: HttpResponse) => {
            this.paymentPlans = res.data;
        })
    }

    loadPolicy(contactId: string, policyId: string): Observable<void> {
        const fields: string = 'policyStatusBackground,policyStatusName,policyStatusDescription,insuranceName,insuranceTypeName,policyNumber,insuranceIcon,insuranceBackground,lifeTime,validityStartDate,validityEndDate,policyNumber,clientNumber,insurerName,insuranceName,insuranceTypeName,emissionDate,validityStartDate,validityEndDate';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            tap((res: HttpResponse) => {
                this.policy = res.data;
            }),
            map(_ => { })
        )
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            insuredPolicyFile: ['', [Validators.required] ],
            certificate: ['', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
            validityStartDate: ['', [Validators.required, ValidatorsHelper.date]],
            validityEndDate: ['', [Validators.required, ValidatorsHelper.date]],
            netPay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
            feePay: ['0.00', [Validators.required,ValidatorsHelper.amount]],
            coverPay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
            extraPay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
            taxPay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
            discount: ['0.00', [Validators.required, ValidatorsHelper.amount]],
            totalAmount: ['0.00', [Validators.required, ValidatorsHelper.amount]],
            currencyId: ['', [Validators.required]],
            paymentMethodId: ['', [Validators.required]],
            paymentPlanId: ['', [Validators.required]], 
            vehicleMaker: ['', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(50), ValidatorsHelper.alphanumeric]],
            vehicleVersion: ['', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.freeText]],
            vehicleModel: ['', [Validators.required, ValidatorsHelper.vehicleModel]],
            vehiclePlates: ['', [Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
            vehicleSerial: ['', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.alphanumeric]],
            vehicleMotor: ['', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.alphanumeric]],
        })
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('insuredPolicyFile', this.f.insuredPolicyFile.value);
        requestBody.append('certificate', this.f.certificate.value);
        requestBody.append('validityStartDate', this.f.validityStartDate.value);
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('netPay', this.f.netPay.value);
        requestBody.append('feePay', this.f.feePay.value);
        requestBody.append('coverPay', this.f.coverPay.value);
        requestBody.append('extraPay', this.f.extraPay.value);
        requestBody.append('taxPay', this.f.taxPay.value);
        requestBody.append('discount', this.f.discount.value);
        requestBody.append('totalAmount', this.f.totalAmount.value);
        requestBody.append('currencyId', this.f.currencyId.value);
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('vehicleMaker', this.f.vehicleMaker.value);
        requestBody.append('vehicleVersion', this.f.vehicleVersion.value);
        requestBody.append('vehicleModel', this.f.vehicleModel.value);
        requestBody.append('vehiclePlates', this.f.vehiclePlates.value);
        requestBody.append('vehicleSerial', this.f.vehicleSerial.value);
        requestBody.append('vehicleMotor', this.f.vehicleMotor.value);

        return requestBody;
    }
}
