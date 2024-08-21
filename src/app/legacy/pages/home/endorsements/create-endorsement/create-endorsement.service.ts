import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import {
    CONTACT_TYPES,
    EMAIL_LENGTH,
    ENDORSEMENT_TYPES,
    FREE_TEXT_LENGTH,
    INSURANCE_GROUPS,
    LONG_ALPHANUMERIC_LENGTH,
    MULTITEXT_LENGTH,
    SHORT_ALPHANUMERIC_LENGTH,
    TITULAR_NAME_LENGTH,
} from '@constants/global';
import { PolicyInsuredHelper } from '@helpers/policy-insured-helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { EndorsementType } from '@interfaces/endorsement-type.interface';
import { Gender } from '@interfaces/gender.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Insured } from '@interfaces/insured.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { Policy } from '@core/interfaces/policy.interface';
import { EndorsementTypeService } from '@services/endorsement-type.service';
import { GendersService } from '@services/genders.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { CalculatePaymentAmount } from '@core/interfaces/calculate-payment-amount.interface';
import { PAYMENT_SOURCE_TYPES } from '@core/constants/settings';

declare var PopoverPlugin: any;

@Injectable()
export class CreateEndorsementService {
    areSeveralInsured: boolean | null = null;
    canShowEndorsementPaymentFields: boolean = false;
    endorsementTypes: EndorsementType[] = [];
    form: FormGroup = this._formBuilder.group({});
    fractionalReceiptEndDate = '';
    fractionalReceiptStartDate = '';
    genders: Gender[] = [];
    isBuiltForm: boolean = false;
    paymentMethods: PaymentMethod[] = [];
    paymentPlans: PaymentPlan[] = [];
    paymentPlansAvailable: PaymentPlan[] = [];
    policy: Policy | null = null;
    totalEndorsementReceipts = 0;
    private _remainingMonthsToPay = 0;

    constructor(
        private _endorsementTypeService: EndorsementTypeService,
        private _formBuilder: FormBuilder,
        private _gendersService: GendersService,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _policyService: PolicyService,
        private _policyInsuredService: PolicyInsuredService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    get insureds(): FormArray {
        return this.form.get('insureds') as FormArray;
    }

    buildForm(): void {
        if (this.policy !== null) {
            this.form = this._formBuilder.group({
                endorsementFile: ['', [Validators.required]],
                evidenceFile: [''],
                endorsementNumber: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN),
                        Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX),
                        ValidatorsHelper.alphanumeric,
                    ],
                ],
                endorsementEmissionDate: [
                    '',
                    [Validators.required, ValidatorsHelper.date],
                ],
                endorsementValidityStartDate: [
                    '',
                    [Validators.required, ValidatorsHelper.date],
                ],
                endorsementValidityEndDate: [
                    moment(this.policy.validityEndDate).format('DD/MM/YYYY') ||
                        '',
                    [Validators.required, ValidatorsHelper.date],
                ],
                endorsementTypeId: ['', [Validators.required]],
                endorsementComments: [
                    '',
                    [
                        Validators.minLength(MULTITEXT_LENGTH.MIN),
                        Validators.maxLength(MULTITEXT_LENGTH.MAX),
                        ValidatorsHelper.multitext,
                    ],
                ],
                titularName: [
                    this.policy.titularName,
                    [
                        Validators.required,
                        Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                        Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                        ValidatorsHelper.ownName,
                    ],
                ],
                titularRfc: [
                    this.policy.titularRfc,
                    [
                        Validators.minLength(FREE_TEXT_LENGTH.MIN),
                        Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                        ValidatorsHelper.freeText,
                    ],
                ],
                titularPostalCode: [
                    this.policy.titularPostalCode,
                    [ValidatorsHelper.postalCode],
                ],
                titularEmail: [
                    this.policy.titularEmail,
                    [
                        Validators.email,
                        Validators.minLength(EMAIL_LENGTH.MIN),
                        Validators.maxLength(EMAIL_LENGTH.MAX),
                    ],
                ],
                titularPhoneCodeId: [this.policy.titularPhoneCodeId || ''],
                titularPhoneNumber: [
                    this.policy.titularPhoneNumber,
                    [ValidatorsHelper.phoneNumber],
                ],
                insureds: this._formBuilder.array([]),
                validityEndDate: [
                    moment(this.policy.validityEndDate).format('DD/MM/YYYY') ||
                        '',
                    [
                        Validators.required,
                        ValidatorsHelper.date,
                        ValidatorsHelper.dateGreaterThan(
                            this.policy.validityEndDate
                        ),
                    ],
                ],
            });

            if (this.policy.contactTypeId === CONTACT_TYPES.PERSON) {
                this.form.addControl(
                    'titularGenderId',
                    new FormControl(this.policy.titularGenderId || '', [
                        Validators.required,
                        ValidatorsHelper.number,
                    ])
                );
                this.form.addControl(
                    'titularAge',
                    new FormControl(this.policy.titularAge || '', [
                        ValidatorsHelper.number,
                    ])
                );
            }

            this.areSeveralInsured = PolicyInsuredHelper.checkAreSeveralInsured(
                this.policy.insuranceTypeId
            );
            if (
                this.areSeveralInsured === false &&
                !!this.policy.insureds &&
                this.policy.insureds.length > 0
            ) {
                for (let insured of this.policy.insureds) {
                    this._addInsured(insured);
                }
            }

            this.isBuiltForm = true;
        }
    }

    checkEndorsementAmounts(): boolean {
        //this._areFractionatedPaymentAmounts = false;
        let endorsementNetPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementNetPay.value
            )
        );
        let endorsementFeePay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementFeePay.value
            )
        );
        let endorsementCoverPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementCoverPay.value
            )
        );
        let endorsementExtraPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementExtraPay.value
            )
        );
        let endorsementDiscount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementDiscount.value
            )
        );
        let endorsementTaxPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementTaxPay.value
            )
        );
        let endorsementTotalAmount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementTotalAmount.value
            )
        );
        endorsementNetPay =
            endorsementNetPay < 0 ? endorsementNetPay * -1 : endorsementNetPay;
        endorsementFeePay =
            endorsementFeePay < 0 ? endorsementFeePay * -1 : endorsementFeePay;
        endorsementCoverPay =
            endorsementCoverPay < 0
                ? endorsementCoverPay * -1
                : endorsementCoverPay;
        endorsementExtraPay =
            endorsementExtraPay < 0
                ? endorsementExtraPay * -1
                : endorsementExtraPay;
        endorsementDiscount =
            endorsementDiscount < 0
                ? endorsementDiscount * -1
                : endorsementDiscount;
        endorsementTaxPay =
            endorsementTaxPay < 0 ? endorsementTaxPay * -1 : endorsementTaxPay;
        endorsementTotalAmount =
            endorsementTotalAmount < 0
                ? endorsementTotalAmount * -1
                : endorsementTotalAmount;

        let endorsementTotalAmountAux: number =
            endorsementNetPay +
            endorsementTaxPay +
            endorsementFeePay +
            endorsementCoverPay +
            endorsementExtraPay -
            endorsementDiscount;

        if (
            endorsementTotalAmountAux >= endorsementTotalAmount - 1 &&
            endorsementTotalAmountAux <= endorsementTotalAmount + 1
        ) {
            return true;
        } /* else {
            const paymentPlanId: number = (this.policy) ? this.policy.paymentPlanId : 0;
            const paymentPlanMonths: number = 12 / this._getPaymentPlanMonths(paymentPlanId);
            endorsementNetPay *= paymentPlanMonths;
            endorsementTaxPay *= paymentPlanMonths;
            endorsementFeePay *= paymentPlanMonths;
            endorsementCoverPay *= paymentPlanMonths;
            endorsementExtraPay *= paymentPlanMonths;
            endorsementTotalAmountAux = endorsementNetPay + endorsementTaxPay + endorsementFeePay + endorsementCoverPay + endorsementExtraPay - endorsementDiscount;

            if((endorsementTotalAmountAux >= (endorsementTotalAmount - 1)) && (endorsementTotalAmountAux <= (endorsementTotalAmount + 1))) {
                //this._areFractionatedPaymentAmounts = true;
                return true;
            }
        } */
        return false;
    }

    checkHasPolicyPendingReceipts(): boolean {
        const receiptsPaid: number = this.policy!.receiptsPaid;
        const receiptsPending: number = parseInt(this.f.bills.value);
        return receiptsPending > receiptsPaid ? true : false;
    }

    createEndorsementWithCancellation(
        contactId: string,
        policyId: string
    ): Observable<void> {
        const requestBody: FormData =
            this._getRequestBodyToCreateEndorsementWithCancellation();
        return this._policyService.createEndorsementWithCancellation(
            contactId,
            policyId,
            requestBody
        );
    }

    createEndorsementWithChanges(
        contactId: string,
        policyId: string
    ): Observable<void> {
        const requestBody: FormData =
            this._getRequestBodyToCreateEndorsementWithChanges();
        return this._policyService.createEndorsementWithChanges(
            contactId,
            policyId,
            requestBody
        );
    }

    createEndorsementWithDecrement(
        contactId: string,
        policyId: string,
        fractionalReceiptAmount: number
    ): Observable<void> {
        const requestBody: FormData =
            this._getRequestBodyToCreateEndorsementWithDecrement(
                fractionalReceiptAmount
            );
        return this._policyService.createEndorsementWithDecrement(
            contactId,
            policyId,
            requestBody
        );
    }

    createEndorsementWithIncrement(
        contactId: string,
        policyId: string,
        fractionalReceiptAmount: number,
        endorsementPaymentMethodId: number
    ): Observable<void> {
        const requestBody: FormData =
            this._getRequestBodyToCreateEndorsementWithIncrement(
                fractionalReceiptAmount,
                endorsementPaymentMethodId
            );
        return this._policyService.createEndorsementWithIncrement(
            contactId,
            policyId,
            requestBody
        );
    }

    enableAndDesableFormFields(endorsementTypeId: number = 0): void {
        this._disableFormFields();
        switch (endorsementTypeId) {
            case ENDORSEMENT_TYPES.A:
            case ENDORSEMENT_TYPES.D:
                this._enablePolicyFields();
                this._enableValidityEndDateField();
                this._addEndorsementPaymentFields();
                this._enableEndorsementPaymentFields();
                break;

            case ENDORSEMENT_TYPES.B:
                this._enablePolicyFields();
                this._removeEndorsementPaymentFields();
                break;

            case ENDORSEMENT_TYPES.C:
                this._removeEndorsementPaymentFields();
                break;
        }
    }

    calculateFractionalReceiptAmountToDecrement(): number {
        if (this.totalEndorsementReceipts === 0) {
            return 0;
        }
        const oldPolicyPaymentPlan = this._getPaymentPlan(
            this.policy!.paymentPlanId
        );
        // Obtener el número de recibos restantes que hay entre los ya pagados y los nuevos recibos del nuevo plan de pago
        const totalRemainingReceipts = this._calculateTotalRemainingReceipts();
        // Calcular el monto que representan dichos recibos restantentes
        let totalRemainingAmount = 0;
        for (let i = 0; i < totalRemainingReceipts; i++) {
            const calculatePaymentAmountData: CalculatePaymentAmount = {
                paymentPlanReceips: oldPolicyPaymentPlan!.receipts,
                netPay: this.policy!.netPay,
                feePay: this.policy!.feePay,
                coverPay: this.policy!.coverPay,
                noTaxPay: this.policy!.noTaxPay,
                extraPay: this.policy!.extraPay,
                taxPay: this.policy!.taxPay,
                discount: this.policy!.discount,
                paymentSourceTypeId: PAYMENT_SOURCE_TYPES.POLICY,
                tickets: this.policy!.receiptsPaid + i,
                paymentPlanId: this.policy!.paymentPlanId,
                pendingAmount:
                    parseFloat(this.policy!.paymentAmount.toString()) -
                    (parseFloat(this.policy!.paymentAmountPaid.toString()) +
                        totalRemainingAmount),
                pendingReceipts:
                    this.policy!.bills - (this.policy!.receiptsPaid + i),
            };
            totalRemainingAmount += UtilitiesHelper.calculatePaymentAmount(
                calculatePaymentAmountData
            );
        }
        return totalRemainingAmount;
    }

    calculateFractionalReceiptAmountToIncrement(
        endorsementTotalAmount: number
    ): number {
        let fractionalReceiptAmount: number = 0;
        const endorsementValidityStartDate = moment(
            this.f.endorsementValidityStartDate.value,
            'DD/MM/YYYY'
        );
        const endorsementValidityEndDate = moment(
            this.f.endorsementValidityEndDate.value,
            'DD/MM/YYYY'
        );
        const policyValidityStartDate = moment(this.policy!.validityStartDate);
        const endorsementNetPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementNetPay.value
            )
        );
        const endorsementCoverPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementCoverPay.value
            )
        );
        const endorsementExtraPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementExtraPay.value
            )
        );

        if (
            endorsementTotalAmount > 0 &&
            endorsementValidityStartDate.isAfter(policyValidityStartDate)
        ) {
            // Obtener los dias de vigencia del endoso (con la formula base360)
            const endorsementDays: number = UtilitiesHelper.days360(
                endorsementValidityStartDate.format('YYYY-MM-DD'),
                endorsementValidityEndDate.format('YYYY-MM-DD')
            );
            // 1.- Obtener la siguiente fecha de pago de la póliza: 01/07/2023
            const nextPaymentDate = this._calculateNextPaymentDate();

            // 2.- Obtener los meses exactos que hay desde la fecha de pago hasta que venza la póliza: 6 meses
            const remainingMonths = endorsementValidityEndDate.diff(
                nextPaymentDate,
                'months'
            );

            // 3.- Multiplicar esos meses por 30: 6 * 30 = 180
            // 4.- Restar a los días del endoso esos días: 232 - 180 = 52
            // 5.- Los días del recibo fraccionado serán: 52
            const fractionalReceiptDays =
                endorsementDays - remainingMonths * 30;

            // calcular la prima diaria ((prima neta + cargados extra) / dias de vigencia del endoso)
            const dailyAmount: number =
                (endorsementNetPay + endorsementExtraPay) / endorsementDays;

            // calcular la prima neta del pago fraccionado ( dias prorateados * prima diaria)
            const fractionalReceiptNetPay: number =
                fractionalReceiptDays * dailyAmount;
            // calcular el pago por financiamiento (prima neta * 0.09)
            const fractionalReceiptFeePay: number =
                fractionalReceiptNetPay * 0.09;
            // calcular el sub total del endoso (prima neta + pago por financiamiento + derechos de póliza)
            const fractionalReceiptSubTotal: number =
                fractionalReceiptNetPay +
                fractionalReceiptFeePay +
                endorsementCoverPay;
            // Calcular el iva del sub total (sub total * 0.16)
            const fractionalReceiptTaxPay: number =
                fractionalReceiptSubTotal * 0.16;

            // calcular el monto total del recibo fraccionado (prima neta + pago por financiamiento + derechos de póliza del endoso + iva)
            fractionalReceiptAmount = parseFloat(
                (
                    fractionalReceiptNetPay +
                    fractionalReceiptFeePay +
                    endorsementCoverPay +
                    fractionalReceiptTaxPay
                ).toFixed(2)
            );
        }
        return fractionalReceiptAmount;
    }

    calculateNewBills(): void {
        if (this.policy) {
            const selectedPaymentPlanId: number = parseInt(
                this.f.paymentPlanId.value
            );
            const selectedPaymentPlanMonths = this._getPaymentPlanMonths(
                selectedPaymentPlanId
            );
            const newBills = !!selectedPaymentPlanMonths
                ? Math.floor(
                      this._remainingMonthsToPay / selectedPaymentPlanMonths
                  )
                : 1;
            const newTotalBills: number = this.policy.receiptsPaid + newBills;
            this.totalEndorsementReceipts =
                this.policy!.paymentPlanId != this.f.paymentPlanId.value
                    ? newBills
                    : 0;
            this.f.bills.setValue(newTotalBills);
        }
    }

    /* calculatePaymentPlansAvailable(): void {
        this.paymentPlansAvailable = [];
        if (this.f.endorsementValidityStartDate.valid) {
            const startDate = moment(
                this.f.endorsementValidityStartDate.value,
                'DD/MM/YYYY'
            );
            const endDate = moment(this.f.validityEndDate.value, 'DD/MM/YYYY');
            this._remainingMonthsToPay = endDate.diff(startDate, 'months');
            for (let paymentPlan of this.paymentPlans) {
                if (paymentPlan.months <= this._remainingMonthsToPay) {
                    this.paymentPlansAvailable.push(paymentPlan);
                }
            }
        } else {
            for (let paymentPlan of this.paymentPlans) {
                if (paymentPlan.paymentPlanId === this.policy!.paymentPlanId) {
                    this.paymentPlansAvailable.push(paymentPlan);
                }
            }
        }

        this._checkFieldPaymenPlanId();
    } */

    calculatePaymentPlansAvailable(): void {
        if (this.policy) {
            const startDate = moment(this.policy.validityStartDate);
            const endDate = moment(
                UtilitiesHelper.getOriginalDateFormat(
                    this.f.validityEndDate.value
                )
            );
            const totalMonths = endDate.diff(startDate, 'months');
            this._remainingMonthsToPay = totalMonths - this.policy.monthsPaid;
            this.paymentPlansAvailable = [];
            // If the policy has all their receipts paid
            if (this._remainingMonthsToPay === 0) {
                // Set the same payment plan
                const paymentPlanId: number = parseInt(
                    this.f.paymentPlanId.value
                );
                for (let paymentPlan of this.paymentPlans) {
                    if (paymentPlan.paymentPlanId === paymentPlanId) {
                        this.paymentPlansAvailable.push(paymentPlan);
                        break;
                    }
                }
            } else {
                // Set the payment plans available
                for (let paymentPlan of this.paymentPlans) {
                    if (
                        paymentPlan.months > 0 &&
                        paymentPlan.months <= this._remainingMonthsToPay
                    ) {
                        this.paymentPlansAvailable.push(paymentPlan);
                    }
                }
            }
        }
    }

    getPaymentPlanName(paymentPlanId: number): string {
        const selectedPaymentPlan: PaymentPlan | undefined =
            this.paymentPlans.find(
                (element: PaymentPlan) => element.paymentPlanId == paymentPlanId
            );
        return !!selectedPaymentPlan ? selectedPaymentPlan.name : '';
    }

    getPolicy(contactId: string, policyId: string): Observable<HttpResponse> {
        const fields: string =
            'policyId,policyStatusName,policyStatusBackground,policyStatusDescription,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyUrl,policyNumber,insurerName,insurerImageUrl,titularName,titularRfc,titularPostalCode,titularEmail,titularPhoneCodeId,titularPhoneNumber,emissionDate,validityStartDate,validityEndDate,policyAmount,currencyName,paymentMethodId,paymentPlanId,bills,monthsPaid,receiptsPaid,lifeTime,totalEndorsements,paymentAmount,paymentAmountPaid,titularAge,titularGenderId,contactTypeId,insuranceTypeId,insureds,insuranceGroupId,paymentDate,netPay,feePay,coverPay,noTaxPay,extraPay,taxPay,discount,';
        return this._policyService.getContactPolicy(
            contactId,
            policyId,
            fields
        );
    }

    loadEndorsementTypes(): void {
        const fields: string = 'endorsementTypeId,name';
        this._endorsementTypeService
            .getEndorsementTypes(fields)
            .subscribe((res: HttpResponse) => {
                this.endorsementTypes = res.data;
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

    loadPaymentMethods(): void {
        const fields: string = 'paymentMethodId,name';
        this._paymentMethodService
            .getPaymentMethods(fields)
            .subscribe((res: HttpResponse) => {
                this.paymentMethods = res.data;
            });
    }

    loadPaymentPlans(): Observable<void> {
        const fields: string = 'paymentPlanId,name,months,receipts';
        return this._paymentPlanService.getPaymentPlans(fields).pipe(
            tap((res: HttpResponse) => {
                this.paymentPlans = res.data;
            }),
            map(() => {})
        );
    }

    loadPolicy(policy: Policy): void {
        this.policy = policy;
    }

    updatePolicyInsured(contactId: string, policyId: string): Observable<void> {
        const updateRequestBodies: FormData[] =
            this._getRequestBodiesToUpdatePolicyInsured();
        return this._policyInsuredService.updatePolicyInsureds(
            contactId,
            policyId,
            updateRequestBodies
        );
    }

    private _addInsured(insured: Insured): void {
        this.insureds.push(this._newInsured(insured));
    }

    private _calculateTotalRemainingReceipts(): number {
        const oldPolicyPaymentPlan = this._getPaymentPlan(
            this.policy!.paymentPlanId
        );
        let policyValidityStartDate = moment(this.policy!.validityStartDate);
        let coveredReceipts = 0;
        const newPolicyNextPaymentDate = this._calculateNextPaymentDate();
        this.fractionalReceiptStartDate = moment(
            this.policy!.paymentDate
        ).format('DD/MM/YYYY');
        this.fractionalReceiptEndDate =
            newPolicyNextPaymentDate.format('DD/MM/YYYY');
        for (let i = 0; i < oldPolicyPaymentPlan!.receipts; i++) {
            if (
                newPolicyNextPaymentDate.isSameOrBefore(policyValidityStartDate)
            ) {
                break;
            }
            coveredReceipts++;
            policyValidityStartDate.add(oldPolicyPaymentPlan?.months, 'months');
        }
        return coveredReceipts - this.policy!.receiptsPaid;
    }

    private _calculateNextPaymentDate(): any {
        const selectedPaymentPlanId: number = parseInt(
            this.f.paymentPlanId.value
        );
        const selectedPaymentPlan = this._getPaymentPlan(selectedPaymentPlanId);
        let policyValidityStartDate = moment(this.policy!.validityStartDate);
        let policyPaymentDate = moment(this.policy!.paymentDate);
        for (let i = 0; i < selectedPaymentPlan!.receipts; i++) {
            if (policyPaymentDate.isSameOrBefore(policyValidityStartDate)) {
                return policyValidityStartDate;
            }
            policyValidityStartDate.add(selectedPaymentPlan?.months, 'months');
        }
        return '';
    }

    private _checkFieldPaymenPlanId(): void {
        // Si el plan de pago seleccionado ya no esta en los planes de pago disponibles, remover el pado seleccionado.
        if (this.f.paymentPlanId) {
            const paymentPlanFound = this.paymentPlansAvailable.find(
                (paymentPlan) =>
                    paymentPlan.paymentPlanId == this.f.paymentPlanId.value
            );
            if (typeof paymentPlanFound === 'undefined') {
                this.f.paymentPlanId.setValue('');
            }
        }
    }

    private _addEndorsementPaymentFields(): void {
        if (this.canShowEndorsementPaymentFields) {
            this.f.endorsementNetPay.setValue('0.00');
            this.f.endorsementFeePay.setValue('0.00');
            this.f.endorsementCoverPay.setValue('0.00');
            this.f.endorsementExtraPay.setValue('0.00');
            this.f.endorsementDiscount.setValue('0.00');
            this.f.endorsementTaxPay.setValue('0.00');
            this.f.endorsementTotalAmount.setValue('0.00');
            this.f.paymentMethodId.setValue(this.policy?.paymentMethodId || '');
            this.f.paymentPlanId.setValue(this.policy?.paymentPlanId || '');
            this.f.bills.setValue(this.policy?.bills || '0');
        } else {
            this.form.addControl(
                'endorsementNetPay',
                new FormControl('0.00', [
                    Validators.required,
                    ValidatorsHelper.amount,
                ])
            );
            this.form.addControl(
                'endorsementFeePay',
                new FormControl('0.00', [
                    Validators.required,
                    ValidatorsHelper.amount,
                ])
            );
            this.form.addControl(
                'endorsementCoverPay',
                new FormControl('0.00', [
                    Validators.required,
                    ValidatorsHelper.amount,
                ])
            );
            this.form.addControl(
                'endorsementExtraPay',
                new FormControl('0.00', [
                    Validators.required,
                    ValidatorsHelper.amount,
                ])
            );
            this.form.addControl(
                'endorsementDiscount',
                new FormControl('0.00', [
                    Validators.required,
                    ValidatorsHelper.amount,
                ])
            );
            this.form.addControl(
                'endorsementTaxPay',
                new FormControl('0.00', [
                    Validators.required,
                    ValidatorsHelper.amount,
                ])
            );
            this.form.addControl(
                'endorsementTotalAmount',
                new FormControl('0.00', [
                    Validators.required,
                    ValidatorsHelper.amount,
                ])
            );
            this.form.addControl(
                'paymentMethodId',
                new FormControl(this.policy?.paymentMethodId || '', [
                    Validators.required,
                ])
            );
            this.form.addControl(
                'paymentPlanId',
                new FormControl(this.policy?.paymentPlanId || '', [
                    Validators.required,
                ])
            );
            this.form.addControl(
                'bills',
                new FormControl(this.policy?.bills || 0, [Validators.required])
            );
            this.f.bills.disable();
            PopoverPlugin.init();
        }
        this.canShowEndorsementPaymentFields = true;
    }

    private _disableFormFields(): void {
        const fieldsToIgnore: string[] = [
            'endorsementFile',
            'endorsementNumber',
            'endorsementEmissionDate',
            'endorsementValidityStartDate',
            'endorsementValidityEndDate',
            'endorsementTypeId',
            'endorsementComments',
            'evidenceFile',
        ];
        const controls: { [key: string]: AbstractControl } = this.f;
        for (const name in controls) {
            if (!fieldsToIgnore.includes(name)) {
                controls[name].disable();
            }
        }
    }

    private _enableEndorsementPaymentFields(): void {
        this.f.endorsementNetPay.enable();
        this.f.endorsementFeePay.enable();
        this.f.endorsementCoverPay.enable();
        this.f.endorsementExtraPay.enable();
        this.f.endorsementDiscount.enable();
        this.f.endorsementTaxPay.enable();
        this.f.endorsementTotalAmount.enable();
        this.f.paymentMethodId.enable();
        this.f.paymentPlanId.enable();
    }

    private _enablePolicyFields(): void {
        this.f.titularName.enable();
        this.f.titularRfc.enable();
        this.f.titularPostalCode.enable();
        this.f.titularEmail.enable();
        this.f.titularPhoneCodeId.enable();
        this.f.titularPhoneNumber.enable();

        if (this.policy!.contactTypeId === CONTACT_TYPES.PERSON) {
            this.f.titularGenderId.enable();
            this.f.titularAge.enable();
        }

        if (this.areSeveralInsured === false) {
            this.f.insureds.enable();
        }
    }

    private _enableValidityEndDateField(): void {
        this.f.validityEndDate.enable();
    }

    private _getPaymentPlan(paymentPlanId: number): PaymentPlan | null {
        const paymentPlan: PaymentPlan | undefined = this.paymentPlans.find(
            (element: PaymentPlan) => element.paymentPlanId == paymentPlanId
        );
        return typeof paymentPlan !== 'undefined' ? paymentPlan : null;
    }

    private _getPaymentPlanMonths(paymentPlanId: number): number {
        const paymentPlan: PaymentPlan | undefined = this.paymentPlans.find(
            (element: PaymentPlan) => element.paymentPlanId == paymentPlanId
        );
        return !!paymentPlan ? paymentPlan.months : 0;
    }

    private _getRequestBodyToCreateEndorsementWithCancellation(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append(
            'endorsementEmissionDate',
            this.f.endorsementEmissionDate.value
        );
        requestBody.append(
            'endorsementValidityStartDate',
            this.f.endorsementValidityStartDate.value
        );
        requestBody.append(
            'endorsementValidityEndDate',
            this.f.endorsementValidityEndDate.value
        );
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append(
            'endorsementComments',
            this.f.endorsementComments.value
        );
        return requestBody;
    }

    private _getRequestBodyToCreateEndorsementWithChanges(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append(
            'endorsementEmissionDate',
            this.f.endorsementEmissionDate.value
        );
        requestBody.append(
            'endorsementValidityStartDate',
            this.f.endorsementValidityStartDate.value
        );
        requestBody.append(
            'endorsementValidityEndDate',
            this.f.endorsementValidityEndDate.value
        );
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append(
            'endorsementComments',
            this.f.endorsementComments.value
        );
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
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

        if (this.policy!.contactTypeId === CONTACT_TYPES.PERSON) {
            requestBody.append('titularGenderId', this.f.titularGenderId.value);
            requestBody.append('titularAge', this.f.titularAge.value);
        }

        return requestBody;
    }

    private _getRequestBodyToCreateEndorsementWithDecrement(
        fractionalReceiptAmount: number
    ): FormData {
        let endorsementNetPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementNetPay.value
            )
        );
        let endorsementFeePay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementFeePay.value
            )
        );
        let endorsementCoverPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementCoverPay.value
            )
        );
        let endorsementExtraPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementExtraPay.value
            )
        );
        let endorsementDiscount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementDiscount.value
            )
        );
        let endorsementTaxPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementTaxPay.value
            )
        );
        let endorsementTotalAmount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementTotalAmount.value
            )
        );
        endorsementNetPay =
            endorsementNetPay < 0 ? endorsementNetPay * -1 : endorsementNetPay;
        endorsementFeePay =
            endorsementFeePay < 0 ? endorsementFeePay * -1 : endorsementFeePay;
        endorsementCoverPay =
            endorsementCoverPay < 0
                ? endorsementCoverPay * -1
                : endorsementCoverPay;
        endorsementExtraPay =
            endorsementExtraPay < 0
                ? endorsementExtraPay * -1
                : endorsementExtraPay;
        endorsementDiscount =
            endorsementDiscount < 0
                ? endorsementDiscount * -1
                : endorsementDiscount;
        endorsementTaxPay =
            endorsementTaxPay < 0 ? endorsementTaxPay * -1 : endorsementTaxPay;
        endorsementTotalAmount =
            endorsementTotalAmount < 0
                ? endorsementTotalAmount * -1
                : endorsementTotalAmount;

        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append(
            'endorsementEmissionDate',
            this.f.endorsementEmissionDate.value
        );
        requestBody.append(
            'endorsementValidityStartDate',
            this.f.endorsementValidityStartDate.value
        );
        requestBody.append(
            'endorsementValidityEndDate',
            this.f.endorsementValidityEndDate.value
        );
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append(
            'endorsementComments',
            this.f.endorsementComments.value
        );
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
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
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('endorsementNetPay', endorsementNetPay.toString());
        requestBody.append('endorsementFeePay', endorsementFeePay.toString());
        requestBody.append(
            'endorsementCoverPay',
            endorsementCoverPay.toString()
        );
        requestBody.append(
            'endorsementExtraPay',
            endorsementExtraPay.toString()
        );
        requestBody.append(
            'endorsementDiscount',
            endorsementDiscount.toString()
        );
        requestBody.append('endorsementTaxPay', endorsementTaxPay.toString());
        requestBody.append(
            'endorsementAmount',
            endorsementTotalAmount.toString()
        );
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('bills', this.f.bills.value);
        requestBody.append(
            'fractionalReceiptAmount',
            fractionalReceiptAmount.toString()
        );

        if (this.policy!.contactTypeId === CONTACT_TYPES.PERSON) {
            requestBody.append('titularGenderId', this.f.titularGenderId.value);
            requestBody.append('titularAge', this.f.titularAge.value);
        }

        return requestBody;
    }

    private _getRequestBodyToCreateEndorsementWithIncrement(
        fractionalReceiptAmount: number,
        endorsementPaymentMethodId: number
    ): FormData {
        let endorsementNetPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementNetPay.value
            )
        );
        let endorsementFeePay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementFeePay.value
            )
        );
        let endorsementCoverPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementCoverPay.value
            )
        );
        let endorsementExtraPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementExtraPay.value
            )
        );
        let endorsementDiscount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementDiscount.value
            )
        );
        let endorsementTaxPay: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementTaxPay.value
            )
        );
        let endorsementTotalAmount: number = parseFloat(
            UtilitiesHelper.removeCommasFromQuantity(
                this.f.endorsementTotalAmount.value
            )
        );
        endorsementNetPay =
            endorsementNetPay < 0 ? endorsementNetPay * -1 : endorsementNetPay;
        endorsementFeePay =
            endorsementFeePay < 0 ? endorsementFeePay * -1 : endorsementFeePay;
        endorsementCoverPay =
            endorsementCoverPay < 0
                ? endorsementCoverPay * -1
                : endorsementCoverPay;
        endorsementExtraPay =
            endorsementExtraPay < 0
                ? endorsementExtraPay * -1
                : endorsementExtraPay;
        endorsementDiscount =
            endorsementDiscount < 0
                ? endorsementDiscount * -1
                : endorsementDiscount;
        endorsementTaxPay =
            endorsementTaxPay < 0 ? endorsementTaxPay * -1 : endorsementTaxPay;
        endorsementTotalAmount =
            endorsementTotalAmount < 0
                ? endorsementTotalAmount * -1
                : endorsementTotalAmount;

        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append(
            'endorsementEmissionDate',
            this.f.endorsementEmissionDate.value
        );
        requestBody.append(
            'endorsementValidityStartDate',
            this.f.endorsementValidityStartDate.value
        );
        requestBody.append(
            'endorsementValidityEndDate',
            this.f.endorsementValidityEndDate.value
        );
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append(
            'endorsementComments',
            this.f.endorsementComments.value
        );
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
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
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('endorsementNetPay', endorsementNetPay.toString());
        requestBody.append('endorsementFeePay', endorsementFeePay.toString());
        requestBody.append(
            'endorsementCoverPay',
            endorsementCoverPay.toString()
        );
        requestBody.append(
            'endorsementExtraPay',
            endorsementExtraPay.toString()
        );
        requestBody.append(
            'endorsementDiscount',
            endorsementDiscount.toString()
        );
        requestBody.append('endorsementTaxPay', endorsementTaxPay.toString());
        requestBody.append(
            'endorsementAmount',
            endorsementTotalAmount.toString()
        );
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('bills', this.f.bills.value);
        requestBody.append(
            'fractionalReceiptAmount',
            fractionalReceiptAmount.toString()
        );
        requestBody.append(
            'endorsementPaymentMethodId',
            endorsementPaymentMethodId.toString()
        );

        if (this.policy!.contactTypeId === CONTACT_TYPES.PERSON) {
            requestBody.append('titularGenderId', this.f.titularGenderId.value);
            requestBody.append('titularAge', this.f.titularAge.value);
        }

        return requestBody;
    }

    private _getRequestBodyToUpdatePolicyInsured(insured: any): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('policyInsuredId', insured.policyInsuredId);

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

    private _getRequestBodiesToUpdatePolicyInsured(): FormData[] {
        let requests: FormData[] = [];
        const insureds: any[] = this.insureds.controls;
        for (let insured of insureds) {
            if (insured.status === 'VALID' && !!insured.value.policyInsuredId) {
                const requestBody: FormData =
                    this._getRequestBodyToUpdatePolicyInsured(insured.value);
                requests.push(requestBody);
            }
        }
        return requests;
    }

    private _newInsured(insured: Insured): FormGroup {
        let insuredForm: FormGroup;
        switch (this.policy!.insuranceGroupId) {
            case INSURANCE_GROUPS.PEOPLE:
                insuredForm = this._formBuilder.group({
                    personName: [
                        !!insured.personName ? insured.personName : '',
                        [
                            Validators.required,
                            Validators.minLength(TITULAR_NAME_LENGTH.MIN),
                            Validators.maxLength(TITULAR_NAME_LENGTH.MAX),
                            ValidatorsHelper.ownName,
                        ],
                    ],
                    personGenderId: [
                        !!insured.personGenderId ? insured.personGenderId : '',
                    ],
                    personAge: [
                        !!insured.personAge ? insured.personAge : '',
                        [ValidatorsHelper.number],
                    ],
                });
                break;

            case INSURANCE_GROUPS.VEHICLES:
                insuredForm = this._formBuilder.group({
                    vehicleMaker: [
                        !!insured.vehicleMaker ? insured.vehicleMaker : '',
                        [
                            Validators.required,
                            Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(50),
                            ValidatorsHelper.alphanumeric,
                        ],
                    ],
                    vehicleVersion: [
                        !!insured.vehicleVersion ? insured.vehicleVersion : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(100),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    vehicleModel: [
                        !!insured.vehicleModel ? insured.vehicleModel : '',
                        [Validators.required, ValidatorsHelper.vehicleModel],
                    ],
                    vehiclePlates: [
                        !!insured.vehiclePlates ? insured.vehiclePlates : '',
                        [
                            Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX),
                            ValidatorsHelper.alphanumeric,
                        ],
                    ],
                    vehicleSerial: [
                        !!insured.vehicleSerial ? insured.vehicleSerial : '',
                        [
                            Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(100),
                            ValidatorsHelper.alphanumeric,
                        ],
                    ],
                    vehicleMotor: [
                        !!insured.vehicleMotor ? insured.vehicleMotor : '',
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
                        !!insured.buildingName ? insured.buildingName : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    buildingUsage: [
                        !!insured.buildingUsage ? insured.buildingUsage : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    buildingLocation: [
                        !!insured.buildingLocation
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
                        !!insured.objectName ? insured.objectName : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    objectUsage: [
                        !!insured.objectUsage ? insured.objectUsage : '',
                        [
                            Validators.required,
                            Validators.minLength(FREE_TEXT_LENGTH.MIN),
                            Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                            ValidatorsHelper.freeText,
                        ],
                    ],
                    objectDescription: [
                        !!insured.objectDescription
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
                        !!insured.policyDetails ? insured.policyDetails : '',
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

        insuredForm.addControl(
            'policyInsuredId',
            new FormControl(insured.policyInsuredId)
        );

        return insuredForm;
    }

    private _removeEndorsementPaymentFields(): void {
        this.canShowEndorsementPaymentFields = false;
        this.form.removeControl('endorsementNetPay');
        this.form.removeControl('endorsementFeePay');
        this.form.removeControl('endorsementCoverPay');
        this.form.removeControl('endorsementExtraPay');
        this.form.removeControl('endorsementDiscount');
        this.form.removeControl('endorsementTaxPay');
        this.form.removeControl('endorsementTotalAmount');
        this.form.removeControl('paymentMethodId');
        this.form.removeControl('paymentPlanId');
        this.form.removeControl('bills');
    }
}
