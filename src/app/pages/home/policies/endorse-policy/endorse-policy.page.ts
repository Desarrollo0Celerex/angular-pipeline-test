import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@services/loading.service';

import { EndorsePolicyService } from './endorse-policy.service';

declare var $: any;
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-endorse-policy',
  templateUrl: './endorse-policy.page.html',
  styles: [
  ]
})
export class EndorsePolicyPage implements OnInit {
    calendarIdEmissionDate: string;
    calendarIdEndorsementEmissionDate: string;
    calendarIdValidityEndDate: string;
    calendarIdValidityStartDate: string;
    contactId: string;
    message: string;
    modalIdConfirmApplyEndorsement: string;
    modalIdUploadPolicyEndorsement: string;
    policyId: string;
    selectIdCurrency: string;
    selectIdEndorsementType: string;
    selectIdPaymentMethod: string;
    selectIdPaymentPlan: string;
    private _isFormSubmitted: boolean;

    constructor(
        public endorsePolicyService: EndorsePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.calendarIdEmissionDate = 'emissionDate';
        this.calendarIdEndorsementEmissionDate = 'endorsementEmissionDate';
        this.calendarIdValidityEndDate = 'validityEndDate';
        this.calendarIdValidityStartDate = 'validityStartDate';
        this.contactId = '';
        this.message = 'Captura el endoso para la póliza de';
        this.modalIdConfirmApplyEndorsement = 'agt-confirm-apply-endorsement';
        this.modalIdUploadPolicyEndorsement = 'agt-upload-policy-endorsement';
        this.policyId = '';
        this.selectIdCurrency = 'agt-currency';
        this.selectIdEndorsementType = 'agt-endorse-type';
        this.selectIdPaymentMethod = 'agt-payment-method';
        this.selectIdPaymentPlan = 'agt-payment-plan';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadPolicy();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.endorsePolicyService.endorsementForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.endorsePolicyService.endorsementForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Event to apply endorsement
     */
    onApplyEndorsement(): void {
        this._loadingService.show();
        this.endorsePolicyService.endorseContactPolicy(this.contactId, this.policyId).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyEndorsed(this._goToListContactPolicies, this);
        })
    }

    /**
     * Click event to show modal to upload policy endorsement
     */
    onClickUploadEndorsement(): void {
        ModalPlugin.show(this.modalIdUploadPolicyEndorsement);
    }

    /**
     * Event to save the selected file
     * @param file The selected file
     */
    onFileSelected(file: File): void {
        this.endorsePolicyService.endorsementForm.patchValue({ endorsementFile: file})
    }

    /**
     * Submit event to save endorsement
     */
    onSubmitSaveEndorsement(): void {
        this._isFormSubmitted = true;
        if(this.endorsePolicyService.endorsementForm.valid) {
            ModalPlugin.show(this.modalIdConfirmApplyEndorsement);
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
    private _goToListContactPolicies(context: EndorsePolicyPage): void {
        context._router.navigateByUrl(ROUTES_NAME.listContactPolicies(context.contactId));
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdEmissionDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdEndorsementEmissionDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdValidityEndDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdValidityStartDate, this._onChangeDate, this);
    }

    /**
     * Load the policy data
     */
    private _loadPolicy(): void {
        this.endorsePolicyService.loadPolicy(this.contactId, this.policyId).subscribe( () => {
            this._loadCurrencies();
            this._loadEndorsementTypes();
            this._loadPaymentMethods();
            this._loadPaymentPlans();
            this._initCalendars();
            this.endorsePolicyService.disableEndorsementFormFields();
        })
    }

    /**
     * Load the currencies
     */
    private _loadCurrencies(): void {
        this.endorsePolicyService.loadCurrencies().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangeCurrencyId();
        })
    }

    /**
     * Load the currencies
     */
    private _loadEndorsementTypes(): void {
        this.endorsePolicyService.loadEndorsementTypes().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangeEndorsementTypeId();
        })
    }

    /**
     * Load the payment methods
     */
    private _loadPaymentMethods(): void {
        this.endorsePolicyService.loadPaymentMethods().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangePaymentMethodId();
        })
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.endorsePolicyService.loadPaymentPlans().subscribe( () => {
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
    private _onChangeDate(selectorId: string, changedValue: string, context: EndorsePolicyPage): void {
        context.endorsePolicyService.endorsementForm.patchValue({[selectorId]: changedValue});
    }

    /**
     * Event to change the currency ID value
     */
    private _onChangeCurrencyId(): void {
        $('select#'+this.selectIdCurrency).on('change', (element: any) => {
            this.endorsePolicyService.endorsementForm.patchValue({currencyId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the currency ID value
     * And disable the fields of the endorsement form
     */
    private _onChangeEndorsementTypeId(): void {
        $('select#'+this.selectIdEndorsementType).on('change', (element: any) => {
            this.endorsePolicyService.endorsementForm.patchValue({endorsementTypeId: element.currentTarget.value});
            this.endorsePolicyService.disableEndorsementFormFields();
        });
    }

    /**
     * Event to change the method ID value
     */
    private _onChangePaymentMethodId(): void {
        $('select#'+this.selectIdPaymentMethod).on('change', (element: any) => {
            this.endorsePolicyService.endorsementForm.patchValue({paymentMethodId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the plan ID value
     */
    private _onChangePaymentPlanId(): void {
        $('select#'+this.selectIdPaymentPlan).on('change', (element: any) => {
            this.endorsePolicyService.endorsementForm.patchValue({paymentPlanId: element.currentTarget.value});
        });
    }

}
