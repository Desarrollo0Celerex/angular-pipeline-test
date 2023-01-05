import { Injectable } from '@angular/core';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SHORT_ALPHANUMERIC_LENGTH, LONG_ALPHANUMERIC_LENGTH, FREE_TEXT_LENGTH, INSURANCE_GROUPS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Currency } from '@interfaces/currency.interface';
import { Insured } from '@interfaces/insured.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@interfaces/policy.interface';
import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';

@Injectable()
export class UpdatePolicyInsuredService {
    currencies: Currency[] = [];
    form: FormGroup = this._formBuilder.group({});
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];
    policy: Policy | null = null;
    policyInsured: Insured | null = null;

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

    checkPolicyAmounts(): boolean {
        let netPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.netPay.value));
        let taxPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.taxPay.value));
        let feePay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.feePay.value));
        let coverPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.coverPay.value));
        let extraPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.extraPay.value));
        let discount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.discount.value));
        discount = (discount < 0) ? discount * (-1) : discount;
        let totalPolicy: number = netPay + taxPay + feePay + coverPay + extraPay - discount;
        let totalPolicyWithoutDiscount: number = netPay + taxPay + feePay + coverPay + extraPay;
        const policyAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.totalAmount.value));

        if(
            (totalPolicy >= (policyAmount - 1)) && (totalPolicy <= (policyAmount + 1)) ||
            (totalPolicyWithoutDiscount >= (policyAmount - 1)) && (totalPolicyWithoutDiscount <= (policyAmount + 1))
        ) {
            return true;
        }
        return false;
    }

    updatePolicyInsured(contactId: string, policyId: string, policyInsuredId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._policyInsuredService.updatePolicyInsured(contactId, policyId, policyInsuredId, requestBody);
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
        const fields: string = 'policyStatusBackground,policyStatusName,policyStatusDescription,insuranceName,insuranceTypeName,policyNumber,insuranceIcon,insuranceBackground,lifeTime,validityStartDate,validityEndDate,policyNumber,clientNumber,insurerName,insuranceName,insuranceTypeName,insuranceGroupId';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            tap((res: HttpResponse) => {
                this.policy = res.data;
            }),
            map(_ => { })
        )
    }

    loadPolicyInsured(contactId: string, policyId: string, policyInsuredId: string): Observable<void> {
        const insuredFields: string = this._getInsuredFields();
        const fields: string = 'policyUrl,certificate,validityStartDate,validityEndDate,netPay,feePay,coverPay,extraPay,taxPay,discount,totalAmount,currencyId,paymentMethodId,paymentPlanId,' + insuredFields;
        return this._policyInsuredService.getPolicyInsured(contactId, policyId, policyInsuredId, fields).pipe(
            tap((res: Insured) => {
                this.policyInsured = res;
            }),
            map(_ => { })
        )
    }

    buildForm(): void {
        this.form = this._formBuilder.group({
            insuredPolicyFile: [''],
            certificate: [(!!this.policyInsured!.certificate) ? this.policyInsured!.certificate : '', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
            validityStartDate: [(!!this.policyInsured!.validityStartDate) ? this.policyInsured!.validityStartDate : '', [Validators.required, ValidatorsHelper.date]],
            validityEndDate: [(!!this.policyInsured!.validityEndDate) ? this.policyInsured!.validityEndDate : '', [Validators.required, ValidatorsHelper.date]],
            netPay: [(!!this.policyInsured!.netPay) ? this.policyInsured!.netPay : '0.00', [Validators.required, ValidatorsHelper.amount]],
            feePay: [(!!this.policyInsured!.feePay) ? this.policyInsured!.feePay : '0.00', [Validators.required,ValidatorsHelper.amount]],
            coverPay: [(!!this.policyInsured!.coverPay) ? this.policyInsured!.coverPay : '0.00', [Validators.required, ValidatorsHelper.amount]],
            extraPay: [(!!this.policyInsured!.extraPay) ? this.policyInsured!.extraPay : '0.00', [Validators.required, ValidatorsHelper.amount]],
            taxPay: [(!!this.policyInsured!.taxPay) ? this.policyInsured!.taxPay : '0.00', [Validators.required, ValidatorsHelper.amount]],
            discount: [(!!this.policyInsured!.discount) ? this.policyInsured!.discount : '0.00', [Validators.required, ValidatorsHelper.amount]],
            totalAmount: [(!!this.policyInsured!.totalAmount) ? this.policyInsured!.totalAmount : '0.00', [Validators.required, ValidatorsHelper.amount]],
            currencyId: [(!!this.policyInsured!.currencyId) ? this.policyInsured!.currencyId : '', [Validators.required]],
            paymentMethodId: [(!!this.policyInsured!.paymentMethodId) ? this.policyInsured!.paymentMethodId : '', [Validators.required]],
            paymentPlanId: [(!!this.policyInsured!.paymentPlanId) ? this.policyInsured!.paymentPlanId : '', [Validators.required]]
        });

        switch (this.policy!.insuranceGroupId) {
            case INSURANCE_GROUPS.PEOPLE:
               
                break;

            case INSURANCE_GROUPS.VEHICLES:
                this.form.addControl('vehicleMaker', new FormControl((!!this.policyInsured!.vehicleMaker) ? this.policyInsured!.vehicleMaker : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(50), ValidatorsHelper.alphanumeric]));
                this.form.addControl('vehicleVersion', new FormControl((!!this.policyInsured!.vehicleVersion) ? this.policyInsured!.vehicleVersion : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.freeText]));
                this.form.addControl('vehicleModel', new FormControl((!!this.policyInsured!.vehicleModel) ? this.policyInsured!.vehicleModel : '', [Validators.required, ValidatorsHelper.vehicleModel]));
                this.form.addControl('vehiclePlates', new FormControl((!!this.policyInsured!.vehiclePlates) ? this.policyInsured!.vehiclePlates : '', [Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]));
                this.form.addControl('vehicleSerial', new FormControl((!!this.policyInsured!.vehicleSerial) ? this.policyInsured!.vehicleSerial : '', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.alphanumeric]));
                this.form.addControl('vehicleMotor', new FormControl((!!this.policyInsured!.vehicleMotor) ? this.policyInsured!.vehicleMotor : '', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.alphanumeric]));
                break;

            case INSURANCE_GROUPS.BUILDINGS:
                
                break;

            case INSURANCE_GROUPS.MERCHANDISE:
            case INSURANCE_GROUPS.OBJECTS:
            case INSURANCE_GROUPS.RC:
                
                break;

            default:
                this.form.addControl('policyDetails', new FormControl((!!this.policyInsured!.policyDetails) ? this.policyInsured!.policyDetails : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]));
                break;
        }
        
    }

    private _getInsuredFields(): string {
        let insuredFields: string = '';
        switch (this.policy!.insuranceGroupId) {
            case INSURANCE_GROUPS.PEOPLE:
               
                break;

            case INSURANCE_GROUPS.VEHICLES:
                insuredFields = 'vehicleMaker,vehicleVersion,vehicleModel,vehiclePlates,vehicleSerial,vehicleMotor';
                break;

            case INSURANCE_GROUPS.BUILDINGS:
                
                break;

            case INSURANCE_GROUPS.MERCHANDISE:
            case INSURANCE_GROUPS.OBJECTS:
            case INSURANCE_GROUPS.RC:
                
                break;

            default:
                insuredFields = 'policyDetails';
                break;
        }
        return insuredFields;
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

        switch (this.policy!.insuranceGroupId) {
            case INSURANCE_GROUPS.PEOPLE:
               
                break;

            case INSURANCE_GROUPS.VEHICLES:
                requestBody.append('vehicleMaker', this.f.vehicleMaker.value);
                requestBody.append('vehicleVersion', this.f.vehicleVersion.value);
                requestBody.append('vehicleModel', this.f.vehicleModel.value);
                requestBody.append('vehiclePlates', this.f.vehiclePlates.value);
                requestBody.append('vehicleSerial', this.f.vehicleSerial.value);
                requestBody.append('vehicleMotor', this.f.vehicleMotor.value);
                break;

            case INSURANCE_GROUPS.BUILDINGS:
                
                break;

            case INSURANCE_GROUPS.MERCHANDISE:
            case INSURANCE_GROUPS.OBJECTS:
            case INSURANCE_GROUPS.RC:
                
                break;

            default:
                requestBody.append('policyDetails', this.f.policyDetails.value);
                break;
        }

        return requestBody;
    }
}
