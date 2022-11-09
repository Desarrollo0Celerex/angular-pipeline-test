import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { FREE_TEXT_LENGTH, MULTITEXT_LENGTH, SHORT_ALPHANUMERIC_LENGTH, TITULAR_NAME_LENGTH, ENDORSEMENT_TYPES } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { EndorsementType } from '@interfaces/endorsement-type.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { PolicyComplete } from '@interfaces/policy-complete.interface';
import { EndorsementTypeService } from '@services/endorsement-type.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class EndorsePolicyService {
    form: UntypedFormGroup;
    endorsementTypes: EndorsementType[];
    monthsLeftToPay: number;
    paymentMethods: PaymentMethod[];
    paymentPlans: PaymentPlan[];
    paymentPlansAvailable: PaymentPlan[];
    policy: PolicyComplete | null;
    policyAux: PolicyComplete | null;

    constructor(
        private _datePipe: DatePipe,
        private _endorsementTypeService: EndorsementTypeService,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _formBuilder: UntypedFormBuilder,
        private _policyService: PolicyService
    ) {
        this.form = this._formBuilder.group({});
        this.endorsementTypes = [];
        this.paymentMethods = [];
        this.paymentPlans = [];
        this.paymentPlansAvailable = [];
        this.policy = null;
        this.policyAux = null;
        this.monthsLeftToPay = 0;
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    /**
     * Calculate the plans of payment available
     */
    // TODO: Permitir seleccionar todos los planes de pago disponibles, pero si se selecciona algun plan que no este en los planes disponibles, alertar al usuario.
    /*calculatePaymentPlansAvailable(): void {
        if(this.policy) {
            const startDate = moment(this.policy.validityStartDate);
            const endDate = moment(UtilitiesHelper.getOriginalDateFormat(this.f.validityEndDate.value));
            const totalMonths = endDate.diff(startDate, 'months');
            this.monthsLeftToPay = totalMonths - this.policy.monthsPaid;
            this.paymentPlansAvailable = [];
            // If the policy has all their receipts paid
            if(this.monthsLeftToPay === 0) {
                // Set the same payment plan
                const paymentPlanId: number = parseInt(this.f.paymentPlanId.value);
                for(let paymentPlan of this.paymentPlans) {
                    if(paymentPlan.paymentPlanId === paymentPlanId) {
                        this.paymentPlansAvailable.push(paymentPlan);
                        break;
                    }
                }
            } else {
                // Set the payment plans available
                for(let paymentPlan of this.paymentPlans) {
                    if(paymentPlan.months < this.monthsLeftToPay) {
                        this.paymentPlansAvailable.push(paymentPlan);
                    }
                }
            }
        }
    }*/

    // NOTA: Solución deribada de la cancelación de la función anterior
    calculateMonthsLeftToPay(): void {
        if(this.policy) {
            const startDate = moment(this.policy.validityStartDate);
            const endDate = moment(UtilitiesHelper.getOriginalDateFormat(this.f.validityEndDate.value));
            const totalMonths = endDate.diff(startDate, 'months');
            this.monthsLeftToPay = totalMonths - this.policy.monthsPaid;
        }
    }

    /**
     * Calculate the new bills
     */
    calculateNewBills(): void {
        if(this.policy) {
            const selectedPaymentPlanId: number = parseInt(this.f.paymentPlanId.value);
            const selectedPaymentPlanMonths = this._getPaymentPlanMonths(selectedPaymentPlanId);
            const newBills = (!!selectedPaymentPlanMonths) ? Math.floor(this.monthsLeftToPay / selectedPaymentPlanMonths) : 1;
            const newTotalBills: number = this.policy.receiptsPaid + newBills;
            this.f.bills.setValue(newTotalBills);
        }
    }

    checkAmountFields(): void {
        const endorsementType: number = parseInt(this.f.endorsementTypeId.value);
        switch(endorsementType) {
            case ENDORSEMENT_TYPES.B:
            case ENDORSEMENT_TYPES.C:
                this.f.endorsementAmount.setValue('');
                this.f.finalPolicyAmount.setValue(this.policy!.policyAmount);
            break;
        }
    }

    /**
     * Check if the policy data was changed
     * @return True if it was changed, otherwise false
     */
    checkPolicyDataWasChanged(): boolean {
        if(!!this.policy) {
            const fieldsToEvaluate: string[] = [
                "coveredProperty",
                "policyNumber",
                "clientNumber",
                "titularName",
                "titularRfc",
                "titularPostalCode",
                "titularPhoneNumber",
                "validityEndDate",
                "endorsementAmount",
                "paymentMethodId",
                "paymentPlanId"
            ];
            const policyAux: any = {...this.policy};
            const formAux: any = this.form.value;
            for(let field of fieldsToEvaluate) {
                if(field === 'validityEndDate') {
                    policyAux[field] = this._getDateFormat(policyAux[field]);
                }
                if((typeof formAux[field] !== 'undefined') && (typeof policyAux[field] !== 'undefined') && (formAux[field] !== policyAux[field])) {
                    return true;
                }
                if(field === 'endorsementAmount' && typeof formAux[field] !== 'undefined' && formAux[field] !== '') {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Disable the endorsement form fields
     */
    disableFormFields(): void {
        this._disableAllFormFields();
        const endorsementType: number = parseInt(this.f.endorsementTypeId.value);

        switch(endorsementType) {
            case ENDORSEMENT_TYPES.A:
                this.f.titularName.enable();
                this.f.titularRfc.enable();
                this.f.titularPostalCode.enable();
                this.f.titularPhoneNumber.enable();
                this.f.coveredProperty.enable();
                this.f.policyNumber.enable();
                this.f.clientNumber.enable();
                this.f.validityEndDate.enable();
                this.f.endorsementAmount.enable();
                this.f.finalPolicyAmount.enable();
                this.f.paymentMethodId.enable();
                this.f.paymentPlanId.enable();
                break;

            case ENDORSEMENT_TYPES.B:
                this.f.titularName.enable();
                this.f.titularRfc.enable();
                this.f.titularPostalCode.enable();
                this.f.titularPhoneNumber.enable();
                this.f.coveredProperty.enable();
                this.f.policyNumber.enable();
                this.f.clientNumber.enable();
                this.f.paymentMethodId.enable();
                break;

            case ENDORSEMENT_TYPES.D:
                this.f.titularName.enable();
                this.f.titularRfc.enable();
                this.f.titularPostalCode.enable();
                this.f.titularPhoneNumber.enable();
                this.f.coveredProperty.enable();
                this.f.policyNumber.enable();
                this.f.clientNumber.enable();
                this.f.validityEndDate.enable();
                this.f.endorsementAmount.enable();
                this.f.finalPolicyAmount.enable();
                this.f.paymentMethodId.enable();
                this.f.paymentPlanId.enable();
                break;

            default:
                this.f.coveredProperty.enable();
                break;
        }
    }

    endorsePolicyWithCancellation(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBodyToEndorsePolicyWithCancellation();
        return this._policyService.endorsePolicyWithCancellation(contactId, policyId, requestBody);
    }

    endorsePolicyWithChanges(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBodyToEndorsePolicyWithChanges();
        return this._policyService.endorsePolicyWithChanges(contactId, policyId, requestBody);
    }

    endorsePolicyWithDecrement(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBodyToEndorsePolicyWithDecrement();
        return this._policyService.endorsePolicyWithDecrement(contactId, policyId, requestBody);
    }

    endorsePolicyWithIncrement(contactId: string, policyId: string, fractionalReceiptAmount: number, endorsementPaymentMethod: number): Observable<void> {
        const requestBody: FormData = this._getRequestBodyToEndorsePolicyWithIncrement(fractionalReceiptAmount, endorsementPaymentMethod);
        return this._policyService.endorsePolicyWithIncrement(contactId, policyId, requestBody);
    }

    /**
     * Get the selected paymen plan
     * @return  the selected paymen plan
     */
    getSelectedPaymentPlanName(): string {
        const paymentPlanId: number = parseInt(this.f.paymentPlanId.value);
        const selectedPaymentPlan: PaymentPlan | undefined = this.paymentPlans.find( (element: PaymentPlan) => element.paymentPlanId == paymentPlanId);
        return (!!selectedPaymentPlan) ? selectedPaymentPlan.name : '';
    }

    /**
     * Load the policy endorsement types
     * @return Notice of action done
     */
    loadEndorsementTypes(): void {
        const fields: string = 'endorsementTypeId,name';
        this._endorsementTypeService.getEndorsementTypes(fields).subscribe((res: HttpResponse) => {
            this.endorsementTypes = res.data;
        })
    }

    /**
     * Load the policy data
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          Notice of action done
     */
    loadPolicy(contactId: string, policyId: string): Observable<void> {
        const fields: string = 'policyId,policyStatusName,policyStatusBackground,policyStatusDescription,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyUrl,coveredProperty,policyNumber,clientNumber,insurerName,insurerImageUrl,titularName,titularRfc,titularPostalCode,titularPhoneNumber,emissionDate,validityStartDate,validityEndDate,policyAmount,currencyName,paymentMethodId,paymentPlanId,bills,monthsPaid,receiptsPaid,lifeTime,totalEndorsements,paymentAmount,paymentAmountPaid';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            tap((res: HttpResponse) => {
                this.policy = res.data;
                this._buildForm();
            }),
            map(() => {})
        )
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

    /**
     * Build the policy form
     */
    private _buildForm(): void {
        if(!!this.policy) {
            this.form = this._formBuilder.group({
                endorsementFile: ['', [Validators.required]],
                evidenceFile: ['', ],
                endorsementNumber: ['', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric] ],
                endorsementEmissionDate: ['', [Validators.required, ValidatorsHelper.date] ],
                endorsementTypeId: ['', [Validators.required] ],
                endorsementComments: ['', [Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext] ],
                endorsementAmount: ['', [Validators.required, ValidatorsHelper.amount] ],
                coveredProperty: [this.policy.coveredProperty, [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                policyNumber: [this.policy.policyNumber, [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                clientNumber: [this.policy.clientNumber, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                titularName: [this.policy.titularName, [Validators.required, Validators.minLength(TITULAR_NAME_LENGTH.MIN), Validators.maxLength(TITULAR_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
                titularRfc: [this.policy.titularRfc, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                titularPostalCode: [this.policy.titularPostalCode, [ValidatorsHelper.postalCode ] ],
                titularPhoneNumber: [this.policy.titularPhoneNumber, [ValidatorsHelper.phoneNumber] ],
                validityEndDate: [this._getDateFormat(this.policy.validityEndDate) || 0, [Validators.required, ValidatorsHelper.date, ValidatorsHelper.dateGreaterThan(this.policy.validityEndDate)] ],
                finalPolicyAmount: [this.policy.policyAmount, [Validators.required, ValidatorsHelper.amount] ],
                paymentMethodId: [this.policy.paymentMethodId || '', [Validators.required]],
                paymentPlanId: [this.policy.paymentPlanId || '', [Validators.required]],
                bills: [this.policy.bills || 0]
            })
        }
    }

    private _disableAllFormFields(): void {
        const fieldsToIgnore: string [] = ['endorsementFile', 'endorsementNumber', 'endorsementEmissionDate', 'endorsementTypeId', 'endorsementComments', 'evidenceFile'];
        const controls: { [key: string]: AbstractControl } = this.f;
        for(const name in controls) {
            if(!fieldsToIgnore.includes(name)) {
                controls[name].disable();
            }
        }
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
     * Get the months of payment plan
     * @param  paymentPlanId The payment plan ID
     * @return               The months
     */
    private _getPaymentPlanMonths(paymentPlanId: number): number {
        const paymentPlan: PaymentPlan | undefined = this.paymentPlans.find((element: PaymentPlan) => element.paymentPlanId == paymentPlanId);
        return (!!paymentPlan) ? paymentPlan.months : 0;
    }

    private _getRequestBodyToEndorsePolicyWithCancellation(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append('endorsementEmissionDate', this.f.endorsementEmissionDate.value);
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append('endorsementComments', this.f.endorsementComments.value);
        requestBody.append('coveredProperty', this.f.coveredProperty.value);
        return requestBody;
    }

    private _getRequestBodyToEndorsePolicyWithChanges(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append('endorsementEmissionDate', this.f.endorsementEmissionDate.value);
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append('endorsementComments', this.f.endorsementComments.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularPhoneNumber', this.f.titularPhoneNumber.value);
        requestBody.append('coveredProperty', this.f.coveredProperty.value);
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        return requestBody;
    }

    private _getRequestBodyToEndorsePolicyWithDecrement(): FormData {
        let endorsementAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.endorsementAmount.value));
        endorsementAmount = (endorsementAmount < 0) ? endorsementAmount * (-1) : endorsementAmount;
        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append('endorsementEmissionDate', this.f.endorsementEmissionDate.value);
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append('endorsementComments', this.f.endorsementComments.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularPhoneNumber', this.f.titularPhoneNumber.value);
        requestBody.append('coveredProperty', this.f.coveredProperty.value);
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('endorsementAmount', endorsementAmount.toString());
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('bills', this.f.bills.value);

        return requestBody;
    }

    private _getRequestBodyToEndorsePolicyWithIncrement(fractionalReceiptAmount: number, endorsementPaymentMethod: number): FormData {
        let endorsementAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.endorsementAmount.value));
        endorsementAmount = (endorsementAmount < 0) ? endorsementAmount * (-1) : endorsementAmount;
        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append('endorsementEmissionDate', this.f.endorsementEmissionDate.value);
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append('endorsementComments', this.f.endorsementComments.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularPhoneNumber', this.f.titularPhoneNumber.value);
        requestBody.append('coveredProperty', this.f.coveredProperty.value);
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('validityEndDate', this.f.validityEndDate.value);
        requestBody.append('endorsementAmount', endorsementAmount.toString());
        requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
        requestBody.append('bills', this.f.bills.value);
        requestBody.append('fractionalReceiptAmount', fractionalReceiptAmount.toString());
        requestBody.append('endorsementPaymentMethod', endorsementPaymentMethod.toString());

        return requestBody;
    }

}
