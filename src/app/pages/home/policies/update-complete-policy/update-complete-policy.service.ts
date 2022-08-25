import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { FREE_TEXT_LENGTH, INSURANCES, TITULAR_NAME_LENGTH, INSURANCE_TYPES,
    LONG_ALPHANUMERIC_LENGTH, SHORT_ALPHANUMERIC_LENGTH, FILE_TYPES
} from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';

import { Currency } from '@interfaces/currency.interface';
import { Gender } from '@interfaces/gender.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Insured } from '@interfaces/insured.interface';
import { Insurer } from '@interfaces/insurer.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceType } from '@interfaces/insurance-type.interface';
import { Partner } from '@interfaces/partner.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@interfaces/policy.interface';

import { CurrencyService } from '@services/currency.service';
import { GendersService } from '@services/genders.service';
import { InsurerService } from '@services/insurer.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceTypeService } from '@services/insurance-type.service';
import { PartnerService } from '@services/partner.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';

declare var DropifyPlugin: any;

@Injectable()
export class UpdateCompletePolicyService {
    currencies: Currency[] = [];
    genders: Gender[] = [];
    insurers: Insurer[] = [];
    insurances: Insurance[] = [];
    insuranceTypes: InsuranceType[] = [];
    partners: Partner[] = [];
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];
    policy: Policy | null = null;
    policyForm: FormGroup = this._formBuilder.group({});
    private _areFractionatedPaymentAmounts: boolean = false;
    private _allowedFileTypes: string[] = ['pdf'];
    private _canShowPreview: boolean = true;
    private _maxFileSize: string = '2M';

    constructor(
        private _currencyService: CurrencyService,
        private _gendersService: GendersService,
        private _insurerService: InsurerService,
        private _insuranceService: InsuranceService,
        private _insuranceTypeService: InsuranceTypeService,
        private _datePipe: DatePipe,
        private _formBuilder: FormBuilder,
        private _partnerService: PartnerService,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _policyService: PolicyService,
        private _policyInsuredService: PolicyInsuredService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.policyForm.controls;
    }

    get insureds(): FormArray {
        return this.policyForm.get('insureds') as FormArray;
    }

    addInsured(insured: Insured | null = null): void {
        this.insureds.push(this.newInsured(insured));
        this.initDropifyPlugin();
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
            discount: [(!!policy && !!policy.discount) ? policy.discount : '', [Validators.required, ValidatorsHelper.amount] ],
            policyAmount: [(!!policy && !!policy.policyAmount) ? policy.policyAmount : '', [Validators.required, ValidatorsHelper.amount] ],
            currencyId: [(!!policy && !!policy.currencyId) ? policy.currencyId : '', [Validators.required]],
            paymentMethodId: [(!!policy && !!policy.paymentMethodId) ? policy.paymentMethodId : '', [Validators.required]],
            paymentPlanId: [(!!policy && !!policy.paymentPlanId) ? policy.paymentPlanId : '', [Validators.required]],
            bills: [(!!policy && !!policy.bills) ? policy.bills : '', [Validators.required, ValidatorsHelper.number]],
            isAutoPayment: [(!!policy && !!policy.isAutoPayment && policy.isAutoPayment === '1') ? true : false],
            partnerId: [(!!policy && !!policy.partnerId) ? policy.partnerId : '0'],
            insureds: this._formBuilder.array([])
        });

        if(!!policy) {
            if(policy.insuranceTypeId === INSURANCE_TYPES.FLOTILLA) {
                this.policyForm.addControl('description', new FormControl((policy.coveredProperty) ? policy.coveredProperty : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]));
            }

            if(!!policy.insureds && policy.insureds.length > 0) {
                for(let insured of policy.insureds) {
                    this.addInsured(insured);
                }
                if(policy.insuranceTypeId === INSURANCE_TYPES.FLOTILLA) {
                    this.policyForm.get('insureds')!.disable();
                }
            } else {
                this.addInsured();
            }
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
                    endDate.subtract(3, 'days');
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
        let discount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.discount.value));
        discount = (discount < 0) ? discount * (-1) : discount;
        let totalPolicy: number = netPay + taxPay + feePay + coverPay + extraPay - discount;
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
            totalPolicy = netPay + taxPay + feePay + coverPay + extraPay - discount;

            if((totalPolicy >= (policyAmount - 1)) && (totalPolicy <= (policyAmount + 1))) {
                this._areFractionatedPaymentAmounts = true;
                return true;
            }
        }
        return false;
    }

    deletePolicyInsured(contactId: string, policyId: string, insuredIndex: number): Observable<void> {
        const policyInsuredId: string = this.insureds.at(insuredIndex).get('policyInsuredId')!.value;
        return this._policyInsuredService.deletePolicyInsured(contactId, policyId, policyInsuredId).pipe(
            tap(() => {
                this.removeInsured(insuredIndex);
            })
        )
    }

    disableFormFields(): void {
        this.f.validityStartDate.disable();
        this.f.netPay.disable();
        this.f.feePay.disable();
        this.f.coverPay.disable();
        this.f.extraPay.disable();
        this.f.taxPay.disable();
        this.f.discount.disable();
        this.f.policyAmount.disable();
        this.f.currencyId.disable();
        this.f.paymentMethodId.disable();
        this.f.paymentPlanId.disable();
        this.f.bills.disable();
    }

    initDropifyPlugin(): void {
        setTimeout(() => {
            DropifyPlugin.init(FILE_TYPES.DOCUMENT, this._allowedFileTypes, this._canShowPreview, this._maxFileSize);
        }, 0);
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

    loadPartners(workspaceRealName: string): void {
        const fields: string = 'partnerId,name';
        const page: number = 1;
        const perPage: number = 1000;
        this._partnerService.getPartners(page, fields, '', '', perPage).subscribe((res: HttpResponse) => {
            this.partners = res.data.items;
            this._addWorkspaceRealNameToPartners(workspaceRealName);
        });
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
        const fields: string = 'policyId,insuranceId,insuranceName,insuranceIcon,insuranceBackground,policyStatusName,policyStatusBackground,insuranceTypeId,insuranceTypeName,insurerId,insurerName,policyUrl,policyNumber,clientNumber,emissionDate,validityStartDate,validityEndDate,titularName,titularRfc,titularPostalCode,titularPhoneCodeId,titularPhoneNumber,netPay,taxPay,feePay,coverPay,extraPay,discount,policyAmount,currencyId,paymentMethodId,paymentPlanId,bills,receiptsPaid,totalEndorsements,isAutoPayment,insurerImageUrl,policyStatusDescription,lifeTime,insureds,workspaceRealName,partnerId,coveredProperty';
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
                switch(this.f.insuranceTypeId.value) {
                    case INSURANCE_TYPES.FLOTILLA:
                        insuredForm = this._formBuilder.group({
                            vehicleNumber: [(!!insured && !!insured.vehicleNumber) ? insured.vehicleNumber : '', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleInternalNumber: [(!!insured && !!insured.vehicleInternalNumber) ? insured.vehicleInternalNumber : '', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleSubgroup: [(!!insured && !!insured.vehicleSubgroup) ? insured.vehicleSubgroup : '', [Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleType: [(!!insured && !!insured.vehicleType) ? insured.vehicleType : '', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleUnitType: [(!!insured && !!insured.vehicleUnitType) ? insured.vehicleUnitType : '', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleCargoTypeId: [(!!insured && !!insured.vehicleCargoTypeId) ? insured.vehicleCargoTypeId : ''],
                            vehicleCoverageId: [(!!insured && !!insured.vehicleCoverageId) ? insured.vehicleCoverageId : '', [Validators.required]],
                            vehicleUseId: [(!!insured && !!insured.vehicleUseId) ? insured.vehicleUseId : '', [Validators.required]],
                            vehicleAdaptation: [(!!insured && !!insured.vehicleAdaptation) ? insured.vehicleAdaptation : '', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleValidityStartDate: [(!!insured && !!insured.vehicleValidityStartDate) ? moment(insured.vehicleValidityStartDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : '', [Validators.required, ValidatorsHelper.date]],
                            vehicleMaker: [(!!insured && !!insured.vehicleMaker) ? insured.vehicleMaker : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleVersion: [(!!insured && !!insured.vehicleVersion) ? insured.vehicleVersion : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleModel: [(!!insured && !!insured.vehicleModel) ? insured.vehicleModel : '', [Validators.required, ValidatorsHelper.vehicleModel]],
                            vehiclePlates: [(!!insured && !!insured.vehiclePlates) ? insured.vehiclePlates : '', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleSerial: [(!!insured && !!insured.vehicleSerial) ? insured.vehicleSerial : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleMotor: [(!!insured && !!insured.vehicleMotor) ? insured.vehicleMotor : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleNetPay: [(!!insured && !!insured.vehicleNetPay) ? insured.vehicleNetPay : '0.00', [Validators.required, ValidatorsHelper.amount]],
                            vehicleFeePay: [(!!insured && !!insured.vehicleFeePay) ? insured.vehicleFeePay : '0.00', [ValidatorsHelper.amount]],
                            vehicleCoverPay: [(!!insured && !!insured.vehicleCoverPay) ? insured.vehicleCoverPay : '0.00', [ValidatorsHelper.amount]],
                            vehicleExtraPay: [(!!insured && !!insured.vehicleExtraPay) ? insured.vehicleExtraPay : '0.00', [ValidatorsHelper.amount]],
                            vehicleTaxPay: [(!!insured && !!insured.vehicleTaxPay) ? insured.vehicleTaxPay : '0.00', [ValidatorsHelper.amount]],
                            vehicleStatusId: [(!!insured && !!insured.vehicleStatusId) ? insured.vehicleStatusId : '1', [ValidatorsHelper.amount]],
                            insuredPolicyFile: [''],
                            policyUrl: [(!!insured && !!insured.policyUrl) ? insured.policyUrl : ''],
                        });
                    break;

                    default:
                        insuredForm = this._formBuilder.group({
                            vehicleMaker: [(!!insured && !!insured.vehicleMaker) ? insured.vehicleMaker : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleVersion: [(!!insured && !!insured.vehicleVersion) ? insured.vehicleVersion : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleModel: [(!!insured && !!insured.vehicleModel) ? insured.vehicleModel : '', [Validators.required, ValidatorsHelper.vehicleModel]],
                            vehiclePlates: [(!!insured && !!insured.vehiclePlates) ? insured.vehiclePlates : '', [Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleSerial: [(!!insured && !!insured.vehicleSerial) ? insured.vehicleSerial : '', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleMotor: [(!!insured && !!insured.vehicleMotor) ? insured.vehicleMotor : '', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                        });
                }
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
            case INSURANCES.TERRESTRIAL:
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

    replaceInsureds(): void {
        this.insureds.removeAt(0);
        this.addInsured();
    }

    updatePolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return new Observable((observer => {
            this._policyService.updateContactPolicy(contactId, policyId, requestBody).subscribe(() => {
                if(this._getTotalInsuredsToUpdate() > 0) {
                    const updateRequestBodies: FormData[] = this._generateUpdateRequestBodies();
                    this._policyInsuredService.updatePolicyInsureds(contactId, policyId, updateRequestBodies).subscribe(() => {
                        if(this._getTotalInsuredsToCreate() > 0) {
                            const createRequestBodies: FormData[] = this._generateCreateRequestBodies();
                            this._policyInsuredService.createPolicyInsured(contactId, policyId, createRequestBodies).subscribe(() => {
                                observer.next();
                                observer.complete();
                            });
                        } else {
                            observer.next();
                            observer.complete();
                        }
                    });
                } else {
                    observer.next();
                    observer.complete();
                }
            });
        }));
    }

    updateCompletePolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBodyCompletePolicy();
        return new Observable((observer => {
            this._policyService.updateCompletePolicy(contactId, policyId, requestBody).subscribe(() => {
                if(this._getTotalInsuredsToUpdate() > 0) {
                    const updateRequestBodies: FormData[] = this._generateUpdateRequestBodies();
                    this._policyInsuredService.updatePolicyInsureds(contactId, policyId, updateRequestBodies).subscribe(() => {
                        if(this._getTotalInsuredsToCreate() > 0) {
                            const createRequestBodies: FormData[] = this._generateCreateRequestBodies();
                            this._policyInsuredService.createPolicyInsured(contactId, policyId, createRequestBodies).subscribe(() => {
                                observer.next();
                                observer.complete();
                            });
                        } else {
                            observer.next();
                            observer.complete();
                        }
                    });
                } else {
                    observer.next();
                    observer.complete();
                }
            });
        }));
    }

    private _addWorkspaceRealNameToPartners(workspaceName: string): void {
        const partner: Partner = {
            partnerId: '0',
            name: workspaceName
        }
        this.partners.unshift(partner);
    }

    private _generateCreateRequestBodies(): FormData[] {
        let requests: FormData[] = [];
        const insureds: any[] = this.insureds.controls;
        for(let insured of insureds) {
            if(!(!!insured.value.policyInsuredId)) {
                const requestBody: FormData = this._getInsuredRequestBody(insured.value);
                requests.push(requestBody);
            }
        }
        return requests;
    }

    private _generateUpdateRequestBodies(): FormData[] {
        let requests: FormData[] = [];
        const insureds: any[] = this.insureds.controls;
        for(let insured of insureds) {
            if(insured.status === 'VALID' && !!insured.value.policyInsuredId) {
                const requestBody: FormData = this._getInsuredRequestBody(insured.value, true);
                requests.push(requestBody);
            }
        }
        return requests;
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

    private _getInsuredRequestBody(insured: any, isUpdated: boolean = false): FormData {
        const requestBody: FormData = new FormData();
        switch(this.policy!.insuranceId) {
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
                requestBody.append('personName', insured.personName);
                requestBody.append('personGenderId', insured.personGenderId);
                requestBody.append('personAge', insured.personAge);
                break;

            case INSURANCES.CAR:
            case INSURANCES.MOTORBIKE:
            case INSURANCES.BIKE:
                switch(this.policy!.insuranceTypeId) {
                    case INSURANCE_TYPES.FLOTILLA:
                        requestBody.append('vehicleNumber', insured.vehicleNumber);
                        requestBody.append('vehicleSubgroup', insured.vehicleSubgroup);
                        requestBody.append('vehicleType', insured.vehicleType);
                        requestBody.append('vehicleUnitType', insured.vehicleUnitType);
                        requestBody.append('vehicleCargoTypeId', insured.vehicleCargoTypeId);
                        requestBody.append('vehicleCoverageId', insured.vehicleCoverageId);
                        requestBody.append('vehicleUseId', insured.vehicleUseId);
                        requestBody.append('vehicleAdaptation', insured.vehicleAdaptation);
                        requestBody.append('vehicleValidityStartDate', insured.vehicleValidityStartDate);
                        requestBody.append('vehicleMaker', insured.vehicleMaker);
                        requestBody.append('vehicleVersion', insured.vehicleVersion);
                        requestBody.append('vehicleModel', insured.vehicleModel);
                        requestBody.append('vehiclePlates', insured.vehiclePlates);
                        requestBody.append('vehicleSerial', insured.vehicleSerial);
                        requestBody.append('vehicleMotor', insured.vehicleMotor);
                        requestBody.append('vehicleInternalNumber', insured.vehicleInternalNumber);
                        requestBody.append('vehicleNetPay', insured.vehicleNetPay);
                        requestBody.append('vehicleFeePay', insured.vehicleFeePay);
                        requestBody.append('vehicleCoverPay', insured.vehicleCoverPay);
                        requestBody.append('vehicleExtraPay', insured.vehicleExtraPay);
                        requestBody.append('vehicleTaxPay', insured.vehicleTaxPay);
                        requestBody.append('insuredPolicyFile', insured.insuredPolicyFile);
                        if(isUpdated) {
                            requestBody.append('vehicleStatusId', insured.vehicleStatusId);
                            requestBody.append('policyUrl', insured.policyUrl);
                        }
                    break;

                    default:
                        requestBody.append('vehicleMaker', insured.vehicleMaker);
                        requestBody.append('vehicleVersion', insured.vehicleVersion);
                        requestBody.append('vehicleModel', insured.vehicleModel);
                        requestBody.append('vehiclePlates', insured.vehiclePlates);
                        requestBody.append('vehicleSerial', insured.vehicleSerial);
                        requestBody.append('vehicleMotor', insured.vehicleMotor);
                }
                break;

            case INSURANCES.HOME:
            case INSURANCES.BUILDING:
            case INSURANCES.FARM:
                requestBody.append('buildingName', insured.buildingName);
                requestBody.append('buildingUsage', insured.buildingUsage);
                requestBody.append('buildingLocation', insured.buildingLocation);
                break;

            case INSURANCES.CIVIL:
            case INSURANCES.TECHNICAL:
            case INSURANCES.CAUTION:
            case INSURANCES.TERRESTRIAL:
            case INSURANCES.TRANSPORT:
            case INSURANCES.AERO:
                requestBody.append('objectName', insured.objectName);
                requestBody.append('objectUsage', insured.objectUsage);
                requestBody.append('objectDescription', insured.objectDescription);
                break;

            default:
                requestBody.append('policyDetails', insured.policyDetails);
                break;
        }

        if(isUpdated) {
            requestBody.append('policyInsuredId', insured.policyInsuredId);
        }
        return requestBody;
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
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularPhoneCodeId', this.f.titularPhoneCodeId.value);
        requestBody.append('titularPhoneNumber', this.f.titularPhoneNumber.value);
        requestBody.append('isAutoPayment', (this.f.isAutoPayment.value) ? '1' : '0');
        requestBody.append('partnerId', this.f.partnerId.value);

        if(this.f.insuranceTypeId.value == INSURANCE_TYPES.FLOTILLA) {
            requestBody.append('description', this.f.description.value);
        }

        return requestBody;
    }

    private _getRequestBodyCompletePolicy(): FormData {
        let discount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.discount.value));
        discount = (discount < 0) ? discount * (-1) : discount;
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
        requestBody.append('discount', discount.toString());
        requestBody.append('areFractionatedPaymentAmounts', (this._areFractionatedPaymentAmounts) ? '1' : '0');
        requestBody.append('policyAmount', this.f.policyAmount.value);
        requestBody.append('currencyId', this.f.currencyId.value);
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('bills', this.f.bills.value);
        requestBody.append('isAutoPayment', (this.f.isAutoPayment.value) ? '1' : '0');
        requestBody.append('partnerId', this.f.partnerId.value);

        if(this.f.insuranceTypeId.value == INSURANCE_TYPES.FLOTILLA) {
            requestBody.append('description', this.f.description.value);
        }

        return requestBody;
    }

    private _getTotalInsuredsToCreate(): number {
        let count: number = 0;
        const insureds: any[] = this.insureds.controls;
        for(let insured of insureds) {
            if(!(!!insured.value.policyInsuredId)) {
                count++;
            }
        }
        return count;
    }

    private _getTotalInsuredsToUpdate(): number {
        let count: number = 0;
        const insureds: any[] = this.insureds.controls;
        for(let insured of insureds) {
            if(insured.status === 'VALID' && !!insured.value.policyInsuredId) {
                count++;
            }
        }
        return count;
    }
}
