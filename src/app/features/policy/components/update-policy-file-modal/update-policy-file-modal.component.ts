import { Component, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { FILE_SIZES } from '@constants/global';
import { AlertHelper } from '@core/helpers/alert.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { POLICY_ENDPOINTS } from '@policy/constants/endpoints';
import { FileUploaderComponent } from '@shared/components/file-uploader/file-uploader.component';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-update-policy-file-modal',
    templateUrl: './update-policy-file-modal.component.html',
    styles: [],
})
export class UpdatePolicyFileModalComponent {
    @ViewChild(FileUploaderComponent)
    fileUploaderComponent!: FileUploaderComponent;
    allowedFileExtensions: string[] = ['pdf'];
    fileContainerId = 'agt-file-container-update-policy';
    fileInputId = 'agt-file-input-update-policy';
    form = this._buildForm();
    maxFileSize: string = FILE_SIZES.LARGE;
    modalId = 'agt-update-policy-file-modal';
    private _isFormSubmitted = false;
    private _contactId = '';
    private _policyId = '';

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService
    ) {}

    closeModal(): void {
        this.form.reset();
        this._isFormSubmitted = false;
        ModalPlugin.hide(this.modalId);
        DropifyPlugin.reset(this.fileInputId);
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
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

    openModal(data: { contactId: string; policyId: string }): void {
        this._contactId = data.contactId;
        this._policyId = data.policyId;
        ModalPlugin.show(this.modalId);
        this._initDropify();
    }

    patchFileValue(value: string): void {
        this.form.patchValue({ file: value });
    }

    policyUploaded(): void {
        this._loadingService.hide();
        this.closeModal();
        AlertHelper.policyFileUpdated();
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._uploadPolicyFile();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            file: ['', [Validators.required]],
        });
    }

    private _initDropify(): void {
        setTimeout(() => {
            DropifyPlugin.initAux(this.allowedFileExtensions, this.maxFileSize);
        }, 0);
        this.fileUploaderComponent.init(this.fileContainerId, this.fileInputId);
    }

    private _uploadPolicyFile(): void {
        const uploadPolicyEndpoint = POLICY_ENDPOINTS.updatePolicyFile(
            this._authService.workspaceId,
            this._contactId,
            this._policyId
        );
        this.fileUploaderComponent.uploadFile([], uploadPolicyEndpoint);
    }
}
