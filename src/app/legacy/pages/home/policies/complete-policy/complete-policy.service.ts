import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as moment from 'moment';

import {
    FREE_TEXT_LENGTH,
    TITULAR_NAME_LENGTH,
    POLICY_SOURCES,
    ROLES,
    SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY,
    SLACK_DAYS_TO_LOAD_A_EXPIRED_POLICY,
    DEFAULT_PAYMENT_METHOD_ID,
    INSURANCE_TYPES,
    SHORT_ALPHANUMERIC_LENGTH,
    LONG_ALPHANUMERIC_LENGTH,
    INSURANCE_GROUPS,
    CONTACT_TYPES,
    EMAIL_LENGTH,
    AGENT_NUMBER_LENGTH,
    INSURANCES,
    MULTITEXT_LENGTH,
} from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';

import { PolicyInsuredHelper } from '@helpers/policy-insured-helper';
import { Currency } from '@interfaces/currency.interface';
import { CreateScannerLogDataSend } from '@interfaces/create-scanner-log-data-send.interface';
import { Gender } from '@interfaces/gender.interface';
import { HttpError } from '@interfaces/http-error.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Insured } from '@interfaces/insured.interface';
import { Partner } from '@interfaces/partner.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@core/interfaces/policy.interface';

import { AuthService } from '@features-legacy/auth/services/auth.service';
import { AtomScannService } from '@services/atom-scann.service';
import { ContactService } from '@core/services/contact/contact.service';
import { CurrencyService } from '@services/currency.service';
import { GendersService } from '@services/genders.service';
import { PartnerService } from '@services/partner.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';
import { ScannerLogService } from '@services/scanner-log.service';
import { Contact } from '@core/interfaces/contact.interface';
import { RewriteField } from '@policy/interfaces/rewrite-field.interface';
import { SellerCommissionSuggestionService } from '@seller-commission-suggestions/services/seller-commission-suggestion.service';
import { TuneatorService } from '@services/tuneator.service';
import { InsurerService } from '@services/insurer.service';
import { Insurer } from '@interfaces/insurer.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceType } from '@interfaces/insurance-type.interface';
import { InsuranceGroupService } from '@services/insurance-group.service';
import { InsuranceTypeService } from '@services/insurance-type.service';
import { InsuranceService } from '@services/insurance.service';
import { CalculateFirstPaymentAmount } from '@core/interfaces/calculate-first-payment-amount.interface';

declare var DropifyPlugin: any;

@Injectable()
export class CompletePolicyService {
    contactFieldsToRewrite: string[] = [];
    currencies: Currency[] = [];
    genders: Gender[] = [];
    insurers: Insurer[] = [];
    insurances: Insurance[] = [];
    insuranceTypes: InsuranceType[] = [];
    partners: Partner[] = [];
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];
    policy: any | null | Policy = null;
    policyForm: FormGroup = this._formBuilder.group({});
    private _areFractionatedPaymentAmounts: boolean = false;
    private _allowedFileTypes: string[] = ['pdf'];
    private _canShowPreview: boolean = true;
    private _maxFileSize: string = '2M';
    private _titularBirthdate: string = '';

    constructor(
        private _authService: AuthService,
        private _atomScannService: AtomScannService,
        private _contactService: ContactService,
        private _currencyService: CurrencyService,
        private _datePipe: DatePipe,
        private _formBuilder: FormBuilder,
        private _gendersService: GendersService,
        private _insuranceService: InsuranceService,
        private _insurerService: InsurerService,
        private _insuranceGroupService: InsuranceGroupService,
        private _insuranceTypeService: InsuranceTypeService,
        private _partnerService: PartnerService,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _policyService: PolicyService,
        private _policyInsuredService: PolicyInsuredService,
        private _scannerLogService: ScannerLogService,
        private _sellerCommissionSuggestionService: SellerCommissionSuggestionService,
        private _tuneatorService: TuneatorService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.policyForm.controls;
    }

    get insureds(): FormArray {
        return this.policyForm.get('insureds') as FormArray;
    }

    addInsured(insured: Insured | null = null): void {
        this.insureds.push(this.newInsured(insured));
        this.initDropifyPlugin();
    }

    addPolicyCover(policyUrl: string): Observable<any> {
        return this._tuneatorService.addPolicyCover(policyUrl);
    }

    addPolicyCoverByFile(file: any): Observable<any> {
        const requestBody: FormData = new FormData();
        requestBody.append('file', file);
        return this._tuneatorService.addPolicyCoverByFile(requestBody);
    }

    /**
     * Build the policy form
     */
    buildPolicyForm(policy: Policy | null = null): void {
        const canDisableBills: boolean =
            !!this.policy &&
            !!this.policy.policySourceId &&
            this.policy.policySourceId == POLICY_SOURCES.HISTORY
                ? true
                : false;
        const currencyId: string | number =
            !!policy && !!policy.currencyId
                ? policy.currencyId
                : !!this.policy && !!this.policy.workspaceCurrencyId
                ? this.policy.workspaceCurrencyId
                : '';
        const titularPhoneCodeId: number =
            !!policy && policy.titularPhoneCodeId
                ? policy.titularPhoneCodeId
                : !!this.policy && !!this.policy.workspaceCountryId
                ? this.policy.workspaceCountryId
                : 0;

        this.policyForm = this._formBuilder.group({
            policyFile: [''],
            policyNumber: [
                !!policy && !!policy.policyNumber ? policy.policyNumber : '',
                [
                    Validators.required,
                    Validators.minLength(FREE_TEXT_LENGTH.MIN),
                    Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                    ValidatorsHelper.freeText,
                ],
            ],
            clientNumber: [
                !!policy && !!policy.clientNumber ? policy.clientNumber : '',
                [
                    Validators.required,
                    Validators.minLength(FREE_TEXT_LENGTH.MIN),
                    Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                    ValidatorsHelper.freeText,
                ],
            ],
            insurerId: [
                !!this.policy && !!this.policy.insurerId
                    ? this.policy.insurerId
                    : '',
                [Validators.required],
            ],
            insuranceId: [
                !!this.policy && !!this.policy.insuranceId
                    ? this.policy.insuranceId
                    : '',
                [Validators.required],
            ],
            insuranceTypeId: [
                !!this.policy && !!this.policy.insuranceTypeId
                    ? this.policy.insuranceTypeId
                    : '',
                [Validators.required],
            ],
            comments: [
                '',
                [
                    Validators.minLength(MULTITEXT_LENGTH.MIN),
                    Validators.maxLength(MULTITEXT_LENGTH.MAX),
                    ValidatorsHelper.multitext,
                ],
            ],
            policyPlan: [
                !!policy && !!policy.policyPlan ? policy.policyPlan : '',
                [
                    Validators.required,
                    Validators.minLength(FREE_TEXT_LENGTH.MIN),
                    Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                    ValidatorsHelper.freeText,
                ],
            ],
            titularName: [
                !!policy && !!policy.titularName ? policy.titularName : '',
                [
                    Validators.required,
                    Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                    Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                    ValidatorsHelper.ownName,
                ],
            ],
            titularRfc: [
                !!policy && !!policy.titularRfc ? policy.titularRfc : '',
                [
                    Validators.minLength(FREE_TEXT_LENGTH.MIN),
                    Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                    ValidatorsHelper.freeText,
                ],
            ],
            titularEmail: [
                !!policy && !!policy.titularEmail ? policy.titularEmail : '',
                [
                    Validators.email,
                    Validators.minLength(EMAIL_LENGTH.MIN),
                    Validators.maxLength(EMAIL_LENGTH.MAX),
                ],
            ],
            titularPostalCode: [
                !!policy && !!policy.titularPostalCode
                    ? policy.titularPostalCode
                    : '',
                [ValidatorsHelper.postalCode],
            ],
            titularPhoneCodeId: [titularPhoneCodeId],
            titularPhoneNumber: [
                !!policy && !!policy.titularPhoneNumber
                    ? policy.titularPhoneNumber
                    : '',
                [ValidatorsHelper.phoneNumber],
            ],
            emissionDate: [
                !!policy && !!policy.emissionDate
                    ? moment(policy.emissionDate, 'DD/MM/YYYY')
                    : '',
                [Validators.required, ValidatorsHelper.datePicker],
            ],
            validityStartDate: [
                !!policy && !!policy.validityStartDate
                    ? moment(policy.validityStartDate, 'DD/MM/YYYY')
                    : '',
                [Validators.required, ValidatorsHelper.datePicker],
            ],
            validityEndDate: [
                !!policy && !!policy.validityEndDate
                    ? moment(policy.validityEndDate, 'DD/MM/YYYY')
                    : '',
                [Validators.required, ValidatorsHelper.datePicker],
            ],
            netPay: [
                !!policy && !!policy.netPay ? policy.netPay : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            taxPay: [
                !!policy && !!policy.taxPay ? policy.taxPay : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            feePay: [
                !!policy && !!policy.feePay ? policy.feePay : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            coverPay: [
                !!policy && !!policy.coverPay ? policy.coverPay : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            noTaxPay: [
                !!policy && !!policy.noTaxPay ? policy.noTaxPay : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            extraPay: [
                !!policy && !!policy.extraPay ? policy.extraPay : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            discount: [
                !!policy && !!policy.discount ? policy.discount : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            policyAmount: [
                !!policy && !!policy.policyAmount
                    ? policy.policyAmount
                    : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            currencyId: [currencyId, [Validators.required]],
            hasTaxReceipt: [
                !!policy &&
                !!policy.hasTaxReceipt &&
                policy.hasTaxReceipt === '1'
                    ? true
                    : false,
            ],
            paymentMethodId: [
                !!policy && !!policy.paymentMethodId
                    ? policy.paymentMethodId
                    : DEFAULT_PAYMENT_METHOD_ID,
                [Validators.required],
            ],
            paymentPlanId: [
                !!policy && !!policy.paymentPlanId ? policy.paymentPlanId : '',
                [Validators.required],
            ],
            bills: [
                { value: '', disabled: canDisableBills },
                [Validators.required, ValidatorsHelper.number],
            ],
            firstReceiptAmount: [
                !!policy && !!policy.firstReceiptAmount
                    ? policy.firstReceiptAmount
                    : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            subsequentReceiptsAmount: [
                !!policy && !!policy.subsequentReceiptsAmount
                    ? policy.subsequentReceiptsAmount
                    : '0.00',
                [Validators.required, ValidatorsHelper.amount],
            ],
            firstReceiptGracePeriod: [
                policy?.firstReceiptGracePeriod || 0,
                [Validators.required],
            ],
            subsequentReceiptsGracePeriod: [
                policy?.subsequentReceiptsGracePeriod || 0,
                [Validators.required],
            ],
            isAutoPayment: [
                !!policy &&
                !!policy.isAutoPayment &&
                policy.isAutoPayment === '1'
                    ? true
                    : false,
            ],
            accountNumber: [
                '',
                [
                    Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN),
                    Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX),
                    ValidatorsHelper.alphanumeric,
                ],
            ],
            cardNumber: [
                '',
                [
                    Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN),
                    Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX),
                    ValidatorsHelper.alphanumeric,
                ],
            ],
            bankName: [
                '',
                [
                    Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                    Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                    ValidatorsHelper.ownName,
                ],
            ],
            agentName: [
                this.policy.agentNameSuggestion || '',
                [
                    Validators.required,
                    Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                    Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                    ValidatorsHelper.ownName,
                ],
            ],
            agentKey: [
                !!policy &&
                !!policy.agentKey &&
                policy.agentKey.length >= AGENT_NUMBER_LENGTH.MIN &&
                policy.agentKey.length <= AGENT_NUMBER_LENGTH.MAX
                    ? policy.agentKey
                    : !!this.policy && !!this.policy.agentKeySuggestion
                    ? this.policy.agentKeySuggestion
                    : '',
                [
                    Validators.required,
                    Validators.minLength(FREE_TEXT_LENGTH.MIN),
                    Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                    ValidatorsHelper.freeText,
                ],
            ],
            agentCommissionPercentage: [
                0,
                [Validators.required, ValidatorsHelper.percentage],
            ],
            agentCommissionAmount: [
                0,
                [Validators.required, ValidatorsHelper.amount],
            ],
            agentCommissionCurrencyId: [currencyId, [Validators.required]],
            agentCommissionPeriod: [1],
            partnerId: [0, [Validators.required]],
            consultingCostPercentage: [
                0,
                [Validators.required, ValidatorsHelper.percentage],
            ],
            consultingCostAmount: [
                0,
                [Validators.required, ValidatorsHelper.amount],
            ],
            consultingCostCurrencyId: [
                this.policy.workspaceCurrencyId,
                [Validators.required],
            ],
            sellerCommissionPercentage: [
                0,
                [Validators.required, ValidatorsHelper.percentage],
            ],
            sellerCommissionAmount: [
                0,
                [Validators.required, ValidatorsHelper.amount],
            ],
            sellerCommissionCurrencyId: [currencyId, [Validators.required]],
            sellerCommissionPeriod: [1],
            insureds: this._formBuilder.array([]),
        });

        if (this.policy !== null) {
            if (!!this.policy.contactTypeId) {
                if (this.policy.contactTypeId === CONTACT_TYPES.PERSON) {
                    this.policyForm.addControl(
                        'titularAge',
                        new FormControl(
                            !!policy && !!policy.titularAge
                                ? policy.titularAge
                                : '',
                            [ValidatorsHelper.number]
                        )
                    );
                    this.policyForm.addControl(
                        'titularGenderId',
                        new FormControl(
                            !!policy && !!policy.titularGenderId
                                ? policy.titularGenderId
                                : '',
                            [ValidatorsHelper.number]
                        )
                    );
                } else {
                    this.policyForm.addControl(
                        'titularLegalRepresentative',
                        new FormControl(
                            !!policy && !!policy.titularLegalRepresentative
                                ? policy.titularLegalRepresentative
                                : '',
                            [
                                Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                                Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                                ValidatorsHelper.ownName,
                            ]
                        )
                    );
                }
            }

            if (!!this.policy.agentPercentageSuggestion) {
                this.policyForm.patchValue({
                    agentCommissionPercentage:
                        this.policy.agentPercentageSuggestion,
                });
                this.calculatePolicyCommissionAmount(
                    this.policy.agentPercentageSuggestion
                );
            }

            if (!!this.policy.insuranceTypeId) {
                const areSeveralInsured: boolean =
                    PolicyInsuredHelper.checkAreSeveralInsured(
                        this.policy.insuranceTypeId
                    );
                if (!areSeveralInsured) {
                    const insured: Insured | null =
                        !!policy &&
                        !!policy.insureds &&
                        policy.insureds.length > 0
                            ? policy.insureds[0]
                            : null;
                    this.addInsured(insured);
                }
            }
        }
    }

    resetFormInsureds(): void {
        this.policyForm.patchValue({ insureds: this._formBuilder.array([]) });
    }

    /**
     * Calculate the bills
     */
    calculateBills(): void {
        if (this.f.validityStartDate.value && this.f.validityEndDate.value) {
            let bills: number = 0;
            const validityStartDate: string =
                this.f.validityStartDate.value.format('DD/MM/YYYY');
            const validityEndDate: string =
                this.f.validityEndDate.value.format('DD/MM/YYYY');
            if (!!validityStartDate && !!validityEndDate) {
                const paymentPlanMonths: number = this._getPaymentPlanMonths(
                    this.f.paymentPlanId.value
                );
                // If it is an one-time payment
                if (paymentPlanMonths === 0) {
                    this.policyForm.patchValue({ bills: 1 });
                } else {
                    const startDate = moment(validityStartDate, 'DD-MM-YYYY');
                    const endDate = moment(validityEndDate, 'DD/MM/YYYY');
                    // If the end date is major than the start date
                    if (endDate.isAfter(startDate)) {
                        endDate.subtract(3, 'days');
                        while (startDate.isBefore(endDate)) {
                            bills++;
                            startDate.add(paymentPlanMonths, 'month');
                        }
                        this.policyForm.patchValue({ bills });
                    } else {
                        this.policyForm.patchValue({ bills: '' });
                    }
                }
            }
        }
    }

    calculateCoverPay(): void {
        this.policyForm.patchValue({
            coverPay: this.policy?.coverPaySuggestion || '0.00',
        });
    }

    calculateFirstPaymentAmount(): void {
        // TODO: Will be used in the feature
        //let firstReceiptAmount = this.f.firstReceiptAmount.value;
        //if (firstReceiptAmount == 0) {
        const paymentPlanReceipts = UtilitiesHelper.getPaymentPlanReceipts(
            this.f.paymentPlanId.value,
            this.paymentPlans
        );
        const data: CalculateFirstPaymentAmount = {
            paymentPlanReceips: paymentPlanReceipts,
            netPay: this.f.netPay.value,
            feePay: this.f.feePay.value,
            coverPay: this.f.coverPay.value,
            noTaxPay: this.f.noTaxPay.value,
            extraPay: this.f.extraPay.value,
            taxPay: this.f.taxPay.value,
            discount: this.f.discount.value,
        };
        const firstReceiptAmount =
            UtilitiesHelper.calculateFirstPaymentAmount(data);
        //}

        this.policyForm.patchValue({
            firstReceiptAmount: firstReceiptAmount
                ? UtilitiesHelper.getQuantityWithOnlyTwoDecimals(
                      firstReceiptAmount
                  )
                : '0.00',
        });
    }

    calculatePolicyAmount(): void {
        const netPay = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.netPay.value || 0)
        );
        const feePay = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.feePay.value || 0)
        );
        const coverPay = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.coverPay.value || 0)
        );
        const noTaxPay = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.noTaxPay.value || 0)
        );
        const extraPay = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.extraPay.value || 0)
        );
        const taxPay = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.taxPay.value || 0)
        );
        const discount = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.discount.value || 0)
        );

        const policyAmount = UtilitiesHelper.getQuantityWithOnlyTwoDecimals(
            netPay + feePay + coverPay + noTaxPay + extraPay + taxPay - discount
        );
        this.policyForm.patchValue({ policyAmount });
    }

    calculateTaxPay(): void {
        if (
            this.policy!.insuranceId !== INSURANCES.LIVE &&
            this.policy!.insuranceId !== INSURANCES.RETIRE
        ) {
            const netPay = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(
                    this.f.netPay.value || 0
                )
            );
            const feePay = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(
                    this.f.feePay.value || 0
                )
            );
            const coverPay = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(
                    this.f.coverPay.value || 0
                )
            );
            const extraPay = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(
                    this.f.extraPay.value || 0
                )
            );
            const subTotal = netPay + feePay + coverPay + extraPay;
            const taxPay = UtilitiesHelper.getQuantityWithOnlyTwoDecimals(
                (subTotal * this.policy!.countryTaxRate) / 100
            );
            this.policyForm.patchValue({ taxPay });
        }
    }

    calculatePolicyCommissionAmount(percentage: any): void {
        let agentCommissionAmount: number = 0;
        const agentCommissionPercentage: number = parseFloat(percentage);
        if (agentCommissionPercentage > 0) {
            const netPay: number = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(this.f.netPay.value)
            );
            let feePay: number = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(this.f.feePay.value)
            );
            feePay = feePay ? feePay : 0;
            if (netPay > 0) {
                agentCommissionAmount =
                    UtilitiesHelper.getQuantityWithOnlyTwoDecimals(
                        (agentCommissionPercentage * (netPay + feePay)) / 100
                    );
            }
        }
        this.policyForm.patchValue({ agentCommissionAmount });
    }

    calculateConsultingCostAmount(percentage: any): void {
        let consultingCostAmount: number = 0;
        const consultingCostPercentage: number = parseFloat(percentage);
        if (consultingCostPercentage > 0) {
            const policyAmount: number = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(
                    this.f.policyAmount.value
                )
            );
            if (policyAmount > 0) {
                consultingCostAmount =
                    UtilitiesHelper.getQuantityWithOnlyTwoDecimals(
                        (consultingCostPercentage * policyAmount) / 100
                    );
            }
        }
        this.policyForm.patchValue({ consultingCostAmount });
    }

    calculateSellerCommissionAmount(percentage: any): void {
        let sellerCommissionAmount: number = 0;
        const sellerCommissionPercentage: number = parseFloat(percentage);
        if (sellerCommissionPercentage > 0) {
            const netPay: number = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(this.f.netPay.value)
            );
            let feePay: number = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(this.f.feePay.value)
            );
            feePay = feePay ? feePay : 0;
            if (netPay > 0) {
                sellerCommissionAmount =
                    UtilitiesHelper.getQuantityWithOnlyTwoDecimals(
                        (sellerCommissionPercentage * (netPay + feePay)) / 100
                    );
            }
        }
        this.policyForm.patchValue({ sellerCommissionAmount });
    }

    checkIsNewPolicy(): boolean {
        return !!this.policy &&
            !!this.policy.policySourceId &&
            this.policy.policySourceId == POLICY_SOURCES.NEW
            ? true
            : false;
    }

    checkIsHistoryPolicy(): boolean {
        return !!this.policy &&
            !!this.policy.policySourceId &&
            this.policy.policySourceId == POLICY_SOURCES.HISTORY
            ? true
            : false;
    }

    checkIsValidHistoryPolicy(): boolean {
        if (!!this.policy && !!this.policy.maxValidityEndDate) {
            return this.f.validityEndDate.value.isSameOrBefore(
                this.policy.maxValidityEndDate
            );
        }
        return false;
    }

    checkIsExpiredPolicy(): boolean {
        return this.f.validityEndDate.value.isBefore(
            moment().format('YYYY/MM/DD')
        );
    }

    checkIsValidExpiredPolicy(): boolean {
        const slackDaysToRenewOrReissuePolicy: number =
            this._authService.roleId == ROLES.GLOBAL_ADMIN
                ? SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY.GLOBAL_ADMIN
                : SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY.OTHERS;
        const slackDaysToLoadExpiredPolicy: number =
            slackDaysToRenewOrReissuePolicy -
            SLACK_DAYS_TO_LOAD_A_EXPIRED_POLICY;
        const minValidityEndDate: any = moment().subtract(
            slackDaysToLoadExpiredPolicy,
            'days'
        );
        return this.f.validityEndDate.value.isSameOrAfter(
            minValidityEndDate.format('YYYY/MM/DD')
        )
            ? true
            : false;
    }

    /**
     * Check the policy amounts
     * @return True if the total policy is equal to the policy amount, otherwise false
     */
    checkPolicyAmounts(): boolean {
        this._areFractionatedPaymentAmounts = false;
        let netPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.netPay.value)
        );
        let taxPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.taxPay.value)
        );
        let feePay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.feePay.value)
        );
        let coverPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.coverPay.value)
        );
        let noTaxPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.noTaxPay.value)
        );
        let extraPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.extraPay.value)
        );
        let discount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.discount.value)
        );
        discount = discount < 0 ? discount * -1 : discount;
        let totalPolicy: number =
            netPay +
            taxPay +
            feePay +
            coverPay +
            noTaxPay +
            extraPay -
            discount;
        let totalPolicyWithoutDiscount: number =
            netPay + taxPay + feePay + coverPay + noTaxPay + extraPay;
        const policyAmount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.policyAmount.value)
        );

        if (
            (totalPolicy >= policyAmount - 1 &&
                totalPolicy <= policyAmount + 1) ||
            (totalPolicyWithoutDiscount >= policyAmount - 1 &&
                totalPolicyWithoutDiscount <= policyAmount + 1)
        ) {
            return true;
        } else {
            const paymentPlanMonths: number =
                12 / this._getPaymentPlanMonths(this.f.paymentPlanId.value);
            netPay *= paymentPlanMonths;
            taxPay *= paymentPlanMonths;
            feePay *= paymentPlanMonths;
            coverPay *= paymentPlanMonths;
            noTaxPay *= paymentPlanMonths;
            extraPay *= paymentPlanMonths;
            totalPolicy =
                netPay +
                taxPay +
                feePay +
                coverPay +
                noTaxPay +
                extraPay -
                discount;
            totalPolicyWithoutDiscount =
                netPay + taxPay + feePay + coverPay + noTaxPay + extraPay;

            if (
                (totalPolicy >= policyAmount - 1 &&
                    totalPolicy <= policyAmount + 1) ||
                (totalPolicyWithoutDiscount >= policyAmount - 1 &&
                    totalPolicyWithoutDiscount <= policyAmount + 1)
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
    completePolicy(contactId: string, policyId: string): Observable<Policy> {
        const requestBody: FormData = this._getRequestBody();
        return new Observable<Policy>((observer) => {
            this._policyService
                .completePolicy(contactId, policyId, requestBody)
                .subscribe(
                    (policy) => {
                        const requestBodies: FormData[] =
                            this._generateRequestBodies();
                        if (requestBodies.length > 0) {
                            this._policyInsuredService
                                .createPolicyInsureds(
                                    contactId,
                                    policyId,
                                    requestBodies
                                )
                                .subscribe(() => {
                                    observer.next(policy);
                                    observer.complete();
                                });
                        } else {
                            observer.next(policy);
                            observer.complete();
                        }
                    },
                    (error: HttpError) => {
                        observer.error(error);
                        observer.complete();
                    }
                );
        });
    }

    /**
     * Create the scanner log
     * @param  contactId          The contact ID
     * @param  policyId           The policy ID
     * @param  totalMissingFields The total missing fields
     * @param  missingFields      The missing fields
     * @return                    Notice of action done
     */
    createScannerLog(
        contactId: string,
        policyId: string,
        policyUrl: string,
        totalMissingFields: number,
        missingFields: string
    ): Observable<void> {
        const requestBody: CreateScannerLogDataSend = {
            insurerId: !!this.policy ? this.policy.insurerId : 0,
            insuranceId: !!this.policy ? this.policy.insuranceId : 0,
            insuranceTypeId: !!this.policy ? this.policy.insuranceTypeId : 0,
            totalMissingFields,
            missingFields,
            policyUrl,
        };
        return this._scannerLogService.createScannerLog(
            contactId,
            policyId,
            requestBody
        );
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

    generateContactFieldsToRewrite(
        titularBirthdate: string | null
    ): RewriteField[] {
        let values: RewriteField[] = [];
        let fields = [
            {
                key: 'Rfc',
                name: 'Identificación',
            },
            {
                key: 'PostalCode',
                name: 'Código Postal',
            },
            {
                key: 'Email',
                name: 'Correo',
            },
            {
                key: 'PhoneCodeId',
                name: 'Código del Teléfono',
            },
            {
                key: 'PhoneNumber',
                name: 'Teléfono',
            },
        ];

        if (this.policy.contactTypeId === CONTACT_TYPES.PERSON) {
            fields.push({
                key: 'GenderId',
                name: 'Género',
            });
        }
        for (let field of fields) {
            const policyValue =
                this.policyForm.controls['titular' + field.key].value;
            const profileValue = this.policy
                ? this.policy['contact' + field.key]
                : '';
            if (policyValue && policyValue != profileValue) {
                values.push({
                    fieldKey: UtilitiesHelper.toLowerCaseFirst(field.key),
                    fieldName: field.name,
                    currentValue: profileValue,
                    newValue: policyValue,
                    canRewrite: true,
                });
            }
        }

        const phoneCodeIdIndex = this._getIndexFromArray('phoneCodeId', values);

        if (phoneCodeIdIndex > -1) {
            const phoneNumberIndex = this._getIndexFromArray(
                'phoneNumber',
                values
            );
            if (phoneNumberIndex === -1) {
                values = this._deleteElementFromArray(phoneCodeIdIndex, values);
            }
        }

        if (titularBirthdate !== null) {
            if (this.policy['contactBirthdate'] !== titularBirthdate) {
                values.push({
                    fieldKey: 'birthdate',
                    fieldName: 'Fecha de nacimiento',
                    currentValue: this.policy['contactBirthdate'],
                    newValue: titularBirthdate,
                    canRewrite: true,
                });
                this._titularBirthdate = titularBirthdate;
            }
        }
        return values;
    }

    private _deleteElementFromArray(
        index: number,
        data: RewriteField[]
    ): RewriteField[] {
        data.splice(index, 1);
        return data;
    }

    private _getIndexFromArray(key: string, data: RewriteField[]): number {
        return data.findIndex(
            (element: RewriteField) => element.fieldKey === key
        );
    }

    getContact(contactId: string): Observable<Policy> {
        const fields: string =
            'contactName,birthdate,genderId,postalCode,email,phoneCodeId,phoneNumber,rfc';
        return this._contactService.getContact(contactId, fields).pipe(
            map((res: Contact) => {
                const contact: Contact = res;
                let policy: any = {
                    titularName: contact.contactName,
                    titularRfc: contact.rfc,
                    titularPostalCode: contact.postalCode,
                    titularEmail: contact.email,
                    titularPhoneCodeId: contact.phoneCodeId,
                    titularPhoneNumber: contact.phoneNumber,
                };
                if (
                    this.policy !== null &&
                    this.policy.contactTypeId === CONTACT_TYPES.PERSON
                ) {
                    policy = {
                        ...policy,
                        titularAge: UtilitiesHelper.calculateAge(
                            contact.birthdate
                        ),
                        titularGenderId: contact.genderId,
                    };
                }
                return policy;
            })
        );
    }

    /**
     * get the contact policy
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          The policy data
     */
    getContactPolicy(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        this.policy = null;
        const fields: string =
            'policyId,contactId,insuranceId,insuranceName,insuranceIcon,insuranceBackground,policyStatusName,policyStatusBackground,insuranceTypeId,insuranceTypeName,insurerId,insurerName,policyUrl,policyNumber,clientNumber,emissionDate,validityStartDate,validityEndDate,titularName,titularLegalRepresentative,titularRfc,titularPostalCode,titularPhoneNumber,netPay,taxPay,feePay,coverPay,noTaxPay,extraPay,policyAmount,currencyId,hasTaxReceipt,paymentMethodId,paymentPlanId,bills,firstReceiptAmount,subsequentReceiptsAmount,firstReceiptGracePeriod,subsequentReceiptsGracePeriod,policySourceId,maxValidityEndDate,basePolicyId,baseContactId,workspaceCountryId,insurerImageUrl,policyStatusDescription,lifeTime,discount,workspaceCurrencyId,workspaceRealName,insuranceGroupId,contactName,contactTypeId,agentPercentageSuggestion,agentNameSuggestion,agentKeySuggestion,countryTaxRate,coverPaySuggestion,contactRfc,contactGenderId,contactPostalCode,contactEmail,contactPhoneCodeId,contactPhoneNumber,contactBirthdate';
        return this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .pipe(
                tap((res: HttpResponse) => {
                    this.policy = res.data;
                    if (!!this.policy) {
                        this.policy.emissionDate = this._getDateFormat(
                            this.policy.emissionDate
                        );
                        this.policy.validityStartDate = this._getDateFormat(
                            this.policy.validityStartDate
                        );
                        this.policy.validityEndDate = this._getDateFormat(
                            this.policy.validityEndDate
                        );
                    }
                })
            );
    }

    /**
     * get the base policy of the contact
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          The policy data
     */
    getContactBasePolicy(
        fields: string,
        contactId: string,
        policyId: string
    ): Observable<Policy> {
        return this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .pipe(
                map((res: HttpResponse) => {
                    const policy: Policy = res.data;
                    policy.emissionDate = moment(
                        policy.emissionDate,
                        'YYYY-MM-DD'
                    )
                        .add(1, 'years')
                        .format('DD/MM/YYYY');
                    policy.validityStartDate = moment(
                        policy.validityStartDate,
                        'YYYY-MM-DD'
                    )
                        .add(1, 'years')
                        .format('DD/MM/YYYY');
                    policy.validityEndDate = moment(
                        policy.validityEndDate,
                        'YYYY-MM-DD'
                    )
                        .add(1, 'years')
                        .format('DD/MM/YYYY');
                    policy.policyNumber = this._calculateNewPolicyNumber(
                        policy.policyNumber
                    );

                    policy.titularName = !!policy.titularName
                        ? policy.titularName
                        : !!policy.contactName
                        ? policy.contactName
                        : '';
                    policy.titularRfc = !!policy.titularRfc
                        ? policy.titularRfc
                        : !!policy.contactRfc
                        ? policy.contactRfc
                        : '';
                    policy.titularPostalCode = !!policy.titularPostalCode
                        ? policy.titularPostalCode
                        : !!policy.contactPostalCode
                        ? policy.contactPostalCode
                        : '';
                    policy.titularEmail = !!policy.titularEmail
                        ? policy.titularEmail
                        : !!policy.contactEmail
                        ? policy.contactEmail
                        : '';
                    policy.titularPhoneCodeId = !!policy.titularPhoneCodeId
                        ? policy.titularPhoneCodeId
                        : !!policy.contactPhoneCodeId
                        ? policy.contactPhoneCodeId
                        : 0;
                    policy.titularPhoneNumber = !!policy.titularPhoneNumber
                        ? policy.titularPhoneNumber
                        : !!policy.contactPhoneNumber
                        ? policy.contactPhoneNumber
                        : '';

                    if (
                        this.policy !== null &&
                        this.policy.contactTypeId === CONTACT_TYPES.PERSON
                    ) {
                        if (!!!policy.titularAge) {
                            const contactAge: number | null =
                                !!policy.contactBirthdate
                                    ? UtilitiesHelper.calculateAge(
                                          policy.contactBirthdate
                                      )
                                    : null;
                            policy.titularAge =
                                contactAge !== null ? contactAge : 0;
                        }

                        if (!!!policy.titularGenderId) {
                            policy.titularGenderId = !!policy.contactGenderId
                                ? policy.contactGenderId
                                : 0;
                        }
                    }
                    return policy;
                })
            );
    }

    getPolicyRenewed(
        fields: string,
        contactId: string,
        policyId: string
    ): Observable<Policy> {
        return this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .pipe(
                map((res: HttpResponse) => {
                    return res.data;
                })
            );
    }

    loadCountryInsurers(countryId: number): Observable<void> {
        const fields: string = 'insurerId,name';
        return this._insurerService.getCountryInsurers(countryId, fields).pipe(
            tap((res: HttpResponse) => {
                this.insurers = res.data;
            }),
            map(() => {})
        );
    }

    /**
     * Load the currencies
     * @return Notice of action done
     */
    loadCurrencies(): void {
        const fields: string = 'currencyId,name';
        this._currencyService
            .getCurrencies(fields)
            .subscribe((res: HttpResponse) => {
                this.currencies = res.data;
            });
    }

    loadGenders(): void {
        const fields: string = 'genderId,name';
        this._gendersService
            .getGenders(fields)
            .subscribe((res: HttpResponse) => {
                this.genders = res.data;
            });
    }

    loadInsuranceGroupIdByInsuranceId(insuranceId: number): Observable<void> {
        return this._insuranceGroupService
            .getInsuranceGroupIdByInsuranceId(insuranceId)
            .pipe(
                tap((res: number) => {
                    this.policy!.insuranceGroupId = res;
                }),
                map(() => {})
            );
    }

    loadPartners(): void {
        const fields: string = 'partnerId,name';
        const page: number = 1;
        const perPage: number = 1000;
        this._partnerService
            .getPartners(page, fields, '', '', perPage)
            .subscribe((res: HttpResponse) => {
                this.partners = res.data.items;
            });
    }

    /**
     * Load the payment methods
     * @return Notice of action done
     */
    loadPaymentMethods(): void {
        const fields: string = 'paymentMethodId,name';
        this._paymentMethodService
            .getPaymentMethods(fields)
            .subscribe((res: HttpResponse) => {
                this.paymentMethods = res.data;
            });
    }

    /**
     * Load the payment plans
     * @return Notice of action done
     */
    loadPaymentPlans(): Observable<void> {
        const fields: string = 'paymentPlanId,name,months,receipts';
        return this._paymentPlanService.getPaymentPlans(fields).pipe(
            tap((res: HttpResponse) => {
                this.paymentPlans = res.data;
            }),
            map(() => {})
        );
    }

    patchForm(formData: Object): void {
        this.policyForm.patchValue(formData);
    }

    loadSellerPercentageSuggestion(sellerId: number): void {
        const fields = 'percentage';
        this._sellerCommissionSuggestionService
            .getSellerCommissionSuggestion(
                sellerId,
                this.policy!.insurerId,
                this.policy!.insuranceId,
                this.policy!.insuranceTypeId,
                fields
            )
            .subscribe({
                next: (data) => {
                    this.policyForm.patchValue({
                        sellerCommissionPercentage: data.percentage,
                    });
                    this.calculateSellerCommissionAmount(data.percentage);
                },
                error: () => {
                    this.policyForm.patchValue({
                        sellerCommissionPercentage: 0,
                        sellerCommissionAmount: 0,
                    });
                },
            });
    }

    getPolicyTitularInfo(
        contactId: string,
        titularMissingFields: string[]
    ): Observable<HttpResponse> {
        const fields: string = titularMissingFields.join(',');
        return this._policyService.getPolicyTitularInfo(contactId, fields);
    }

    newInsured(insured: Insured | null): FormGroup {
        let insuredForm: FormGroup;
        switch (this.policy!.insuranceGroupId) {
            case INSURANCE_GROUPS.PEOPLE:
                insuredForm = this._formBuilder.group({
                    personName: [
                        !!insured && !!insured.personName
                            ? insured.personName
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                            Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                            ValidatorsHelper.ownName,
                        ],
                    ],
                    personGenderId: [
                        !!insured && !!insured.personGenderId
                            ? insured.personGenderId
                            : '',
                    ],
                    personAge: [
                        !!insured && !!insured.personAge
                            ? insured.personAge
                            : '',
                        [ValidatorsHelper.number],
                    ],
                });
                break;

            case INSURANCE_GROUPS.VEHICLES:
                insuredForm = this._formBuilder.group({
                    vehicleMaker: [
                        !!insured && !!insured.vehicleMaker
                            ? insured.vehicleMaker
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(50),
                            ValidatorsHelper.alphanumeric,
                        ],
                    ],
                    vehicleVersion: [
                        !!insured && !!insured.vehicleVersion
                            ? insured.vehicleVersion
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(100),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    vehicleModel: [
                        !!insured && !!insured.vehicleModel
                            ? insured.vehicleModel
                            : '',
                        [Validators.required, ValidatorsHelper.vehicleModel],
                    ],
                    vehiclePlates: [
                        !!insured && !!insured.vehiclePlates
                            ? insured.vehiclePlates
                            : '',
                        [
                            Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX),
                            ValidatorsHelper.alphanumeric,
                        ],
                    ],
                    vehicleSerial: [
                        !!insured && !!insured.vehicleSerial
                            ? insured.vehicleSerial
                            : '',
                        [
                            Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(100),
                            ValidatorsHelper.alphanumeric,
                        ],
                    ],
                    vehicleMotor: [
                        !!insured && !!insured.vehicleMotor
                            ? insured.vehicleMotor
                            : '',
                        [
                            Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(100),
                            ValidatorsHelper.alphanumeric,
                        ],
                    ],
                });
                break;

            case INSURANCE_GROUPS.BUILDINGS:
                insuredForm = this._formBuilder.group({
                    buildingName: [
                        !!insured && !!insured.buildingName
                            ? insured.buildingName
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    buildingUsage: [
                        !!insured && !!insured.buildingUsage
                            ? insured.buildingUsage
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    buildingLocation: [
                        !!insured && !!insured.buildingLocation
                            ? insured.buildingLocation
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                });
                break;

            case INSURANCE_GROUPS.MERCHANDISE:
            case INSURANCE_GROUPS.OBJECTS:
            case INSURANCE_GROUPS.RC:
                insuredForm = this._formBuilder.group({
                    objectName: [
                        !!insured && !!insured.objectName
                            ? insured.objectName
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    objectUsage: [
                        !!insured && !!insured.objectUsage
                            ? insured.objectUsage
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    objectDescription: [
                        !!insured && !!insured.objectDescription
                            ? insured.objectDescription
                            : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                });
                break;

            default:
                insuredForm = this._formBuilder.group({
                    policyDetails: [
                        '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                });
                break;
        }
        return insuredForm;
    }

    removeInsured(insuredIndex: number): void {
        this.insureds.removeAt(insuredIndex);
    }

    scannPolicy(policyFile: any): Observable<HttpResponse> {
        const requestBody: FormData =
            this._getRequestBodyToScannPolicy(policyFile);
        return this._atomScannService.scannPolicy(requestBody);
    }

    private _calculateNewPolicyNumber(policyNumber: string): string {
        const lastChart: number = parseInt(
            policyNumber.substring(policyNumber.length - 1)
        );
        if (Number.isInteger(lastChart)) {
            const newPolicyNumber: string =
                policyNumber.substring(0, policyNumber.length - 1) +
                (lastChart + 1);
            return newPolicyNumber;
        }
        return policyNumber;
    }

    private _generateRequestBodies(): FormData[] {
        let requests: FormData[] = [];
        const insureds: any[] = this.insureds.controls;
        for (let insured of insureds) {
            const requestBody: FormData = this._getInsuredRequestBody(
                insured.value
            );
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
        if (!!date) {
            const formattedDate: string | null = this._datePipe.transform(
                date,
                'dd/MM/yyyy'
            );
            dateFormat = !!formattedDate ? formattedDate : '';
        }
        return dateFormat;
    }

    private _getInsuredRequestBody(insured: any): FormData {
        const requestBody: FormData = new FormData();
        switch (this.policy!.insuranceGroupId) {
            case INSURANCE_GROUPS.PEOPLE:
                requestBody.append('personName', insured.personName);
                requestBody.append('personGenderId', insured.personGenderId);
                requestBody.append('personAge', insured.personAge);
                break;

            case INSURANCE_GROUPS.VEHICLES:
                requestBody.append('vehicleMaker', insured.vehicleMaker);
                requestBody.append('vehicleVersion', insured.vehicleVersion);
                requestBody.append('vehicleModel', insured.vehicleModel);
                requestBody.append('vehiclePlates', insured.vehiclePlates);
                requestBody.append('vehicleSerial', insured.vehicleSerial);
                requestBody.append('vehicleMotor', insured.vehicleMotor);
                break;

            case INSURANCE_GROUPS.BUILDINGS:
                requestBody.append('buildingName', insured.buildingName);
                requestBody.append('buildingUsage', insured.buildingUsage);
                requestBody.append(
                    'buildingLocation',
                    insured.buildingLocation
                );
                break;

            case INSURANCE_GROUPS.MERCHANDISE:
            case INSURANCE_GROUPS.OBJECTS:
            case INSURANCE_GROUPS.RC:
                requestBody.append('objectName', insured.objectName);
                requestBody.append('objectUsage', insured.objectUsage);
                requestBody.append(
                    'objectDescription',
                    insured.objectDescription
                );
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
        const paymentPlan: PaymentPlan | undefined = this.paymentPlans.find(
            (element: PaymentPlan) => element.paymentPlanId == paymentPlanId
        );
        return !!paymentPlan ? paymentPlan.months : 0;
    }

    /**
     * Get the request body
     * @return The request body
     */
    private _getRequestBody(): FormData {
        let discount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(this.f.discount.value)
        );
        discount = discount < 0 ? discount * -1 : discount;
        const requestBody: FormData = new FormData();
        requestBody.append('policyFile', this.f.policyFile.value);
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('insurerId', this.f.insurerId.value);
        requestBody.append('insuranceId', this.f.insuranceId.value);
        requestBody.append('insuranceTypeId', this.f.insuranceTypeId.value);
        requestBody.append(
            'emissionDate',
            this.f.emissionDate.value.format('DD/MM/YYYY')
        );
        requestBody.append(
            'validityStartDate',
            this.f.validityStartDate.value.format('DD/MM/YYYY')
        );
        requestBody.append(
            'validityEndDate',
            this.f.validityEndDate.value.format('DD/MM/YYYY')
        );
        requestBody.append('comments', this.f.comments.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularBirthdate', this._titularBirthdate);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularEmail', this.f.titularEmail.value);
        requestBody.append(
            'titularPhoneCodeId',
            this.f.titularPhoneCodeId.value
        );
        requestBody.append(
            'titularPhoneNumber',
            this.f.titularPhoneNumber.value
        );
        requestBody.append('netPay', this.f.netPay.value);
        requestBody.append('taxPay', this.f.taxPay.value);
        requestBody.append('feePay', this.f.feePay.value);
        requestBody.append('coverPay', this.f.coverPay.value);
        requestBody.append('noTaxPay', this.f.noTaxPay.value);
        requestBody.append('extraPay', this.f.extraPay.value);
        requestBody.append('discount', discount.toString());
        requestBody.append(
            'areFractionatedPaymentAmounts',
            this._areFractionatedPaymentAmounts ? '1' : '0'
        );
        requestBody.append('policyAmount', this.f.policyAmount.value);
        requestBody.append('currencyId', this.f.currencyId.value);
        requestBody.append(
            'hasTaxReceipt',
            this.f.hasTaxReceipt.value ? '1' : '0'
        );
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append(
            'firstReceiptAmount',
            this.f.firstReceiptAmount.value
        );
        requestBody.append(
            'subsequentReceiptsAmount',
            this.f.subsequentReceiptsAmount.value
        );
        requestBody.append(
            'firstReceiptGracePeriod',
            this.f.firstReceiptGracePeriod.value
        );
        requestBody.append(
            'subsequentReceiptsGracePeriod',
            this.f.subsequentReceiptsGracePeriod.value
        );
        requestBody.append('bills', this.f.bills.value);
        requestBody.append(
            'isAutoPayment',
            this.f.isAutoPayment.value ? '1' : '0'
        );
        requestBody.append('partnerId', this.f.partnerId.value);
        requestBody.append('accountNumber', this.f.accountNumber.value);
        requestBody.append('cardNumber', this.f.cardNumber.value);
        requestBody.append('bankName', this.f.bankName.value);
        requestBody.append('agentName', this.f.agentName.value);
        requestBody.append('agentKey', this.f.agentKey.value);
        requestBody.append(
            'agentCommissionPercentage',
            this.f.agentCommissionPercentage.value
        );
        requestBody.append(
            'agentCommissionAmount',
            this.f.agentCommissionAmount.value
        );
        requestBody.append(
            'agentCommissionCurrencyId',
            this.f.agentCommissionCurrencyId.value
        );
        requestBody.append(
            'agentCommissionPeriod',
            this.f.agentCommissionPeriod.value
        );
        requestBody.append(
            'consultingCostPercentage',
            this.f.consultingCostPercentage.value
        );
        requestBody.append(
            'consultingCostAmount',
            this.f.consultingCostAmount.value
        );
        requestBody.append(
            'consultingCostCurrencyId',
            this.f.consultingCostCurrencyId.value
        );
        requestBody.append(
            'sellerCommissionPercentage',
            this.f.sellerCommissionPercentage.value
        );
        requestBody.append(
            'sellerCommissionAmount',
            this.f.sellerCommissionAmount.value
        );
        requestBody.append(
            'sellerCommissionCurrencyId',
            this.f.sellerCommissionCurrencyId.value
        );
        requestBody.append(
            'sellerCommissionPeriod',
            this.f.sellerCommissionPeriod.value
        );
        requestBody.append('policyPlan', this.f.policyPlan.value);
        if (this.policy!.contactTypeId === CONTACT_TYPES.PERSON) {
            requestBody.append('titularGenderId', this.f.titularGenderId.value);
            requestBody.append('titularAge', this.f.titularAge.value);
        } else {
            requestBody.append(
                'titularLegalRepresentative',
                this.f.titularLegalRepresentative.value
            );
        }
        requestBody.append(
            'contactFieldsToRewrite',
            this.contactFieldsToRewrite.join(',')
        );
        return requestBody;
    }

    /**
     * Get the request body to scann policy
     * @return The request body
     */
    private _getRequestBodyToScannPolicy(policyFile: any): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('file', policyFile);
        if (!!this.policy) {
            requestBody.append(
                'countryId',
                this.policy.workspaceCountryId.toString()
            );
            requestBody.append('insurerId', this.policy.insurerId.toString());
            requestBody.append(
                'insuranceId',
                this.policy.insuranceId.toString()
            );
            requestBody.append(
                'insuranceTypeId',
                this.policy.insuranceTypeId.toString()
            );
        }
        return requestBody;
    }

    initDropifyPlugin(): void {
        setTimeout(() => {
            DropifyPlugin.init(
                this._allowedFileTypes,
                this._canShowPreview,
                this._maxFileSize
            );
        }, 0);
    }

    replaceInsureds(): void {
        this.insureds.removeAt(0);
        this.addInsured();
    }

    loadInsuranceTypes(insuranceId: number): void {
        this.insuranceTypes = [];
        const fields: string = 'insuranceTypeId,name';
        this._insuranceTypeService
            .getInsuranceTypes(insuranceId, fields)
            .subscribe((res: HttpResponse) => {
                this.insuranceTypes = res.data;
            });
    }

    loadInsurances(): Observable<void> {
        const fields: string = 'insuranceId,name';
        return this._insuranceService.getInsurances(fields).pipe(
            tap((res: HttpResponse) => {
                this.insurances = res.data;
            }),
            map(() => {})
        );
    }
}
