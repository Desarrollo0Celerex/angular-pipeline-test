import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as moment from 'moment';

import { FREE_TEXT_LENGTH, TITULAR_NAME_LENGTH, POLICY_SOURCES, ROLES, SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY,
    SLACK_DAYS_TO_LOAD_A_EXPIRED_POLICY, DEFAULT_PAYMENT_METHOD_ID, INSURANCE_TYPES, SHORT_ALPHANUMERIC_LENGTH,
    LONG_ALPHANUMERIC_LENGTH, FILE_TYPES, INSURANCE_GROUPS, CONTACT_TYPES, EMAIL_LENGTH, AGENT_NUMBER_LENGTH
} from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';

import { Currency } from '@interfaces/currency.interface';
import { CreateScannerLogDataSend } from '@interfaces/create-scanner-log-data-send.interface';
import { Gender } from '@interfaces/gender.interface';
import { HttpError } from '@interfaces/http-error.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Insured } from '@interfaces/insured.interface';
import { Partner } from '@interfaces/partner.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@interfaces/policy.interface';

import { AuthService } from '@services/auth.service';
import { AtomScannService } from '@services/atom-scann.service';
import { CurrencyService } from '@services/currency.service';
import { GendersService } from '@services/genders.service';
import { PartnerService } from '@services/partner.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';
import { ScannerLogService } from '@services/scanner-log.service';

declare var DropifyPlugin: any;

@Injectable()
export class CompletePolicyService {
    currencies: Currency[] = [];
    genders: Gender[] = [];
    partners: Partner[] = [];
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];
    policy: Policy | null = null;
    policyForm: FormGroup = this._formBuilder.group({});;
    private _areFractionatedPaymentAmounts: boolean = false;
    private _allowedFileTypes: string[] = ['pdf'];
    private _canShowPreview: boolean = true;
    private _maxFileSize: string = '2M';

    constructor(
        private _authService: AuthService,
        private _atomScannService: AtomScannService,
        private _currencyService: CurrencyService,
        private _datePipe: DatePipe,
        private _formBuilder: FormBuilder,
        private _gendersService: GendersService,
        private _partnerService: PartnerService,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _policyService: PolicyService,
        private _policyInsuredService: PolicyInsuredService,
        private _scannerLogService: ScannerLogService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.policyForm.controls;
    }

    get insureds(): FormArray {
        return this.policyForm.get('insureds') as FormArray;
    }

    addInsured(insured: Insured | null = null): void {
        this.insureds.push(this.newInsured(insured));
        this._initDropifyPlugin();
    }

    /**
     * Build the policy form
     */
    buildPolicyForm(policy: Policy | null = null): void {
        const canDisableBills: boolean = (!!this.policy && !!this.policy.policySourceId && this.policy.policySourceId == POLICY_SOURCES.HISTORY) ? true : false;
        const currencyId: string | number = (!!policy && !!policy.currencyId) ? policy.currencyId : (!!this.policy && !!this.policy.workspaceCurrencyId) ? this.policy.workspaceCurrencyId : '';
        this.policyForm = this._formBuilder.group({
            policyFile: [''],
            policyNumber: [(!!policy && !!policy.policyNumber) ? policy.policyNumber : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            clientNumber: [(!!policy && !!policy.clientNumber) ? policy.clientNumber : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            titularName: [(!!policy && !!policy.titularName) ? policy.titularName : '', [Validators.required, Validators.minLength(TITULAR_NAME_LENGTH.MIN), Validators.maxLength(TITULAR_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
            titularRfc: [(!!policy && !!policy.titularRfc) ? policy.titularRfc : '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            titularEmail: [(!!policy && !!policy.titularEmail) ? policy.titularEmail : '', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)] ],
            titularPostalCode: [(!!policy && !!policy.titularPostalCode) ? policy.titularPostalCode : '', [ValidatorsHelper.postalCode ] ],
            titularPhoneCodeId: [(!!this.policy && !!this.policy.workspaceCountryId) ? this.policy.workspaceCountryId : ''],
            titularPhoneNumber: [(!!policy && !!policy.titularPhoneNumber) ? policy.titularPhoneNumber : '', [ValidatorsHelper.phoneNumber] ],
            emissionDate: [(!!policy && !!policy.emissionDate) ? policy.emissionDate : '', [Validators.required, ValidatorsHelper.date] ],
            validityStartDate: [(!!policy && !!policy.validityStartDate) ? policy.validityStartDate : '', [Validators.required, ValidatorsHelper.date] ],
            validityEndDate: [(!!policy && !!policy.validityEndDate) ? policy.validityEndDate : '', [Validators.required, ValidatorsHelper.date] ],
            netPay: [(!!policy && !!policy.netPay) ? policy.netPay : '0.00', [Validators.required, ValidatorsHelper.amount] ],
            taxPay: [(!!policy && !!policy.taxPay) ? policy.taxPay : '0.00', [Validators.required, ValidatorsHelper.amount] ],
            feePay: [(!!policy && !!policy.feePay) ? policy.feePay : '0.00', [Validators.required, ValidatorsHelper.amount] ],
            coverPay: [(!!policy && !!policy.coverPay) ? policy.coverPay : '0.00', [Validators.required, ValidatorsHelper.amount] ],
            extraPay: [(!!policy && !!policy.extraPay) ? policy.extraPay : '0.00', [Validators.required, ValidatorsHelper.amount] ],
            discount: [(!!policy && !!policy.discount) ? policy.discount : '0.00', [Validators.required, ValidatorsHelper.amount] ],
            policyAmount: [(!!policy && !!policy.policyAmount) ? policy.policyAmount : '0.00', [Validators.required, ValidatorsHelper.amount] ],
            currencyId: [currencyId, [Validators.required]],
            paymentMethodId: [(!!policy && !!policy.paymentMethodId) ? policy.paymentMethodId : DEFAULT_PAYMENT_METHOD_ID, [Validators.required]],
            paymentPlanId: [(!!policy && !!policy.paymentPlanId) ? policy.paymentPlanId : '', [Validators.required]],
            bills: [{value: '', disabled: canDisableBills}, [Validators.required, ValidatorsHelper.number]],
            isAutoPayment: [false],
            partnerId: [0, [Validators.required]],
            agentNumber: [(!!policy && !!policy.agentNumber && policy.agentNumber.length >= AGENT_NUMBER_LENGTH.MIN && policy.agentNumber.length <= AGENT_NUMBER_LENGTH.MAX) ? policy.agentNumber : (!!this.policy && !!this.policy.workspaceAgentNumber) ? this.policy.workspaceAgentNumber : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
            policyCommission: ['', [Validators.required, ValidatorsHelper.percentage]],
            policyCommissionAmount: ['', [Validators.required, ValidatorsHelper.amount] ],
            insureds: this._formBuilder.array([])
        });

        if(this.policy!.contactTypeId === CONTACT_TYPES.PERSON) {
            this.policyForm.addControl('titularAge', new FormControl((!!policy && !!policy.titularAge) ? policy.titularAge : '', [ValidatorsHelper.number]));
            this.policyForm.addControl('titularGenderId', new FormControl((!!policy && !!policy.titularGenderId) ? policy.titularGenderId : '', [Validators.required, ValidatorsHelper.number]));
        }

        if(this.policy!.insuranceTypeId === INSURANCE_TYPES.FLOTILLA) {
            this.policyForm.addControl('description', new FormControl('', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]))
        }

        if(!!this.policy && !!this.policy.workspaceCommission) {
            this.policyForm.patchValue({
                policyCommission: this.policy.workspaceCommission
            });
            this.calculatePolicyCommissionAmount(this.policy.workspaceCommission);
        }

        const insured: Insured | null = (!!policy && !!policy.insureds && policy.insureds.length > 0) ? policy.insureds[0] : null;
        this.addInsured(insured);
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

    calculatePolicyCommission(amount: any): void {
        let policyCommission: number = 0;
        const policyCommissionAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(amount));
        if(policyCommissionAmount > 0) {
            const policyAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.policyAmount.value));
            if(policyAmount > 0) {
                policyCommission = UtilitiesHelper.getQuantityWithOnlyTwoDecimals(policyCommissionAmount * 100 / policyAmount);
            }
        }
        this.policyForm.patchValue({policyCommission});
    }

    calculatePolicyCommissionAmount(percentage: any): void {
        let policyCommissionAmount: number = 0;
        const policyCommission: number = parseFloat(percentage);
        if(policyCommission > 0) {
            const policyAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.policyAmount.value));
            if(policyAmount > 0) {
                policyCommissionAmount = UtilitiesHelper.getQuantityWithOnlyTwoDecimals(policyCommission * policyAmount / 100);
            }
        }
        this.policyForm.patchValue({policyCommissionAmount});
    }

    checkIsNewPolicy(): boolean {
        return (!!this.policy && !!this.policy.policySourceId && this.policy.policySourceId == POLICY_SOURCES.NEW) ? true : false;
    }

    checkIsHistoryPolicy(): boolean {
        return (!!this.policy && !!this.policy.policySourceId && this.policy.policySourceId == POLICY_SOURCES.HISTORY) ? true : false;
    }

    checkIsValidHistoryPolicy(): boolean {
        if(!!this.policy && !!this.policy.maxValidityEndDate) {
            return moment(this.f.validityEndDate.value, 'DD/MM/YYYY').isSameOrBefore(this.policy.maxValidityEndDate);
        }
        return false;
    }

    checkIsExpiredPolicy(): boolean {
        return moment(this.f.validityEndDate.value, 'DD/MM/YYYY').isBefore(moment().format('YYYY/MM/DD'))
    }

    checkIsValidExpiredPolicy(): boolean {
        const slackDaysToRenewOrReissuePolicy: number = (this._authService.roleId == ROLES.GLOBAL_ADMIN) ? SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY.GLOBAL_ADMIN : SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY.OTHERS;
        const slackDaysToLoadExpiredPolicy: number = slackDaysToRenewOrReissuePolicy - SLACK_DAYS_TO_LOAD_A_EXPIRED_POLICY;
        const minValidityEndDate: any = moment().subtract(slackDaysToLoadExpiredPolicy, 'days');
        return moment(this.f.validityEndDate.value, 'DD/MM/YYYY').isSameOrAfter(minValidityEndDate.format('YYYY/MM/DD')) ? true : false;
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
        let totalPolicyWithoutDiscount: number = netPay + taxPay + feePay + coverPay + extraPay;
        const policyAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.policyAmount.value));

        if(
            (totalPolicy >= (policyAmount - 1)) && (totalPolicy <= (policyAmount + 1)) ||
            (totalPolicyWithoutDiscount >= (policyAmount - 1)) && (totalPolicyWithoutDiscount <= (policyAmount + 1))
        ) {
            return true;
        } else {
            const paymentPlanMonths: number = 12 / this._getPaymentPlanMonths(this.f.paymentPlanId.value);
            netPay *= paymentPlanMonths;
            taxPay *= paymentPlanMonths;
            feePay *= paymentPlanMonths;
            coverPay *= paymentPlanMonths;
            extraPay *= paymentPlanMonths;
            totalPolicy = netPay + taxPay + feePay + coverPay + extraPay - discount;
            totalPolicyWithoutDiscount = netPay + taxPay + feePay + coverPay + extraPay;

            if(
                (totalPolicy >= (policyAmount - 1)) && (totalPolicy <= (policyAmount + 1)) ||
                (totalPolicyWithoutDiscount >= (policyAmount - 1)) && (totalPolicyWithoutDiscount <= (policyAmount + 1))
            ) {
                this._areFractionatedPaymentAmounts = true;
                return true;
            }
        }
        return false;
    }

    /**
     * Complete the policy data
     * @param  contactId The contact ID
     * @param  policyId  The policy ID to complete
     * @return           Notice of action done
     */
    completePolicy(contactId: string, policyId: string, scannedPolicyData: Policy | null): Observable<void> {
        const requestBody: FormData = this._getRequestBody(scannedPolicyData);
        return new Observable((observer => {
            this._policyService.completePolicy(contactId, policyId, requestBody).subscribe(() => {
                const requestBodies: FormData[] = this._generateRequestBodies();
                this._policyInsuredService.createPolicyInsured(contactId, policyId, requestBodies).subscribe(() => {
                    observer.next();
                    observer.complete();
                });
            }, (error: HttpError) => {
                observer.error(error);
                observer.complete();
            });
        }));
    }

    /**
     * Create the scanner log
     * @param  contactId          The contact ID
     * @param  policyId           The policy ID
     * @param  totalMissingFields The total missing fields
     * @param  missingFields      The missing fields
     * @return                    Notice of action done
     */
    createScannerLog(contactId: string, policyId: string, policyUrl: string, totalMissingFields: number, missingFields: string): Observable<void> {
        const requestBody: CreateScannerLogDataSend = {
            insurerId: !!this.policy ? this.policy.insurerId : 0,
            insuranceId: !!this.policy ? this.policy.insuranceId : 0,
            insuranceTypeId: !!this.policy ? this.policy.insuranceTypeId : 0,
            totalMissingFields,
            missingFields,
            policyUrl
        };
        return this._scannerLogService.createScannerLog(contactId, policyId, requestBody);
    }

    deletePolicy(contactId: string, policyId: string): Observable<void> {
        return this._policyService.deleteIncompletePolicy(contactId, policyId);
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
     * get the contact policy
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          The policy data
     */
    getContactPolicy(contactId: string, policyId: string): Observable<HttpResponse> {
        this.policy = null;
        const fields: string = 'policyId,insuranceId,insuranceName,insuranceIcon,insuranceBackground,policyStatusName,policyStatusBackground,insuranceTypeId,insuranceTypeName,insurerId,insurerName,policyUrl,policyNumber,clientNumber,emissionDate,validityStartDate,validityEndDate,titularName,titularRfc,titularPostalCode,titularPhoneNumber,netPay,taxPay,feePay,coverPay,extraPay,policyAmount,currencyId,paymentMethodId,paymentPlanId,bills,policySourceId,maxValidityEndDate,basePolicyId,baseContactId,workspaceCountryId,insurerImageUrl,policyStatusDescription,lifeTime,workspaceCountryId,discount,workspaceCurrencyId,workspaceRealName,insuranceGroupId,contactName,contactTypeId,workspaceCommission,workspaceAgentNumber';
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
     * get the base policy of the contact
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          The policy data
     */
    getContactBasePolicy(contactId: string, policyId: string): Observable<HttpResponse> {
        const fields: string = 'policyNumber,clientNumber,emissionDate,validityStartDate,validityEndDate,titularName,titularRfc,titularPostalCode,titularPhoneNumber';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            map(( res: HttpResponse) => {
                    res.data.emissionDate = moment(res.data.emissionDate, 'YYYY-MM-DD').add(1, 'years').format('DD/MM/YYYY');
                    res.data.validityStartDate = moment(res.data.validityStartDate, 'YYYY-MM-DD').add(1, 'years').format('DD/MM/YYYY');
                    res.data.validityEndDate = moment(res.data.validityEndDate, 'YYYY-MM-DD').add(1, 'years').format('DD/MM/YYYY');
                    res.data.policyNumber = this._calculateNewPolicyNumber(res.data.policyNumber);
                return res;
            })
        )
    }

    /**
     * Load the currencies
     * @return Notice of action done
     */
    loadCurrencies(): void {
        const fields: string = 'currencyId,name';
        this._currencyService.getCurrencies(fields).subscribe((res: HttpResponse) => {
            this.currencies = res.data;
        });
    }

    loadGenders(): void {
        const fields: string = 'genderId,name';
        this._gendersService.getGenders(fields).subscribe((res: HttpResponse) => {
            this.genders = res.data;
        });
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
    loadPaymentMethods(): void {
        const fields: string = 'paymentMethodId,name';
        this._paymentMethodService.getPaymentMethods(fields).subscribe((res: HttpResponse) => {
            this.paymentMethods = res.data;
        });
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

    getPolicyTitularInfo(contactId: string, titularMissingFields: string[]): Observable<HttpResponse> {
        const fields: string = titularMissingFields.join(',');
        return this._policyService.getPolicyTitularInfo(contactId, fields);
    }

    newInsured(insured: Insured | null): FormGroup {
        let insuredForm: FormGroup;
        switch (this.policy!.insuranceGroupId) {
            case INSURANCE_GROUPS.PEOPLE:
                insuredForm = this._formBuilder.group({
                    personName: [(!!insured && !!insured.personName) ? insured.personName : '', [Validators.required, Validators.minLength(TITULAR_NAME_LENGTH.MIN), Validators.maxLength(TITULAR_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    personGenderId: [(!!insured && !!insured.personGenderId) ? insured.personGenderId : ''],
                    personAge: [(!!insured && !!insured.personAge) ? insured.personAge : '', [Validators.minLength(1), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeTextShort]]
                });
                break;

            case INSURANCE_GROUPS.VEHICLES:
                switch(this.policy!.insuranceTypeId) {
                    case INSURANCE_TYPES.FLOTILLA:
                        insuredForm = this._formBuilder.group({
                            vehicleNumber: ['', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleValidityStartDate: ['', [Validators.required, ValidatorsHelper.date]],
                            vehicleMaker: ['', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(50), ValidatorsHelper.alphanumeric]],
                            vehicleVersion: ['', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.freeText]],
                            vehicleModel: ['', [Validators.required, ValidatorsHelper.vehicleModel]],
                            vehiclePlates: ['', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleSerial: ['', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.alphanumeric]],
                            vehicleMotor: ['', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.alphanumeric]],
                            vehicleCoverageId: ['', [Validators.required]],
                            vehicleUseId: ['', [Validators.required]],
                            vehicleNetPay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
                            vehicleFeePay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
                            vehicleCoverPay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
                            vehicleTaxPay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
                            vehicleExtraPay: ['0.00', [Validators.required, ValidatorsHelper.amount]],
                            vehicleDiscount: ['0.00', [Validators.required, ValidatorsHelper.amount]],
                            vehicleTotalAmount: ['0.00', [Validators.required, ValidatorsHelper.amount]],
                            vehicleInternalNumber: ['', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(75), ValidatorsHelper.alphanumeric]],
                            vehicleSubgroup: ['', [Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleType: ['', [Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleUnitType: ['', [Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleCargoTypeId: [''],
                            vehicleAdaptation: ['', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(150), ValidatorsHelper.freeText]],
                            insuredPolicyFile: ['']
                        });
                    break;

                    default:
                        insuredForm = this._formBuilder.group({
                            vehicleMaker: [(!!insured && !!insured.vehicleMaker) ? insured.vehicleMaker : '', [Validators.required, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(50), ValidatorsHelper.alphanumeric]],
                            vehicleVersion: [(!!insured && !!insured.vehicleVersion) ? insured.vehicleVersion : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.freeText]],
                            vehicleModel: [(!!insured && !!insured.vehicleModel) ? insured.vehicleModel : '', [Validators.required, ValidatorsHelper.vehicleModel]],
                            vehiclePlates: [(!!insured && !!insured.vehiclePlates) ? insured.vehiclePlates : '', [Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]],
                            vehicleSerial: [(!!insured && !!insured.vehicleSerial) ? insured.vehicleSerial : '', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.alphanumeric]],
                            vehicleMotor: [(!!insured && !!insured.vehicleMotor) ? insured.vehicleMotor : '', [Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(100), ValidatorsHelper.alphanumeric]],
                        });
                }
                break;

            case INSURANCE_GROUPS.BUILDINGS:
                insuredForm = this._formBuilder.group({
                    buildingName: [(!!insured && !!insured.buildingName) ? insured.buildingName : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    buildingUsage: [(!!insured && !!insured.buildingUsage) ? insured.buildingUsage : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    buildingLocation: [(!!insured && !!insured.buildingLocation) ? insured.buildingLocation : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
                });
                break;

            case INSURANCE_GROUPS.MERCHANDISE:
            case INSURANCE_GROUPS.OBJECTS:
            case INSURANCE_GROUPS.RC:
                insuredForm = this._formBuilder.group({
                    objectName: [(!!insured && !!insured.objectName) ? insured.objectName : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    objectUsage: [(!!insured && !!insured.objectUsage) ? insured.objectUsage : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                    objectDescription: [(!!insured && !!insured.objectDescription) ? insured.objectDescription : '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
                });
                break;

            default:
                insuredForm = this._formBuilder.group({
                    policyDetails: ['', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
                });
                break;
        }
        return insuredForm;
    }

    removeInsured(insuredIndex: number): void {
        this.insureds.removeAt(insuredIndex);
    }

    scannPolicy(policyFile: any): Observable<HttpResponse> {
        const requestBody: FormData = this._getRequestBodyToScannPolicy(policyFile);
        return this._atomScannService.scannPolicy(requestBody);
    }

    private _addWorkspaceRealNameToPartners(workspaceName: string): void {
        const partner: Partner = {
            partnerId: '0',
            name: workspaceName
        }
        this.partners.unshift(partner);
    }

    private _calculateNewPolicyNumber(policyNumber: string): string {
        const lastChart: number =  parseInt(policyNumber.substring(policyNumber.length - 1));
        if(Number.isInteger(lastChart)) {
            const newPolicyNumber: string = policyNumber.substring(0, policyNumber.length - 1) + (lastChart + 1);
            return newPolicyNumber;
        }
        return policyNumber;
    }

    private _generateRequestBodies(): FormData[] {
        let requests: FormData[] = [];
        const insureds: any[] = this.insureds.controls;
        for(let insured of insureds) {
            const requestBody: FormData = this._getInsuredRequestBody(insured.value);
            requests.push(requestBody);
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

    private _getInsuredRequestBody(insured: any): FormData {
        const requestBody: FormData = new FormData();
        switch(this.policy!.insuranceGroupId) {
            case INSURANCE_GROUPS.PEOPLE:
                requestBody.append('personName', insured.personName);
                requestBody.append('personGenderId', insured.personGenderId);
                requestBody.append('personAge', insured.personAge);
                break;

            case INSURANCE_GROUPS.VEHICLES:
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
                        requestBody.append('vehicleTotalAmount', insured.vehicleTotalAmount);
                        requestBody.append('vehicleTaxPay', insured.vehicleTaxPay);
                        requestBody.append('vehicleExtraPay', insured.vehicleExtraPay);
                        requestBody.append('vehicleDiscount', insured.vehicleDiscount);
                        requestBody.append('insuredPolicyFile', insured.insuredPolicyFile);
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

            case INSURANCE_GROUPS.BUILDINGS:
                requestBody.append('buildingName', insured.buildingName);
                requestBody.append('buildingUsage', insured.buildingUsage);
                requestBody.append('buildingLocation', insured.buildingLocation);
                break;

            case INSURANCE_GROUPS.MERCHANDISE:
            case INSURANCE_GROUPS.OBJECTS:
            case INSURANCE_GROUPS.RC:
                requestBody.append('objectName', insured.objectName);
                requestBody.append('objectUsage', insured.objectUsage);
                requestBody.append('objectDescription', insured.objectDescription);
                break;

            default:
                requestBody.append('policyDetails', insured.policyDetails);
                break;
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
    private _getRequestBody(scannedPolicyData: Policy | null): FormData {
        let discount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.discount.value));
        discount = (discount < 0) ? discount * (-1) : discount;
        const requestBody: FormData = new FormData();
        requestBody.append('policyFile', this.f.policyFile.value);
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('emissionDate', this.f.emissionDate.value);
        requestBody.append('validityStartDate', this.f.validityStartDate.value);
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularEmail', this.f.titularEmail.value);
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
        requestBody.append('agentNumber', this.f.agentNumber.value);
        requestBody.append('policyCommission', this.f.policyCommission.value);
        requestBody.append('policyCommissionAmount', this.f.policyCommissionAmount.value);

        if(!!scannedPolicyData) {
            requestBody.append('policyPlan', scannedPolicyData.policyPlan);
        }
        if(this.policy!.contactTypeId === CONTACT_TYPES.PERSON) {
            requestBody.append('titularGenderId', this.f.titularGenderId.value);
            requestBody.append('titularAge', this.f.titularAge.value);
        }
        if(this.policy!.insuranceTypeId === INSURANCE_TYPES.FLOTILLA) {
            requestBody.append('description', this.f.description.value);
        }
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
            requestBody.append('countryId', this.policy.workspaceCountryId.toString());
            requestBody.append('insurerId', this.policy.insurerId.toString());
            requestBody.append('insuranceId', this.policy.insuranceId.toString());
            requestBody.append('insuranceTypeId', this.policy.insuranceTypeId.toString());
        }
        return requestBody;
    }

    private _initDropifyPlugin(): void {
        setTimeout(() => {
            DropifyPlugin.init(FILE_TYPES.DOCUMENT, this._allowedFileTypes, this._canShowPreview, this._maxFileSize);
        }, 0);
    }
}
