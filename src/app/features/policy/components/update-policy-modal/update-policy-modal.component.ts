import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { DOCUMENT_FORMATS, FILE_TYPES } from '@constants/global';
import { InputValidatorHelper } from '@helpers/input-validator.helper';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-update-policy-modal',
    templateUrl: './update-policy-modal.component.html',
    styles: [],
})
export class UpdatePolicyModalComponent implements OnInit {
    @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
    form: FormGroup = this._buildForm();
    modalId = 'agt-update-policy-modal';
    private _canShowPreview = true;
    private _formats = ['pdf'];
    private _isFormSubmitted = false;
    private _maxFileSize: string = '2M';

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        DropifyPlugin.init(
            this._formats,
            this._canShowPreview,
            this._maxFileSize
        );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    confirmFile(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this.fileSelected.emit(this.f.file.value);
            ModalPlugin.hide(this.modalId);
        }
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

    init(): void {
        ModalPlugin.show(this.modalId);
    }

    selectFile(event: any): void {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            if (this._checkIfValidFile(file.name, this._formats)) {
                this.form.patchValue({ file });
            } else {
                this.form.patchValue({ file: '' });
            }
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            file: ['', [Validators.required]],
        });
    }

    private _checkIfValidFile(
        fileName: string,
        fileFormats: string[]
    ): boolean {
        const fileExtension: string = this._getFileExtension(fileName);
        const isValid: boolean = fileFormats.includes(fileExtension);
        return isValid;
    }

    private _getFileExtension(fileName: string): string {
        const index: number = fileName.lastIndexOf('.');
        return index !== -1 ? fileName.substring(index + 1) : '';
    }
}
