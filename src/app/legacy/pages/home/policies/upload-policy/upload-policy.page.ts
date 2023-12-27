import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FILE_SIZES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { POLICY_ENDPOINTS } from '@services/policy.service';

import { UploadPolicyService } from './upload-policy.service';
import { FileParam } from '@components/file-uploader/file-uploader.component';

declare var DropifyPlugin: any;
declare var Select2Plugin: any;

@Component({
    selector: 'agt-upload-policy',
    templateUrl: './upload-policy.page.html',
    styles: [],
})
export class UploadPolicyPage implements OnInit, OnDestroy {
    @ViewChild('fileUploader') fileUploader: any;
    ROUTES_NAME: any = ROUTES_NAME;
    allowedFileExtensions: string[] = ['pdf'];
    contactId: string = '';
    fileEndpoint: string = '';
    isLoadingContent: boolean = true;
    maxFileSize: string = FILE_SIZES.LARGE;
    policy: {
        policyUrl: string;
        insurerId: number;
        insurerName: string;
        workspaceCountryId: number;
    } = { policyUrl: '', insurerId: 0, insurerName: '', workspaceCountryId: 0 };
    policyId: string = '';
    searchIdInsurers: string = 'insurerId';
    private _comesFromRenewalPolicy: boolean = false;
    private _isFormSubmitted: boolean = false;
    private _subParams: any;
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        public uploadPolicyService: UploadPolicyService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this.fileEndpoint = POLICY_ENDPOINTS.uploadContactPolicy(
            this._workspaceId,
            this.contactId,
            this.policyId
        );
        DropifyPlugin.initAux(this.allowedFileExtensions, this.maxFileSize);
        this.uploadPolicyService.buildPolicyForm();
        this._getContactPolicy();
        this._comesFromRenewalPolicy =
            !!history.state && !!history.state.comesFromRenewalPolicy
                ? true
                : false;
    }

    ngOnDestroy(): void {
        if (!!this._subParams) this._subParams.unsubscribe();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.uploadPolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.uploadPolicyService.policyForm.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'file') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    /**
     * Submit event to upload the policy
     */
    onSubmitUploadPolicy(): void {
        this._isFormSubmitted = true;
        if (this.uploadPolicyService.policyForm.valid) {
            const fileParams: FileParam[] = this._generateFileParams();
            this.fileUploader.uploadFile(fileParams);
        }
    }

    patchFileValue(value: string): void {
        this.uploadPolicyService.policyForm.patchValue({ file: value });
    }

    policyUploaded(): void {
        AlertHelper.policyUploaded(this._goToCompletePolicy, this);
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _generateFileParams(): FileParam[] {
        return [
            {
                name: 'insurerId',
                value: this.uploadPolicyService.f.insurerId.value,
            },
        ];
    }

    private _getContactPolicy(): void {
        this.uploadPolicyService
            .getContactPolicy(this.contactId, this.policyId)
            .subscribe((res: HttpResponse) => {
                this.isLoadingContent = false;
                this.policy = res.data;
                // If you have already uploaded the file
                if (!!this.policy.policyUrl) {
                    this._router.navigateByUrl(
                        ROUTES_NAME.completePolicy(
                            this.contactId,
                            this.policyId
                        )
                    );
                } else {
                    // If the policy comes from a renewal
                    if (!!this._comesFromRenewalPolicy) {
                        this.uploadPolicyService.policyForm.patchValue({
                            insurerId: this.policy.insurerId,
                        });
                    }
                    this._loadCountryInsurers(
                        this.policy.workspaceCountryId,
                        this.policy.insurerId
                    );
                }
            });
    }

    private _goToCompletePolicy(context: UploadPolicyPage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.completePolicy(context.contactId, context.policyId)
        );
    }

    private _loadCountryInsurers(countryId: number, insurerId: number): void {
        this.uploadPolicyService
            .loadCountryInsurers(countryId)
            .subscribe(() => {
                Select2Plugin.initSearch(
                    this.searchIdInsurers,
                    this._onItemSelected,
                    this
                );
                setTimeout(() => {
                    Select2Plugin.setValue(this.searchIdInsurers, insurerId);
                }, 0);
            });
    }

    private _onItemSelected(
        context: UploadPolicyPage,
        selectedItem: number,
        elementId: string
    ): void {
        context.uploadPolicyService.policyForm.patchValue({
            [elementId]: selectedItem,
        });
    }
}
