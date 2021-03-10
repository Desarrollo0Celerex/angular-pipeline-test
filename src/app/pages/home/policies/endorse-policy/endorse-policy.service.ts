import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FREE_TEXT_LENGTH, OWN_NAME_LENGTH, DEFAULT_CURRENCY_ID, DEFAULT_METHOD_ID, DEFAULT_PLAN_ID, DEFAULT_ENDORSEMENT_TYPE_ID, ENDORSEMENT_TYPES } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Currency } from '@interfaces/currency.interface';
import { EndorsementType } from '@interfaces/endorsement-type.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { PolicyComplete } from '@interfaces/policy-complete.interface';
import { CurrencyService } from '@services/currency.service';
import { EndorsementTypeService } from '@services/endorsement-type.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class EndorsePolicyService {
    currencies: Currency[];
    endorsementForm: FormGroup;
    endorsementTypes: EndorsementType[];
    paymentMethods: PaymentMethod[];
    paymentPlans: PaymentPlan[];
    policy: PolicyComplete | null;

    constructor(
        private _currencyService: CurrencyService,
        private _datePipe: DatePipe,
        private _endorsementTypeService: EndorsementTypeService,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService,
        private _formBuilder: FormBuilder,
        private _policyService: PolicyService
    ) {
        this.currencies = [];
        this.endorsementForm = this._formBuilder.group({});
        this.endorsementTypes = [];
        this.paymentMethods = [];
        this.paymentPlans = [];
        this.policy = null;
    }

    get f(): { [key: string]: AbstractControl } {
        return this.endorsementForm.controls;
    }

    /**
     * Disable the endorsement form fields
     */
    disableEndorsementFormFields(): void {
        const endorsementType: number = parseInt(this.f.endorsementTypeId.value);

        this.f.amount.enable();
        this.f.currencyId.enable();
        this.f.paymentMethodId.enable();
        this.f.paymentPlanId.enable();
        this.f.bills.enable();

        switch(endorsementType) {
            case ENDORSEMENT_TYPES.PAYMENT_METHOD_CHANGE:
                this.f.amount.disable();
                this.f.currencyId.disable();
                this.f.paymentPlanId.disable();
                this.f.bills.disable();
                break;

            case ENDORSEMENT_TYPES.POLICY_REHABILITATION:
                this.f.amount.disable();
                this.f.currencyId.disable();
                this.f.paymentMethodId.disable();
                this.f.paymentPlanId.disable();
                this.f.bills.disable();
                break;
        }
    }

    /**
     * Endorse the contact policy
     * @param  contactId The contact ID
     * @param  policyId  The policy ID
     * @return           Notice of action done
     */
    endorseContactPolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._policyService.endorseContactPolicy(contactId, policyId, requestBody);
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
        const fields: string = 'policyId,policyStatusName,policyStatusBackground,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyUrl,coveredProperty,policyNumber,clientNumber,insurerName,titularName,titularRfc,titularPostalCode,titularPhoneNumber,emissionDate,validityStartDate,validityEndDate,amount,currencyId,paymentMethodId,paymentPlanId,bills';
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
                endorsementNumber: ['', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                endorsementEmissionDate: ['', [Validators.required, ValidatorsHelper.date] ],
                endorsementTypeId: [DEFAULT_ENDORSEMENT_TYPE_ID, [Validators.required] ],
                coveredProperty: [this.policy.coveredProperty || '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                policyNumber: [this.policy.policyNumber || '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                clientNumber: [this.policy.clientNumber || '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                emissionDate: [this._getDateFormat(this.policy.emissionDate) || '', [Validators.required, ValidatorsHelper.date] ],
                validityStartDate: [this._getDateFormat(this.policy.validityStartDate) || '', [Validators.required, ValidatorsHelper.date] ],
                validityEndDate: [this._getDateFormat(this.policy.validityEndDate) || '', [Validators.required, ValidatorsHelper.date] ],
                titularName: [this.policy.titularName || '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
                titularRfc: [this.policy.titularRfc || '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                titularPostalCode: [this.policy.titularPostalCode || '', [Validators.required, ValidatorsHelper.postalCode ] ],
                titularPhoneNumber: [this.policy.titularPhoneNumber || '', [ValidatorsHelper.phoneNumber] ],
                amount: [this.policy.amount || '', [ValidatorsHelper.amount] ],
                currencyId: [this.policy.currencyId || DEFAULT_CURRENCY_ID, [Validators.required]],
                paymentMethodId: [this.policy.paymentMethodId || DEFAULT_METHOD_ID, [Validators.required]],
                paymentPlanId: [this.policy.paymentPlanId || DEFAULT_PLAN_ID, [Validators.required]],
                bills: [this.policy.bills || '', [Validators.required, ValidatorsHelper.number]]
            })
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
            const formattedDate: string | null = this._datePipe.transform(date, 'dd/MM/YYYY');
            dateFormat = (!!formattedDate) ? formattedDate : '';
        }
        return dateFormat;
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('endorsementFile', this.f.endorsementFile.value);
        requestBody.append('endorsementNumber', this.f.endorsementNumber.value);
        requestBody.append('endorsementEmissionDate', this.f.endorsementEmissionDate.value);
        requestBody.append('endorsementTypeId', this.f.endorsementTypeId.value);
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
        if(this.f.endorsementTypeId.value != ENDORSEMENT_TYPES.POLICY_REHABILITATION && this.f.endorsementTypeId.value != ENDORSEMENT_TYPES.POLICY_REHABILITATION) {
            requestBody.append('amount', this.f.amount.value);
            requestBody.append('currencyId', this.f.currencyId.value);
            requestBody.append('paymentPlanId', this.f.paymentPlanId.value);
            requestBody.append('bills', this.f.bills.value);
        }
        if(this.f.endorsementTypeId.value != ENDORSEMENT_TYPES.POLICY_REHABILITATION) {
            requestBody.append('paymentMethodId', this.f.paymentMethodId.value);
        }
        return requestBody;
    }
}
