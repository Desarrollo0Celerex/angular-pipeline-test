import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { FREE_TEXT_LENGTH, INSURANCES, TITULAR_NAME_LENGTH } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';

import { Currency } from '@interfaces/currency.interface';
import { Gender } from '@interfaces/gender.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Insured } from '@interfaces/insured.interface';
import { Insurer } from '@interfaces/insurer.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceType } from '@interfaces/insurance-type.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@interfaces/policy.interface';

import { CurrencyService } from '@services/currency.service';
import { GendersService } from '@services/genders.service';
import { InsurerService } from '@services/insurer.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceTypeService } from '@services/insurance-type.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class UpdateCompletePolicyService {
    currencies: Currency[] = [];
    genders: Gender[] = [];
    insurers: Insurer[] = [];
    insurances: Insurance[] = [];
    insuranceTypes: InsuranceType[] = [];
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];
    policy: Policy | null = null;
    policyForm: FormGroup = this._formBuilder.group({});
    private _areFractionatedPaymentAmounts: boolean = false;

    constructor(
        private _currencyService: CurrencyService,
        private _gendersService: GendersService,
        private _insurerService: InsurerService,
        private _insuranceService: InsuranceService,
        private _insuranceTypeService: InsuranceTypeService,
        private _datePipe: DatePipe,
        private _formBuilder: FormBuilder,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _policyService: PolicyService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.policyForm.controls;
    }

    get insureds(): FormArray {
        return this.policyForm.get('insureds') as FormArray;
    }

    addInsured(insured: Insured | null = null): void {
        this.insureds.push(this.newInsured(insured));
    }

    /**
     * Build the policy form
     */
    buildPolicyForm(policy: Policy | null = null): void {
        this.policyForm = this._formBuilder.group({
            policyFile: [''],
            policyNumber: [(!!policy && !!policy.policyNumber) ? policy.policyNumber : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            clientNumber: [(!!policy && !!policy.clientNumber) ? policy.clientNumber : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            insurerId: [(!!policy && !!policy.insurerId) ? policy.insurerId : '', [Validators.required] ],
            insuranceId: [(!!policy && !!policy.insuranceId) ? policy.insuranceId : '', [Validators.required] ],
            insuranceTypeId: [(!!policy && !!policy.insuranceTypeId) ? policy.insuranceTypeId : '', [Validators.required] ],
            titularName: [(!!policy && !!policy.titularName) ? policy.titularName : '', [Validators.required, Validators.minLength(TITULAR_NAME_LENGTH.MIN), Validators.maxLength(TITULAR_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
            titularRfc: [(!!policy && !!policy.titularRfc) ? policy.titularRfc : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            titularPostalCode: [(!!policy && !!policy.titularPostalCode) ? policy.titularPostalCode : '', [ValidatorsHelper.postalCode ] ],
            titularPhoneCodeId: [(!!policy && !!policy.titularPhoneCodeId) ? policy.titularPhoneCodeId : ''],
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
            paymentPlanId: [(!!policy && !!policy.paymentPlanId) ? policy.paymentPlanId : '', [Validators.required]],
            bills: [(!!policy && !!policy.bills) ? policy.bills : '', [Validators.required, ValidatorsHelper.number]],
            isAutoPayment: [(!!policy && !!policy.isAutoPayment && policy.isAutoPayment === '1') ? true : false],
            insureds: this._formBuilder.array([])
        });

        if(!!policy && !!policy.insureds && policy.insureds.length > 0) {
            for(let insured of policy.insureds) {
                this.addInsured(insured);
            }
        } else {
            this.addInsured();
        }
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
     * Check the policy amounts
     * @return True if the total policy is equal to the policy amount, otherwise false
     */
    checkPolicyAmounts(): boolean {
        this._areFractionatedPaymentAmounts = false;
        let netPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.netPay.value));
        let taxPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.taxPay.value));
        let feePay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.feePay.value));
        let coverPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.coverPay.value));
        let extraPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.extraPay.value));
        let totalPolicy: number = netPay + taxPay + feePay + coverPay + extraPay;
        const policyAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.policyAmount.value));

        if((totalPolicy >= (policyAmount - 1)) && (totalPolicy <= (policyAmount + 1))) {
            return true;
        } else {
            const paymentPlanId: number = (this.policy) ? this.policy.paymentPlanId : 0;
            const paymentPlanMonths: number = 12 / this._getPaymentPlanMonths(paymentPlanId);
            netPay *= paymentPlanMonths;
            taxPay *= paymentPlanMonths;
            feePay *= paymentPlanMonths;
            coverPay *= paymentPlanMonths;
            extraPay *= paymentPlanMonths;
            totalPolicy = netPay + taxPay + feePay + coverPay + extraPay;

            if((totalPolicy >= (policyAmount - 1)) && (totalPolicy <= (policyAmount + 1))) {
                this._areFractionatedPaymentAmounts = true;
                return true;
            }
        }
        return false;
    }

    disableFormFields(): void {
        this.f.validityStartDate.disable();
        this.f.validityEndDate.disable();
        this.f.netPay.disable();
        this.f.feePay.disable();
        this.f.coverPay.disable();
        this.f.extraPay.disable();
        this.f.taxPay.disable();
        this.f.policyAmount.disable();
        this.f.currencyId.disable();
        this.f.paymentMethodId.disable();
        this.f.paymentPlanId.disable();
        this.f.bills.disable();
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

    loadGenders(): void {
        const fields: string = 'genderId,name';
        this._gendersService.getGenders(fields).subscribe((res: HttpResponse) => {
            this.genders = res.data;
        });
    }

    /**
     * Load the insurers
     */
    loadInsuers(): void {
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
        const fields: string = 'policyId,insuranceId,insuranceName,insuranceIcon,insuranceBackground,policyStatusName,policyStatusBackground,insuranceTypeId,insuranceTypeName,insurerId,insurerName,policyUrl,policyNumber,clientNumber,emissionDate,validityStartDate,validityEndDate,titularName,titularRfc,titularPostalCode,titularPhoneCodeId,titularPhoneNumber,netPay,taxPay,feePay,coverPay,extraPay,policyAmount,currencyId,paymentMethodId,paymentPlanId,bills,receiptsPaid,totalEndorsements,isAutoPayment,insurerImageUrl,policyStatusDescription,lifeTime,insureds';
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

    newInsured(insured: Insured | null = null): FormGroup {
        let insuredForm: FormGroup;
        switch (this.policy!.insuranceId) {
            case INSURANCES.LIVE:
            case INSURANCES.RETIRE:
            case INSURANCES.HEALTH:
            case INSURANCES.ACCIDENTS:
            case INSURANCES.CARE:
            case INSURANCES.PETS:
            case INSURANCES.CRISIS:
            case INSURANCES.TRAVEL:
            case INSURANCES.DEATH:
            case INSURANCES.CREDIT:
            case INSURANCES.WARRANTY:
            case INSURANCES.SCHOOLAR:
            case INSURANCES.FIANCE:
                insuredForm = this._formBuilder.group({
                    personName: [(!!insured) ? insured.personName : '', [Validators.required, Validators.minLength(TITULAR_NAME_LENGTH.MIN), Validators.maxLength(TITULAR_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    personGenderId: [(!!insured) ? insured.personGenderId : ''],
                    personAge: [(!!insured) ? insured.personAge : '', [Validators.minLength(1), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeTextShort]]
                });
                break;

            case INSURANCES.CAR:
            case INSURANCES.MOTORBIKE:
            case INSURANCES.BIKE:
            case INSURANCES.TRUCK:
                insuredForm = this._formBuilder.group({
                    vehicleMaker: [(!!insured) ? insured.vehicleMaker : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    vehicleVersion: [(!!insured) ? insured.vehicleVersion : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    vehicleModel: [(!!insured) ? insured.vehicleModel : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    vehiclePlates: [(!!insured) ? insured.vehiclePlates : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    vehicleSerial: [(!!insured) ? insured.vehicleSerial : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    vehicleMotor: [(!!insured) ? insured.vehicleMotor : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                });
                break;

            case INSURANCES.HOME:
            case INSURANCES.BUILDING:
            case INSURANCES.FARM:
                insuredForm = this._formBuilder.group({
                    buildingName: [(!!insured) ? insured.buildingName : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    buildingUsage: [(!!insured) ? insured.buildingUsage : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    buildingLocation: [(!!insured) ? insured.buildingLocation : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
                });
                break;

            case INSURANCES.CIVIL:
            case INSURANCES.TECHNICAL:
            case INSURANCES.CAUTION:
            case INSURANCES.TRANSPORT:
            case INSURANCES.AERO:
                insuredForm = this._formBuilder.group({
                    objectName: [(!!insured) ? insured.objectName : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    objectUsage: [(!!insured) ? insured.objectUsage : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    objectDescription: [(!!insured) ? insured.objectDescription : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
                });
                break;

            default:
                insuredForm = this._formBuilder.group({
                    policyDetails: [(!!insured) ? insured.policyDetails : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
                });
                break;
        }

        if(!!insured) {
            insuredForm.addControl('policyInsuredId', new FormControl(insured.policyInsuredId));
        }
        return insuredForm;
    }

    removeInsured(insuredIndex: number): void {
        this.insureds.removeAt(insuredIndex);
    }

    updatePolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._policyService.updateContactPolicy(contactId, policyId, requestBody);
    }

    updateCompletePolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBodyCompletePolicy();
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
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('insurerId', this.f.insurerId.value);
        requestBody.append('insuranceId', this.f.insuranceId.value);
        requestBody.append('insuranceTypeId', this.f.insuranceTypeId.value);
        requestBody.append('emissionDate', this.f.emissionDate.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularPhoneCodeId', this.f.titularPhoneCodeId.value);
        requestBody.append('titularPhoneNumber', this.f.titularPhoneNumber.value);
        requestBody.append('isAutoPayment', (this.f.isAutoPayment.value) ? '1' : '0');

        const insureds: any[] = this.insureds.value;
        requestBody.append('insureds', JSON.stringify(insureds));

        return requestBody;
    }

    private _getRequestBodyCompletePolicy(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('policyFile', this.f.policyFile.value);
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('insurerId', this.f.insurerId.value);
        requestBody.append('insuranceId', this.f.insuranceId.value);
        requestBody.append('insuranceTypeId', this.f.insuranceTypeId.value);
        requestBody.append('emissionDate', this.f.emissionDate.value);
        requestBody.append('validityStartDate', this.f.validityStartDate.value);
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularPhoneCodeId', this.f.titularPhoneCodeId.value);
        requestBody.append('titularPhoneNumber', this.f.titularPhoneNumber.value);
        requestBody.append('netPay', this.f.netPay.value);
        requestBody.append('taxPay', this.f.taxPay.value);
        requestBody.append('feePay', this.f.feePay.value);
        requestBody.append('coverPay', this.f.coverPay.value);
        requestBody.append('extraPay', this.f.extraPay.value);
        requestBody.append('areFractionatedPaymentAmounts', (this._areFractionatedPaymentAmounts) ? '1' : '0');
        requestBody.append('policyAmount', this.f.policyAmount.value);
        requestBody.append('currencyId', this.f.currencyId.value);
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('bills', this.f.bills.value);
        requestBody.append('isAutoPayment', (this.f.isAutoPayment.value) ? '1' : '0');

        const insureds: any[] = this.insureds.value;
        requestBody.append('insureds', JSON.stringify(insureds));

        return requestBody;
    }
}
