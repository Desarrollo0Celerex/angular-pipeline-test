import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { FILE_ALL_FORMATS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalUploadSinisterEvidenceService } from './modal-upload-sinister-evidence.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-upload-sinister-evidence',
    templateUrl: './modal-upload-sinister-evidence.component.html',
    styles: [],
    providers: [ModalUploadSinisterEvidenceService],
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
    ) {}

    ngOnInit(): void {
        this.model.loadSinisterEvidenceTypes();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'evidenceFile') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    onChangeFile(event: any): void {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            if (this._checkIfValidFile(file.name, this.formats)) {
                this.model.form.patchValue({ evidenceFile: file });
            }
        }
    }

    uploadSinisterEvidence(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid && !!this.sinisterData) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            this.model
                .uploadSinisterEvidence(this.sinisterData)
                .subscribe(() => {
                    this._reloadPage();
                    this._loadingService.hide();
                    AlertHelper.sinisterEvidenceUploaded();
                });
        }
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

    private _reloadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        if (!!this.sinisterData) {
            this._router.navigate(
                [
                    '/' +
                        ROUTES_NAME.showSinisterHistory(
                            this.sinisterData.contactId,
                            this.sinisterData.policyId,
                            this.sinisterData.sinisterId
                        ),
                ],
                { relativeTo: this._activatedRoute }
            );
        }
    }
}
