import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { FREE_TEXT_LENGTH, TITULAR_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';

import { Currency } from '@interfaces/currency.interface';
import { ExternalPolicy } from '@interfaces/external-policy.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Insurer } from '@interfaces/insurer.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceType } from '@interfaces/insurance-type.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { UpdateExternalPolicyDataSend } from '@interfaces/update-external-policy-data-send.interface';

import { ExternalPolicyService } from '@services/external-policy.service';
import { CurrencyService } from '@services/currency.service';
import { InsurerService } from '@services/insurer.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceTypeService } from '@services/insurance-type.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';

@Injectable()
export class UpdateExternalPolicyService {
    currencies: Currency[] = [];
    externalPolicy: ExternalPolicy | null = null;
    form: UntypedFormGroup = this._formBuilder.group({});
    insurers: Insurer[] = [];
    insurances: Insurance[] = [];
    insuranceTypes: InsuranceType[] = [];
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];

    constructor(
        private _currencyService: CurrencyService,
        private _externalPolicyService: ExternalPolicyService,
        private _formBuilder: UntypedFormBuilder,
        private _insurerService: InsurerService,
        private _insuranceService: InsuranceService,
        private _insuranceTypeService: InsuranceTypeService,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    buildForm(externalPolicy: ExternalPolicy): void {
        this.form = this._formBuilder.group({
            coveredProperty: [(!!externalPolicy && !!externalPolicy.coveredProperty) ? externalPolicy.coveredProperty : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            policyNumber: [(!!externalPolicy && !!externalPolicy.policyNumber) ? externalPolicy.policyNumber : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            clientNumber: [(!!externalPolicy && !!externalPolicy.clientNumber) ? externalPolicy.clientNumber : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            insurerId: [(!!externalPolicy && !!externalPolicy.insurerId) ? externalPolicy.insurerId : '', [Validators.required]],
            insuranceId: [(!!externalPolicy && !!externalPolicy.insuranceId) ? externalPolicy.insuranceId : '', [Validators.required]],
            insuranceTypeId: [(!!externalPolicy && !!externalPolicy.insuranceTypeId) ? externalPolicy.insuranceTypeId : '', [Validators.required]],
            titularName: [(!!externalPolicy && !!externalPolicy.titularName) ? externalPolicy.titularName : '', [Validators.required, Validators.minLength(TITULAR_NAME_LENGTH.MIN), Validators.maxLength(TITULAR_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
            titularRfc: [(!!externalPolicy && !!externalPolicy.titularRfc) ? externalPolicy.titularRfc : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            titularPostalCode: [(!!externalPolicy && !!externalPolicy.titularPostalCode) ? externalPolicy.titularPostalCode : '', [ValidatorsHelper.postalCode ] ],
            titularPhoneNumber: [(!!externalPolicy && !!externalPolicy.titularPhoneNumber) ? externalPolicy.titularPhoneNumber : '', [ValidatorsHelper.phoneNumber] ],
            emissionDate: [(!!externalPolicy && !!externalPolicy.emissionDate) ? moment(externalPolicy.emissionDate).format('DD/MM/YYYY') : '', [Validators.required, ValidatorsHelper.date] ],
            validityStartDate: [(!!externalPolicy && !!externalPolicy.validityStartDate) ? moment(externalPolicy.validityStartDate).format('DD/MM/YYYY') : '', [Validators.required, ValidatorsHelper.date] ],
            validityEndDate: [(!!externalPolicy && !!externalPolicy.validityEndDate) ? moment(externalPolicy.validityEndDate).format('DD/MM/YYYY') : '', [Validators.required, ValidatorsHelper.date] ],
            netPay: [(!!externalPolicy && !!externalPolicy.netPay) ? externalPolicy.netPay : '', [Validators.required, ValidatorsHelper.amount] ],
            taxPay: [(!!externalPolicy && !!externalPolicy.taxPay) ? externalPolicy.taxPay : '', [Validators.required, ValidatorsHelper.amount] ],
            feePay: [(!!externalPolicy && !!externalPolicy.feePay) ? externalPolicy.feePay : '', [Validators.required, ValidatorsHelper.amount] ],
            coverPay: [(!!externalPolicy && !!externalPolicy.coverPay) ? externalPolicy.coverPay : '', [Validators.required, ValidatorsHelper.amount] ],
            extraPay: [(!!externalPolicy && !!externalPolicy.extraPay) ? externalPolicy.extraPay : '', [Validators.required, ValidatorsHelper.amount] ],
            policyAmount: [(!!externalPolicy && !!externalPolicy.policyAmount) ? externalPolicy.policyAmount : '', [Validators.required, ValidatorsHelper.amount] ],
            currencyId: [(!!externalPolicy && !!externalPolicy.currencyId) ? externalPolicy.currencyId : '', [Validators.required]],
            paymentMethodId: [(!!externalPolicy && !!externalPolicy.paymentMethodId) ? externalPolicy.paymentMethodId : '', [Validators.required]],
            paymentPlanId: [(!!externalPolicy && !!externalPolicy.paymentPlanId) ? externalPolicy.paymentPlanId : '', [Validators.required]]
        });
    }

    loadExternalPolicy(contactId: string, externalPolicyId: string): Observable<ExternalPolicy> {
        const fields: string = 'externalPolicyId,isChecked,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyAmount,policyNumber,insurerImageUrl,insuranceName,insuranceIcon,insuranceBackground,paymentMethodName,insuranceTypeName,currencyName,externalPolicyStatusName,externalPolicyStatusDescription,lifeTime,clientNumber,insurerId,insuranceId,insuranceTypeId,titularName,titularRfc,titularPostalCode,titularPhoneNumber,emissionDate,netPay,taxPay,feePay,coverPay,extraPay,currencyId,paymentPlanId,paymentMethodId';
        return this._externalPolicyService.getContactExternalPolicy(contactId, externalPolicyId, fields).pipe(
            tap((res: HttpResponse) => {
                this.externalPolicy = res.data;
            }),
            map((res: HttpResponse) => { return  res.data })
        )
    }

    /**
     * Load the currencies
     */
    loadCurrencies(): void {
        const fields: string = 'currencyId,name';
        this._currencyService.getCurrencies(fields).subscribe((res: HttpResponse) => {
            this.currencies = res.data;
        });
    }

    /**
     * Load the insurers
     */
    loadInsurers(): void {
        const fields: string = 'insurerId,name';
        this._insurerService.getInsurers(fields).subscribe((res: HttpResponse) => {
            this.insurers = res.data;
        })
    }

    /**
     * Load the insurances
     */
    loadInsurances(): Observable<void> {
        const fields: string = 'insuranceId,name';
        return this._insuranceService.getInsurances(fields).pipe(
            tap((res: HttpResponse) => {
                this.insurances = res.data;
            }),
            map(() => { })
        );
    }

    /**
     * Load the insurance types
     * @param insuranceId The insurance ID
     */
    loadInsuranceTypes(insuranceId: number): void {
        this.insuranceTypes = [];
        const fields: string = 'insuranceTypeId,name';
        this._insuranceTypeService.getInsuranceTypes(insuranceId, fields).subscribe((res: HttpResponse) => {
            this.insuranceTypes = res.data;
        })
    }

    /**
     * Load the payment methods
     */
    loadPaymentMethods(): void {
        const fields: string = 'paymentMethodId,name';
        this._paymentMethodService.getPaymentMethods(fields).subscribe((res: HttpResponse) => {
            this.paymentMethods = res.data;
        });
    }

    /**
     * Load the payment plans
     */
    loadPaymentPlans(): void {
        const fields: string = 'paymentPlanId,name,months';
        this._paymentPlanService.getPaymentPlans(fields).subscribe((res: HttpResponse) => {
            this.paymentPlans = res.data;
        });
    }

    updateExternalPolicy(contactId: string, externalPolicyId: string): Observable<void> {
        const requestBody: UpdateExternalPolicyDataSend = this._getRequestBody();
        return this._externalPolicyService.updateExternalPolicy(contactId, externalPolicyId, requestBody);
    }

    private _getRequestBody(): UpdateExternalPolicyDataSend {
        return {
            coveredProperty: this.f.coveredProperty.value,
            policyNumber: this.f.policyNumber.value,
            clientNumber: this.f.clientNumber.value,
            insurerId: this.f.insurerId.value,
            insuranceId: this.f.insuranceId.value,
            insuranceTypeId: this.f.insuranceTypeId.value,
            titularName: this.f.titularName.value,
            titularRfc: this.f.titularRfc.value,
            titularPostalCode: this.f.titularPostalCode.value,
            titularPhoneNumber: this.f.titularPhoneNumber.value,
            emissionDate: this.f.emissionDate.value,
            validityStartDate: this.f.validityStartDate.value,
            validityEndDate: this.f.validityEndDate.value,
            netPay: this.f.netPay.value,
            feePay: this.f.feePay.value,
            coverPay: this.f.coverPay.value,
            extraPay: this.f.extraPay.value,
            taxPay: this.f.taxPay.value,
            policyAmount: this.f.policyAmount.value,
            currencyId: this.f.currencyId.value,
            paymentMethodId: this.f.paymentMethodId.value,
            paymentPlanId: this.f.paymentPlanId.value
        }
    }
}
