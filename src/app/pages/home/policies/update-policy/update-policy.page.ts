import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { DOCUMENT_FORMATS, FILE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@services/loading.service';

import { UpdatePolicyService } from './update-policy.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-update-policy',
  templateUrl: './update-policy.page.html',
  styles: [
  ]
})
export class UpdatePolicyPage implements OnInit {
    ROUTES_NAME: any;
    calendarIdEmissionDate: string;
    calendarIdValidityStartDate: string;
    calendarIdValidityEndDate: string;
    contactId: string;
    message: string;
    modalIdSelectFile: string;
    modalIdShowPolicy: string;
    modalSelectFileData: ModalSelectFileData;
    policyId: string;
    private _isFormSubmitted: boolean;

    constructor(
        public updatePolicyService: UpdatePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.ROUTES_NAME = ROUTES_NAME;
        this.calendarIdEmissionDate = 'emissionDate';
        this.calendarIdValidityStartDate = 'validityStartDate';
        this.calendarIdValidityEndDate = 'validityEndDate';
        this.contactId = '';
        this.message = 'Actualiza los datos de la póliza de';
        this.modalIdSelectFile = 'agt-select-file';
        this.modalIdShowPolicy = 'agt-show-policy';
        this.modalSelectFileData = {
            title: 'Actualizar Póliza',
            description: 'Selecciona el formato digital de la póliza.',
            buttonLabel: 'Cargar poliza',
            formats: DOCUMENT_FORMATS,
            fileType: FILE_TYPES.DOCUMENT
        }
        this.policyId = '';
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
        const control: AbstractControl | null = this.updatePolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.updatePolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
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
        this.updatePolicyService.policyForm.patchValue({policyFile: policyFile});
    }

    /**
     * Submit event to update the policy
     */
    onSubmitUpdatePolicy(): void {
        this._isFormSubmitted = true;
        if(this.updatePolicyService.policyForm.valid) {
            this._loadingService.show();
            this.updatePolicyService.updateContactPolicy(this.contactId, this.policyId).subscribe(() => {
                this._loadingService.hide();
                AlertHelper.policyUpdated(this._goToListContactPolicies, this);
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
    private _goToListContactPolicies(context: UpdatePolicyPage): void {
        context._router.navigateByUrl(ROUTES_NAME.listContactPolicies(context.contactId));
    }

    /**
     * Load the policy data
     */
    private _loadPolicy(): void {
        this.updatePolicyService.loadPolicy(this.contactId, this.policyId).subscribe( () => {
            this._initCalendars();
        })
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
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: UpdatePolicyPage): void {
        context.updatePolicyService.policyForm.patchValue({[selectorId]: changedValue});
    }

}
