import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';

import { ModalSelectFileService } from './modal-select-file.service';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-file',
  templateUrl: './modal-select-file.component.html',
  styles: [
  ],
  providers: [ModalSelectFileService]
})
export class ModalSelectFileComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() data: ModalSelectFileData | null = null;
    @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
    private _canShowPreview: boolean = true;
    private _isFormSubmitted: boolean = false;
    private _maxFileSize: string = '2M';

    constructor(public model: ModalSelectFileService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.data.currentValue) {
            DropifyPlugin.init(changes.data.currentValue.formats, this._canShowPreview, this._maxFileSize);
        }
    }

    confirmFile(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            this.fileSelected.emit(this.model.f.file.value);
            ModalPlugin.hide(this.modalId);
        }
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
        if(constrolName === 'file') {
            return (validationClass === 'is-valid') ? 'agt-is-valid' : (validationClass === 'is-invalid') ? 'agt-is-invalid' : '';
        }
        return validationClass;
    }

    selectFile(event: any): void {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            if(this._checkIfValidFile(file.name, this.data!.formats)) {
                this.model.form.patchValue({file});
            } else {
                this.model.form.patchValue({file: ''});
            }
        }
    }

    private _checkIfValidFile(fileName: string, fileFormats: string[]): boolean {
        const fileExtension: string = this._getFileExtension(fileName);
        const isValid: boolean = fileFormats.includes(fileExtension);
        return isValid;
    }

    private _getFileExtension(fileName: string): string {
        const index: number = fileName.lastIndexOf('.');
        return (index !== -1 ) ? fileName.substring(index + 1) : '';
    }

}
