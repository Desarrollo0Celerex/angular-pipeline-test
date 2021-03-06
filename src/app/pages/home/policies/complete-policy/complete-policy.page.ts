import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';

import { CompletePolicyService } from './complete-policy.service';

declare var $: any;
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-complete-policy',
  templateUrl: './complete-policy.page.html',
  styles: [
  ]
})
export class CompletePolicyPage implements OnInit {
    contactId: string;
    message: string;
    policyId: string;
    policyIsLoaded: boolean;
    modalIdShowPolicy: string;
    emissionDateCalendarId: string;
    validityEndDateCalendarId: string;
    validityStartDateCalendarId: string;
    currencySelectId: string;
    paymentMethodSelectId: string;
    paymentPlanSelectId: string;
    private _isFormSubmitted: boolean;

    constructor(
        public completePolicyService: CompletePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
        this.emissionDateCalendarId = 'emissionDate';
        this.contactId = '';
        this.message = 'Verfica los datos para la nueva póliza de';
        this.policyId = '';
        this.policyIsLoaded = false;
        this.modalIdShowPolicy = 'agt-show-policy';
        this.validityEndDateCalendarId = 'validityEndDate';
        this.validityStartDateCalendarId = 'validityStartDate';
        this.currencySelectId = 'agt-currency';
        this.paymentMethodSelectId = 'agt-payment-method';
        this.paymentPlanSelectId = 'agt-payment-plan';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        this._initCalendars();
        this.completePolicyService.buildPolicyForm();
        this._loadContactPolicy();
        this._loadCurrencies();
        this._loadPaymentMethods();
        this._loadPaymentPlans();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.completePolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.completePolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Click event to show modal to view the policy
     */
    onClickShowPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Submit event to save policy
     */
    onSubmitSavePolicy(): void {
        this._isFormSubmitted = true;
        if(this.completePolicyService.policyForm.valid) {
            this.completePolicyService.completePolicy(this.contactId, this.policyId).subscribe( () => {
                AlertHelper.policyCompleted(this._goToListContactPolicies, this);
            })
        }
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    /**
     * Navigates to list contact policies
     * @param context The app context
     */
    private _goToListContactPolicies(context: CompletePolicyPage): void {
        context._router.navigateByUrl(ROUTES_NAME.listContactPolicies(context.contactId));
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.emissionDateCalendarId, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.validityStartDateCalendarId, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.validityEndDateCalendarId, this._onChangeDate, this);
    }

    /**
     * Load the contact policy
     */
    private _loadContactPolicy(): void {
        this.policyIsLoaded = false;
        this.completePolicyService.loadContactPolicy(this.contactId, this.policyId).subscribe( () => {
            this.policyIsLoaded = true;
        })
    }

    /**
     * Load the currencies
     */
    private _loadCurrencies(): void {
        this.completePolicyService.loadCurrencies().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangeCurrencyId();
        })
    }

    /**
     * Load the payment methods
     */
    private _loadPaymentMethods(): void {
        this.completePolicyService.loadPaymentMethods().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangePaymentMethodId();
        })
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.completePolicyService.loadPaymentPlans().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangePaymentPlanId();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: CompletePolicyPage): void {
        context.completePolicyService.policyForm.patchValue({[selectorId]: changedValue});
        context.completePolicyService.calculateBills();
    }

    /**
     * Event to change the currency ID value
     */
    private _onChangeCurrencyId(): void {
        $('select#'+this.currencySelectId).on('change', (element: any) => {
            this.completePolicyService.policyForm.patchValue({currencyId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the method ID value
     */
    private _onChangePaymentMethodId(): void {
        $('select#'+this.paymentMethodSelectId).on('change', (element: any) => {
            this.completePolicyService.policyForm.patchValue({paymentMethodId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the plan ID value
     */
    private _onChangePaymentPlanId(): void {
        $('select#'+this.paymentPlanSelectId).on('change', (element: any) => {
            this.completePolicyService.policyForm.patchValue({paymentPlanId: element.currentTarget.value});
            this.completePolicyService.calculateBills();
        });
    }

}
