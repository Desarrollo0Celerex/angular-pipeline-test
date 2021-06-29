import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { FREE_TEXT_LENGTH, MULTITEXT_LENGTH, SHORT_ALPHANUMERIC_LENGTH, OWN_NAME_LENGTH, ENDORSEMENT_TYPES } from '@constants/global';
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
    endorsementForm: FormGroup;
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
        private _formBuilder: FormBuilder,
        private _policyService: PolicyService
    ) {
        this.endorsementForm = this._formBuilder.group({});
        this.endorsementTypes = [];
        this.paymentMethods = [];
        this.paymentPlans = [];
        this.paymentPlansAvailable = [];
        this.policy = null;
        this.policyAux = null;
        this.monthsLeftToPay = 0;
    }

    get f(): { [key: string]: AbstractControl } {
        return this.endorsementForm.controls;
    }

    /**
     * Calculate the plans of payment available
     */
    calculatePaymentPlansAvailable(): void {
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

    /**
     * Check if can extend the validity
     * @return True if it can, otherwise false
     */
    checkCanExtendValidity(): boolean {
        const newDate: string = UtilitiesHelper.getOriginalDateFormat(this.f.validityEndDate.value);
        return (
            this.f.validityEndDate.valid
            && !!this.policy
            && (newDate !== this.policy.validityEndDate)
        ) ? true : false;
    }

    /**
     * Check if the policy data was updated
     * @return True if it was updated, otherwise false
     */
    checkIsPolicyChanged(): boolean {
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
            const endorsementFormAux: any = this.endorsementForm.value;
            for(let field of fieldsToEvaluate) {
                if(field === 'validityEndDate') {
                    policyAux[field] = this._getDateFormat(policyAux[field]);
                }
                if((typeof endorsementFormAux[field] !== 'undefined') && (typeof policyAux[field] !== 'undefined') && (endorsementFormAux[field] !== policyAux[field])) {
                    return true;
                }
                if(field === 'endorsementAmount' && typeof endorsementFormAux[field] !== 'undefined' && endorsementFormAux[field] !== '') {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Disable the endorsement form fields
     */
    disableEndorsementFormFields(): void {
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
                this.f.paymentMethodId.enable();
                this.f.paymentPlanId.enable();
                break;

            default:
                this.f.coveredProperty.enable();
                break;
        }
    }

    /**
     * Endorse the policy
     * @param  contactId                The contact ID
     * @param  policyId                 The policy ID
     * @param  fractionalReceiptAmount  The fractional receipt amount
     * @param  endorsementPaymentMethod The endorsement payment method
     * @return                          Notice of action done
     */
    endorsePolicy(contactId: string, policyId: string, fractionalReceiptAmount: number, endorsementPaymentMethod: number): Observable<void> {
        const requestBody: FormData = this._getRequestBody(fractionalReceiptAmount, endorsementPaymentMethod);
        return this._policyService.endorseContactPolicy(contactId, policyId, requestBody);
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
    loadEndorsementTypes(): Observable<void> {
        const fields: string = 'endorsementTypeId,name';
        return this._endorsementTypeService.getEndorsementTypes(fields).pipe(
            tap( (res: HttpResponse) => {
                this.endorsementTypes = res.data;
            }),
            map( () => { })
        );
    }

    /**
     * Load the policy data
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          Notice of action done
     */
    loadPolicy(contactId: string, policyId: string): Observable<void> {
        const fields: string = 'policyId,policyStatusName,policyStatusBackground,policyStatusDescription,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyUrl,coveredProperty,policyNumber,clientNumber,insurerName,insurerImageUrl,titularName,titularRfc,titularPostalCode,titularPhoneNumber,emissionDate,validityStartDate,validityEndDate,policyAmount,currencyName,paymentMethodId,paymentPlanId,bills,monthsPaid,receiptsPaid,lifeTime,totalEndorsements';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            tap((res: HttpResponse) => {
                this.policy = res.data;
                this._buildEndorsementForm();
            }),
            map(() => {})
        )
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
     * Build the policy form
     */
    private _buildEndorsementForm(): void {
        if(!!this.policy) {
            this.endorsementForm = this._formBuilder.group({
                endorsementFile: ['', [Validators.required]],
                endorsementNumber: ['', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric] ],
                endorsementEmissionDate: ['', [Validators.required, ValidatorsHelper.date] ],
                endorsementTypeId: ['', [Validators.required] ],
                endorsementComments: ['', [Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext] ],
                coveredProperty: [this.policy.coveredProperty, [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                policyNumber: [this.policy.policyNumber, [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                clientNumber: [this.policy.clientNumber, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                titularName: [this.policy.titularName, [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
                titularRfc: [this.policy.titularRfc, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                titularPostalCode: [this.policy.titularPostalCode, [ValidatorsHelper.postalCode ] ],
                titularPhoneNumber: [this.policy.titularPhoneNumber, [ValidatorsHelper.phoneNumber] ],
                validityEndDate: [this._getDateFormat(this.policy.validityEndDate) || 0, [Validators.required, ValidatorsHelper.date, ValidatorsHelper.dateGreaterThan(this.policy.validityEndDate)] ],
                endorsementAmount: ['', [Validators.required, ValidatorsHelper.amount] ],
                paymentMethodId: [this.policy.paymentMethodId || '', [Validators.required]],
                paymentPlanId: [this.policy.paymentPlanId || '', [Validators.required]],
                bills: [this.policy.bills || 0]
            })
        }
    }

    private _disableAllFormFields(): void {
        const fieldsToIgnore: string [] = ['endorsementFile', 'endorsementNumber', 'endorsementEmissionDate', 'endorsementTypeId', 'endorsementComments'];
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

    /**
     * Get the request body
     * @param  fractionalReceiptAmount  The fractional receipt amount
     * @param  endorsementPaymentMethod The method of payment of the endorsement
     * @return                          The request body
     */
    private _getRequestBody(fractionalReceiptAmount: number, endorsementPaymentMethod: number): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append('endorsementEmissionDate', this.f.endorsementEmissionDate.value);
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
        requestBody.append('endorsementComments', this.f.endorsementComments.value);
        requestBody.append('coveredProperty', this.f.coveredProperty.value);
        requestBody.append('policyNumber', this.f.policyNumber.value);
        requestBody.append('clientNumber', this.f.clientNumber.value);
        requestBody.append('titularName', this.f.titularName.value);
        requestBody.append('titularRfc', this.f.titularRfc.value);
        requestBody.append('titularPostalCode', this.f.titularPostalCode.value);
        requestBody.append('titularPhoneNumber', this.f.titularPhoneNumber.value);

        if(!!this.policy) {
            const validityEndDate: string = UtilitiesHelper.getOriginalDateFormat(this.f.validityEndDate.value);
            if(this.policy.validityEndDate != validityEndDate) {
                requestBody.append('validityEndDate', this.f.validityEndDate.value);
            }

            if(!!this.f.endorsementAmount.value && !!this.f.endorsementTypeId.value) {
                const endorsementAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.f.endorsementAmount.value));
                const policyAmount: number = parseFloat(this.policy.policyAmount.toString());
                const newAmount: number = (this.f.endorsementTypeId.value == ENDORSEMENT_TYPES.A) ? policyAmount + endorsementAmount : policyAmount - endorsementAmount ;
                requestBody.append('newAmount', newAmount.toString());
            }

            if(this.policy.paymentMethodId != this.f.paymentMethodId.value) {
                requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
            }

            if(this.policy.paymentPlanId != this.f.paymentPlanId.value) {
                requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
            }

            if(this.policy.bills != this.f.bills.value) {
                requestBody.append('bills', this.f.bills.value);
            }
        }

        if(!!fractionalReceiptAmount) {
            requestBody.append('fractionalReceiptAmount', fractionalReceiptAmount.toString());
        }

        if(!!endorsementPaymentMethod) {
            requestBody.append('endorsementPaymentMethod', endorsementPaymentMethod.toString());
        }

        return requestBody;
    }
}
