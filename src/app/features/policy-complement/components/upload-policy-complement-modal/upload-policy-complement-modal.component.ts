import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { FILE_SIZES } from '@constants/global';
import { FileHelper } from '@core/helpers/file.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { PolicyComplement } from '@policy-complement/interfaces/policy-complement.interface';
import { PolicyComplementService } from '@policy-complement/services/policy-complement.service';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-upload-policy-complement-modal',
    templateUrl: './upload-policy-complement-modal.component.html',
    styles: [],
})
export class UploadPolicyComplementModalComponent {
    @Input() contactId = '';
    @Input() policyId = '';
    @Output() complementUploaded = new EventEmitter<PolicyComplement>();
    allowedFileExtensions: string[] = [
        'pdf',
        'png',
        'jpg',
        'jpeg',
        'gif',
        'bmp',
        'doc',
        'docx',
        'txt',
        'csv',
        'xls',
        'xlsx',
        'zip',
        'rar',
    ];
    form = this._buildForm();
    isInitializedComponent = false;
    maxFileSize: string = FILE_SIZES.SMALL;
    modalId = 'agt-upload-policy-complement-modal';
    private _isFormSubmitted = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _policyComplementService: PolicyComplementService
    ) {}

    closeModal(): void {
        this._isFormSubmitted = false;
        this.isInitializedComponent = false;
        this.form.reset();
        ModalPlugin.hide(this.modalId);
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

    selectFile(event: any): void {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            if (
                FileHelper.checkIfValidFile(
                    file.name,
                    this.allowedFileExtensions
                )
            ) {
                this.form.patchValue({ file });
            } else {
                this.form.patchValue({ file: '' });
            }
        }
    }

    show(): void {
        this.isInitializedComponent = true;
        setTimeout(() => {
            this._initDropify();
        }, 0);
        ModalPlugin.show(this.modalId);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._uploadComplement();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            file: ['', [Validators.required]],
            name: ['', [Validators.required]],
        });
    }

    private _generateRequestBody(): FormData {
        const requestBody = new FormData();
        requestBody.append('file', this.form.value.file);
        requestBody.append('name', this.form.value.name);
        return requestBody;
    }

    private _initDropify(): void {
        DropifyPlugin.initV2(this.allowedFileExtensions, this.maxFileSize);
    }

    private _uploadComplement(): void {
        this._loadingService.show();
        const requestBody = this._generateRequestBody();
        this.closeModal();
        this._policyComplementService
            .uploadPolicyComplement(this.contactId, this.policyId, requestBody)
            .subscribe((policyComplement) => {
                this._loadingService.hide();
                this.complementUploaded.emit(policyComplement);
            });
    }
}
