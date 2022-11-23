import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { FILE_ALL_FORMATS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { ModalUploadSinisterEvidenceService } from './modal-upload-sinister-evidence.service';

@Component({
  selector: 'agt-modal-upload-sinister-evidence',
  templateUrl: './modal-upload-sinister-evidence.component.html',
  styles: [
  ],
  providers: [ModalUploadSinisterEvidenceService]
})
export class ModalUploadSinisterEvidenceComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;
    formats: string[] = FILE_ALL_FORMATS;
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalUploadSinisterEvidenceService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadSinisterEvidenceTypes();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
        if(constrolName === 'evidenceFile') {
            return (validationClass === 'is-valid') ? 'agt-is-valid' : (validationClass === 'is-invalid') ? 'agt-is-invalid' : '';
        }
        return validationClass;
    }

    onChangeFile(event: any): void {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            if(this._checkIfValidFile(file.name, this.formats)) {
                this.model.form.patchValue({evidenceFile: file});
            }
        }
    }

    uploadSinisterEvidence(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid && !!this.sinisterData) {
            this._loadingService.show();
            this.model.uploadSinisterEvidence(this.sinisterData).subscribe(() => {
                this._loadingService.hide();
                AlertHelper.sinisterEvidenceUpdated(this._reloadPage, this);
            });
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

    private _reloadPage(context: ModalUploadSinisterEvidenceComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if(!!context.sinisterData) {
            context._router.navigate(['/' + ROUTES_NAME.showSinisterHistory(context.sinisterData.contactId, context.sinisterData.policyId, context.sinisterData.sinisterId)], { relativeTo: context._activatedRoute });
        }
    }

}
