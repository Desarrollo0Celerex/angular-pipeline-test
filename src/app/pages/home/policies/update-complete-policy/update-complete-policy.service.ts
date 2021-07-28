import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { FREE_TEXT_LENGTH, OWN_NAME_LENGTH } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';

import { Currency } from '@interfaces/currency.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@interfaces/policy.interface';

import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class UpdateCompletePolicyService {
    currencies: Currency[] = [];
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];
    policy: Policy | null = null;
    policyForm: FormGroup = this._formBuilder.group({});;

    constructor(
        private _currencyService: CurrencyService,
        private _datePipe: DatePipe,
        private _formBuilder: FormBuilder,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _policyService: PolicyService
    ) { }

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
            titularName: [(!!policy && !!policy.titularName) ? policy.titularName : '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
            titularRfc: [(!!policy && !!policy.titularRfc) ? policy.titularRfc : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            titularPostalCode: [(!!policy && !!policy.titularPostalCode) ? policy.titularPostalCode : '', [ValidatorsHelper.postalCode ] ],
            titularPhoneNumber: [(!!policy && !!policy.titularPhoneNumber) ? policy.titularPhoneNumber : '', [ValidatorsHelper.phoneNumber] ],
            emissionDate: [(!!policy && !!policy.emissionDate) ? policy.emissionDate : '', [Validators.required, ValidatorsHelper.date] ],
            validityStartDate: [(!!policy && !!policy.validityStartDate) ? policy.validityStartDate : '', [Validators.required, ValidatorsHelper.date] ],
            validityEndDate: [(!!policy && !!policy.validityEndDate) ? policy.validityEndDate : '', [Validators.required, ValidatorsHelper.date] ],
            netPay: [(!!policy && !!policy.netPay) ? policy.netPay : '', [Validators.required, ValidatorsHelper.amount] ],
            taxPay: [(!!policy && !!policy.taxPay) ? policy.taxPay : '', [Validators.required, ValidatorsHelper.amount] ],
            feePay: [(!!policy && !!policy.feePay) ? policy.feePay : '', [Validators.required, ValidatorsHelper.amount] ],
            coverPay: [(!!policy && !!policy.coverPay) ? policy.coverPay : '', [Validators.required, ValidatorsHelper.amount] ],
            extraPay: [(!!policy && !!policy.extraPay) ? policy.extraPay : '', [Validators.required, ValidatorsHelper.amount] ],
            policyAmount: [(!!policy && !!policy.policyAmount) ? policy.policyAmount : '', [Validators.required, ValidatorsHelper.amount] ],
            currencyId: [(!!policy && !!policy.currencyId) ? policy.currencyId : '', [Validators.required]],
            paymentMethodId: [(!!policy && !!policy.paymentMethodId) ? policy.paymentMethodId : '', [Validators.required]],
            /*paymentPlanId: [(!!policy && !!policy.paymentPlanId) ? policy.paymentPlanId : '', [Validators.required]],
            bills: ['', [Validators.required, ValidatorsHelper.number]]*/
        });
    }

    /**
     * Calculate the bills
     */
    /*calculateBills(): void {
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
    }*/

    /**
     * Check the policy amounts
     * @return True if the total policy is equal to the policy amount, otherwise false
     */
    checkPolicyAmounts(): boolean {
        const totalPolicy: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.netPay.value)) +
                            parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.taxPay.value)) +
                            parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.feePay.value)) +
                            parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.coverPay.value)) +
                            parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.extraPay.value));
        const policyAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.policyAmount.value));
        return (totalPolicy == policyAmount) ? true : false;
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

    /**
     * Load the policy data
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          Notice of action done
     */
    loadPolicy(contactId: string, policyId: string): Observable<HttpResponse> {
        this.policy = null;
        const fields: string = 'policyId,insuranceId,insuranceName,insuranceIcon,insuranceBackground,policyStatusName,policyStatusBackground,insuranceTypeId,insuranceTypeName,insurerId,insurerName,coveredProperty,policyUrl,policyNumber,clientNumber,emissionDate,validityStartDate,validityEndDate,titularName,titularRfc,titularPostalCode,titularPhoneNumber,netPay,taxPay,feePay,coverPay,extraPay,policyAmount,currencyId,paymentMethodId,paymentPlanId,paymentPlanName,bills';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            tap(( res: HttpResponse) => {
                this.policy = res.data;
                if(!!this.policy) {
                    this.policy.emissionDate = this._getDateFormat(this.policy.emissionDate);
                    this.policy.validityStartDate = this._getDateFormat(this.policy.validityStartDate);
                    this.policy.validityEndDate = this._getDateFormat(this.policy.validityEndDate);
                }
            })
        )
    }

    /**
     * Update the complete policy data
     * @param  contactId The contact ID
     * @param  policyId  The policy ID to update
     * @return           Notice of action done
     */
    updateCompletePolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._policyService.updateCompletePolicy(contactId, policyId, requestBody);
    }

    /**
     * Get the date format
     * @param  date The date to format
     * @return      The formatted date
     */
    private _getDateFormat(date: string | null): string {
        let dateFormat: string = '';
        if(!!date) {
            const formattedDate: string | null = this._datePipe.transform(date, 'dd/MM/yyyy');
            dateFormat = (!!formattedDate) ? formattedDate : '';
        }
        return dateFormat;
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
        requestBody.append('netPay', this.f.netPay.value);
        requestBody.append('taxPay', this.f.taxPay.value);
        requestBody.append('feePay', this.f.feePay.value);
        requestBody.append('coverPay', this.f.coverPay.value);
        requestBody.append('extraPay', this.f.extraPay.value);
        requestBody.append('policyAmount', this.f.policyAmount.value);
        requestBody.append('currencyId', this.f.currencyId.value);
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        /*requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('bills', this.f.bills.value);*/
        return requestBody;
    }
}
