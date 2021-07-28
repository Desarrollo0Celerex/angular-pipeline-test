import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { DOCUMENT_FORMATS, FILE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@services/loading.service';

import { UpdateCompletePolicyService } from './update-complete-policy.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-update-complete-policy',
  templateUrl: './update-complete-policy.page.html',
  styles: [
  ],
  providers: [UpdateCompletePolicyService]
})
export class UpdateCompletePolicyPage implements OnInit {
    calendarIdEmissionDate: string = 'emissionDate';
    calendarIdValidityEndDate: string = 'validityEndDate';
    calendarIdValidityStartDate: string = 'validityStartDate';
    contactId: string = '';
    message: string = 'Actualiza los datos de la póliza de';
    modalIdPolicyAmountsDifferent: string = 'agt-policy-amounts-different';
    modalIdSelectFile: string = 'agt-select-file';
    modalIdShowPolicy: string = 'agt-show-policy';
    modalSelectFileData: ModalSelectFileData = {
        title: 'Actualizar Póliza',
        description: 'Selecciona el formato digital de la póliza.',
        buttonLabel: 'Cargar poliza',
        formats: DOCUMENT_FORMATS,
        fileType: FILE_TYPES.DOCUMENT
    };
    policyId: string = '';
    private _isFormSubmitted: boolean = false;

    constructor(
        public updateCompletePolicyService: UpdateCompletePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

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
        const control: AbstractControl | null = this.updateCompletePolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.updateCompletePolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Change event to calculate the bills
     */
    onChangeCalculateBills(): void {
        //this.updateCompletePolicyService.calculateBills();
    }

    /**
     * Click event to show modal to select policy
     */
    onClickSelectPolicy(): void {
        ModalPlugin.show(this.modalIdSelectFile);
    }

    /**
     * Click event to show modal to view the policy
     */
    onClickShowPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to update the form policy file
     */
    onPolicySelected(policyFile: File): void {
        this.updateCompletePolicyService.policyForm.patchValue({policyFile: policyFile});
    }

    /**
     * Submit event to save policy
     */
    onSubmitSavePolicy(): void {
        this._isFormSubmitted = true;
        if(this.updateCompletePolicyService.policyForm.valid) {
            if(this.updateCompletePolicyService.checkPolicyAmounts()) {
                this._loadingService.show();
                this.updateCompletePolicyService.updateCompletePolicy(this.contactId, this.policyId).subscribe( () => {
                    this._loadingService.hide();
                    AlertHelper.policyUpdated(this._goToListContactPolicies, this);
                })
            } else {
                ModalPlugin.show(this.modalIdPolicyAmountsDifferent);
            }
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
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdEmissionDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdValidityStartDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdValidityEndDate, this._onChangeDate, this);
    }

    /**
     * Navigates to list contact policies
     * @param context The app context
     */
    private _goToListContactPolicies(context: UpdateCompletePolicyPage): void {
        context._router.navigateByUrl(ROUTES_NAME.listContactPolicies(context.contactId));
    }

    /**
     * Load the currencies
     */
    private _loadCurrencies(): void {
        this.updateCompletePolicyService.loadCurrencies().subscribe( () => {
        })
    }

    /**
     * Load the payment methods
     */
    private _loadPaymentMethods(): void {
        this.updateCompletePolicyService.loadPaymentMethods().subscribe( () => {
        })
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.updateCompletePolicyService.loadPaymentPlans().subscribe( () => {
            //this.updateCompletePolicyService.calculateBills();
        })
    }

    /**
     * Load the policy data
     */
    private _loadPolicy(): void {
        this.updateCompletePolicyService.loadPolicy(this.contactId, this.policyId).subscribe( (res: HttpResponse) => {
            this.updateCompletePolicyService.buildPolicyForm(res.data);
            this._initCalendars();
            this._loadCurrencies();
            this._loadPaymentMethods();
            this._loadPaymentPlans();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: UpdateCompletePolicyPage): void {
        context.updateCompletePolicyService.policyForm.patchValue({[selectorId]: changedValue});
        //context.updateCompletePolicyService.calculateBills();
    }

}
