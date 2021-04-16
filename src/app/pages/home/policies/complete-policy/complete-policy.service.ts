import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as moment from 'moment';

import { FREE_TEXT_LENGTH, OWN_NAME_LENGTH, DEFAULT_CURRENCY_ID, DEFAULT_METHOD_ID, DEFAULT_PLAN_ID } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Currency } from '@interfaces/currency.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyPreview } from '@interfaces/policy-preview.interface';
import { AtomScannService } from '@services/atom-scann.service';
import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CompletePolicyService {
    currencies: Currency[];
    paymentMethods: PaymentMethod[];
    paymentPlans: PaymentPlan[];
    policy: PolicyPreview | null;
    policyForm: FormGroup;

    constructor(
        private _atomScannService: AtomScannService,
        private _currencyService: CurrencyService,
        private _formBuilder: FormBuilder,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _policyService: PolicyService
    ) {
        this.currencies = [];
        this.paymentMethods = [];
        this.paymentPlans = [];
        this.policy = null;
        this.policyForm = this._formBuilder.group({});
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.policyForm.controls;
    }

    /**
     * Build the policy form
     */
    buildPolicyForm(policy: Policy | null = null): void {
        this.policyForm = this._formBuilder.group({
            policyFile: [''],
            coveredProperty: [(!!policy && !!policy.coveredProperty) ? policy.coveredProperty : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            policyNumber: [(!!policy && !!policy.policyNumber) ? policy.policyNumber : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            clientNumber: [(!!policy && !!policy.clientNumber) ? policy.clientNumber : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            emissionDate: [(!!policy && !!policy.emissionDate) ? policy.emissionDate : '', [Validators.required, ValidatorsHelper.date] ],
            validityStartDate: [(!!policy && !!policy.validityStartDate) ? policy.validityStartDate : '', [Validators.required, ValidatorsHelper.date] ],
            validityEndDate: [(!!policy && !!policy.validityEndDate) ? policy.validityEndDate : '', [Validators.required, ValidatorsHelper.date] ],
            titularName: [(!!policy && !!policy.titularName) ? policy.titularName : '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
            titularRfc: [(!!policy && !!policy.titularRfc) ? policy.titularRfc : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            titularPostalCode: ['', [ValidatorsHelper.postalCode ] ],
            titularPhoneNumber: [(!!policy && !!policy.titularPhoneNumber) ? policy.titularPhoneNumber : '', [ValidatorsHelper.phoneNumber] ],
            policyAmount: [(!!policy && !!policy.policyAmount) ? policy.policyAmount : '', [Validators.required, ValidatorsHelper.amount] ],
            currencyId: [(!!policy && !!policy.currencyId) ? policy.currencyId : DEFAULT_CURRENCY_ID, [Validators.required]],
            paymentMethodId: [(!!policy && !!policy.paymentMethodId) ? policy.paymentMethodId : DEFAULT_METHOD_ID, [Validators.required]],
            paymentPlanId: [(!!policy && !!policy.paymentPlanId) ? policy.paymentPlanId : DEFAULT_PLAN_ID, [Validators.required]],
            bills: ['', [Validators.required, ValidatorsHelper.number]]
        });
    }

    /**
     * Calculate the bills
     */
    calculateBills(): void {
        let bills: number = 0;
        const validityStartDate: string = this.f.validityStartDate.value;
        const validityEndDate: string = this.f.validityEndDate.value;
        if(!!validityStartDate && !!validityEndDate) {
            const paymentPlanMonths: number = this._getPaymentPlanMonths(this.f.paymentPlanId.value);
            // If it is an one-time payment
            if(paymentPlanMonths === 0) {
                this.policyForm.patchValue({bills: 1});
            } else {
                const startDate = moment(validityStartDate, 'DD-MM-YYYY');
                const endDate = moment(validityEndDate, 'DD/MM/YYYY');
                // If the end date is major than the start date
                if(endDate.isAfter(startDate)) {
                    while(startDate.isBefore(endDate)) {
                        bills++;
                        startDate.add(paymentPlanMonths, 'month');
                    }
                    this.policyForm.patchValue({bills});
                } else {
                    this.policyForm.patchValue({bills: ''});
                }
            }
        }
    }

    /**
     * Complete the policy data
     * @param  contactId The contact ID
     * @param  policyId  The policy ID to complete
     * @return           Notice of action done
     */
    completePolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._policyService.completePolicy(contactId, policyId, requestBody);
    }

    /**
     * Download the policy
     * @param  policyUrl The policy Url
     * @return           The policy file
     */
    downloadPolicy(policyUrl: string): Observable<any> {
        return this._policyService.downloadPolicy(policyUrl);
    }

    /**
     * Load the contact policy
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          The policy data
     */
    loadContactPolicy(contactId: string, policyId: string): Observable<HttpResponse> {
        this.policy = null;
        const fields: string = 'policyId,insuranceId,insuranceName,insuranceIcon,insuranceBackground,policyStatusName,policyStatusBackground,insuranceTypeId,insuranceTypeName,insurerId,insurerName,policyUrl';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            tap(( res: HttpResponse) => {
                this.policy = res.data;
            })
        )
    }

    /**
     * Load the currencies
     * @return Notice of action done
     */
    loadCurrencies(): Observable<void> {
        const fields: string = 'currencyId,name';
        return this._currencyService.getCurrencies(fields).pipe(
            tap((res: HttpResponse) => {
                this.currencies = res.data;
            }),
            map(() => { })
        );
    }

    /**
     * Load the payment methods
     * @return Notice of action done
     */
    loadPaymentMethods(): Observable<void> {
        const fields: string = 'paymentMethodId,name';
        return this._paymentMethodService.getPaymentMethods(fields).pipe(
            tap((res: HttpResponse) => {
                this.paymentMethods = res.data;
            }),
            map(() => { })
        );
    }

    /**
     * Load the payment plans
     * @return Notice of action done
     */
    loadPaymentPlans(): Observable<void> {
        const fields: string = 'paymentPlanId,name,months';
        return this._paymentPlanService.getPaymentPlans(fields).pipe(
            tap((res: HttpResponse) => {
                this.paymentPlans = res.data;
            }),
            map(() => { })
        );
    }

    scannPolicy(policyFile: any): Observable<HttpResponse> {
        const requestBody: FormData = this._getRequestBodyToScannPolicy(policyFile);
        return this._atomScannService.scannPolicy(requestBody);
    }

    /**
     * Get the months of the payment plan
     * @param  paymentPlanId The payment plant ID
     * @return                The months
     */
    private _getPaymentPlanMonths(paymentPlanId: number): number {
        const paymentPlan: PaymentPlan | undefined = this.paymentPlans.find( (element: PaymentPlan) => element.paymentPlanId == paymentPlanId);
        return (!!paymentPlan) ? paymentPlan.months : 0;
    }

    /**
     * Get the request body
     * @return The request body
     */
    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('policyFile', this.f.policyFile.value);
        requestBody.append('coveredProperty', this.f.coveredProperty.value);
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('emissionDate', this.f.emissionDate.value);
        requestBody.append('validityStartDate', this.f.validityStartDate.value);
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularPhoneNumber', this.f.titularPhoneNumber.value);
        requestBody.append('policyAmount', this.f.policyAmount.value);
        requestBody.append('currencyId', this.f.currencyId.value);
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('bills', this.f.bills.value);
        return requestBody;
    }

    /**
     * Get the request body to scann policy
     * @return The request body
     */
    private _getRequestBodyToScannPolicy(policyFile: any): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('file', policyFile);
        if(!!this.policy) {
            requestBody.append('insurerId', this.policy.insurerId.toString());
            requestBody.append('insuranceId', this.policy.insuranceId.toString());
            requestBody.append('insuranceTypeId', this.policy.insuranceTypeId.toString());
        }
        return requestBody;
    }
}
