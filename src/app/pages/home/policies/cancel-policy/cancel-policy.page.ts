import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@services/loading.service';

import { CancelPolicyService } from './cancel-policy.service';

declare var $: any;
declare var ModalPlugin: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-cancel-policy',
  templateUrl: './cancel-policy.page.html',
  styles: [
  ]
})
export class CancelPolicyPage implements OnInit {
    contactId: string;
    message: string;
    modalIdConfirmAction: string;
    modalIdSelectFile: string;
    modalIdShowPolicy: string;
    modalSelectFileData: ModalSelectFileData;
    policyId: string;
    selectIdPolicyCancellationReason: string;
    private _isFormSubmitted: boolean;

    constructor(
        public cancelPolicyService: CancelPolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.contactId = '';
        this.message = 'Confirma los datos para cancelar la póliza de';
        this.modalIdConfirmAction = 'agt-confirm-action';
        this.modalIdSelectFile = 'agt-select-file';
        this.modalIdShowPolicy = 'agt-show-policy';
        this.modalSelectFileData = {
            title: 'Adjuntar Evidencia',
            description: 'Selecciona el formato digital de la evidencia de cancelación.',
            buttonLabel: 'Cargar evidencia'
        }
        this.policyId = '';
        this.selectIdPolicyCancellationReason = 'policyCancellationReasonId';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this.cancelPolicyService.buildCancellationForm();
        this._catchParams();
        this._loadPolicy();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.cancelPolicyService.cancellationForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.cancelPolicyService.cancellationForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Event to do the action confirmed
     */
    onActionConfirmed(): void {
        this._loadingService.show();
        this.cancelPolicyService.cancelPolicy(this.contactId, this.policyId).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyCancelled(this._goToListContactPolicies, this);
        })
    }

    /**
     * Click event to show modal and select the file
     */
    onClickSelectFile(): void {
        ModalPlugin.show(this.modalIdSelectFile);
    }

    /**
     * Click event to show the policy
     */
    onClickShowPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to save the selected file
     * @param file The selected file
     */
    onFileSelected(file: File): void {
        this.cancelPolicyService.cancellationForm.patchValue({ evidenceFile: file})
    }

    /**
     * Submit event to cancel policy
     */
    onSubmitCancelPolicy(): void {
        this._isFormSubmitted = true;
        if(this.cancelPolicyService.cancellationForm.valid) {
            ModalPlugin.show(this.modalIdConfirmAction);
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
    private _goToListContactPolicies(context: CancelPolicyPage): void {
        context._router.navigateByUrl(ROUTES_NAME.listContactPolicies(context.contactId));
    }

    /**
     * Load the policy data
     */
    private _loadPolicy(): void {
        this.cancelPolicyService.loadPolicy(this.contactId, this.policyId).subscribe( () => {
            this._loadPolicyCancellationReasons();
        })
    }

    /**
     * Load the policy cancellation reasons
     */
    private _loadPolicyCancellationReasons(): void {
        this.cancelPolicyService.loadPolicyCancellationReasons().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangePolicyCancellationReasonId();
        })
    }

    /**
     * Event to change the currency ID value
     */
    private _onChangePolicyCancellationReasonId(): void {
        $('select#'+this.selectIdPolicyCancellationReason).on('change', (element: any) => {
            this.cancelPolicyService.cancellationForm.patchValue({policyCancellationReasonId: element.currentTarget.value});
        });
    }

}
