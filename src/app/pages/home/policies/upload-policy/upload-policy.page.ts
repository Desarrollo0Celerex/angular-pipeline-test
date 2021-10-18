import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FILE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { UploadPolicyService } from './upload-policy.service';

declare var DropifyPlugin: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-upload-policy',
  templateUrl: './upload-policy.page.html',
  styles: [
  ]
})
export class UploadPolicyPage implements OnInit, OnDestroy {
    ROUTES_NAME: any;
    contactId: string;
    isLoadingContent: boolean;
    message: string;
    policy: { policyUrl: string, insurerId: number, insurerName: string };
    policyId: string;
    private _allowedFileTypes: string[];
    private _comesFromRenewalPolicy: boolean = false;
    private _isFormSubmitted: boolean;
    private _subParams: any;
    private _canShowPreview: boolean = true;
    private _maxFileSize: string = '6M';

    constructor(
        public uploadPolicyService: UploadPolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.ROUTES_NAME = ROUTES_NAME;
        this.contactId = '';
        this.isLoadingContent = true;
        this.message = 'Selecciona la póliza digital que deseas cargar para';
        this.policy = { policyUrl: '', insurerId: 0, insurerName: '' };
        this.policyId = '';
        this._allowedFileTypes = ['pdf'];
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        DropifyPlugin.init(FILE_TYPES.DOCUMENT, this._allowedFileTypes, this._canShowPreview, this._maxFileSize);
        this.uploadPolicyService.buildPolicyForm();
        this._getContactPolicy();
        this._comesFromRenewalPolicy = (!!history.state && !!history.state.comesFromRenewalPolicy) ? true : false;
    }

    ngOnDestroy(): void {
        if(!!this._subParams) this._subParams.unsubscribe();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.uploadPolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.uploadPolicyService.policyForm.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
        if(constrolName === 'policyFile') {
            return (validationClass === 'is-valid') ? 'agt-is-valid' : (validationClass === 'is-invalid') ? 'agt-is-invalid' : '';
        }
        return validationClass;
    }

    /**
     * Change event to catch the file selected
     * @param event The event lounched
     */
    onChangePolicyFile(event: any): void {
        if (event.target.files.length > 0) {
            const policyFile = event.target.files[0];
            this.uploadPolicyService.policyForm.patchValue({policyFile});
        }
    }

    /**
     * Submit event to upload the policy
     */
    onSubmitUploadPolicy(): void {
        this._isFormSubmitted = true;
        if(this.uploadPolicyService.policyForm.valid) {
            this._loadingService.show();
            this.uploadPolicyService.uploadContactPolicy(this.contactId, this.policyId).subscribe( () => {
                this._loadingService.hide();
                AlertHelper.policyUploaded(this._goToCompletePolicy, this);
            });
        }
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        // Params
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    /**
     * Get the contact policy
     */
    private _getContactPolicy(): void {
        this.uploadPolicyService.getContactPolicy(this.contactId, this.policyId).subscribe( (res: HttpResponse) => {
            this.isLoadingContent = false;
            this.policy = res.data;
            // If you have already uploaded the file
            if(!!this.policy.policyUrl) {
                this._router.navigateByUrl(ROUTES_NAME.completePolicy(this.contactId, this.policyId));
            }
            else {
                // If the policy comes from a renewal
                if(!!this._comesFromRenewalPolicy) {
                    this.uploadPolicyService.policyForm.patchValue({insurerId: this.policy.insurerId});
                }
                this._loadInsurers();
            }
        })
    }

    /**
     * Navigates to complete the contact policy
     * @param context The app context
     * @param data    The data to do the action
     */
    private _goToCompletePolicy(context: UploadPolicyPage): void {
        context._router.navigateByUrl(ROUTES_NAME.completePolicy(context.contactId, context.policyId));
    }

    /**
     * Load the insurers
     */
    private _loadInsurers(): void {
        this.uploadPolicyService.loadInsurers().subscribe( () => {
            Select2Plugin.initSearch(this._onItemSelected, this);
        });
    }

    /**
     * Event to update the selected insurer
     * @param  context      The app context
     * @param  selectedItem The selected item
     */
    private _onItemSelected(context: UploadPolicyPage, selectedItem: number): void {
        context.uploadPolicyService.policyForm.patchValue({insurerId: selectedItem});
    }

}
