import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FILE_TYPES, } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@services/loading.service';

import { UploadContactFileService } from './upload-contact-file.service';

declare var DropifyPlugin: any;

@Component({
  selector: 'agt-upload-contact-file',
  templateUrl: './upload-contact-file.page.html',
  styles: [
  ],
  providers: [UploadContactFileService]
})
export class UploadContactFilePage implements OnInit {
    contactId: string = '';
    contactProfileMessage: string = 'Selecciona el archivo que deseas cargar en el expediente de';
    private _allowedFileTypes: string[] = ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'mail', 'eml', 'doc', 'docx', 'txt', 'csv', 'xls', 'xlsx', 'zip', 'rar'];
    private _isFormSubmitted: boolean = false;

    constructor(
        public uploadFileService: UploadContactFileService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _location: Location,
        private _router: Router
    ) { }

    ngOnInit(): void {
        DropifyPlugin.init(FILE_TYPES.MIXED, this._allowedFileTypes);
        this._catchParams();
        this.uploadFileService.loadContactFileTypes();
        this.uploadFileService.buildForm();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.uploadFileService.fileForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.uploadFileService.fileForm.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
        if(constrolName === 'file') {
            return (validationClass === 'is-valid') ? 'agt-is-valid' : (validationClass === 'is-invalid') ? 'agt-is-invalid' : '';
        }
        return validationClass;
    }

    /**
     * Change event to catch the file selected
     * @param event The event lounched
     */
    onChangeFile(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadFileService.fileForm.patchValue({file});
        }
    }

    /**
     * Submit event to upload the file
     */
    onSubmitUploadContactFile(): void {
        this._isFormSubmitted = true;
        if(this.uploadFileService.fileForm.valid) {
            this._loadingService.show();
            this.uploadFileService.uploadFile(this.contactId).subscribe(() => {
                this._loadingService.hide();
                AlertHelper.fileUpdated(this._goToListContactFiles, this);
            });
        }
    }

    /**
     * Click event to cancel action
     */
    onClickCancel(): void {
        this._location.back();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

    /**
     * Navigate to list the contact files
     * @param context The app context
     */
    private _goToListContactFiles(context: UploadContactFilePage): void {
        context._router.navigateByUrl(ROUTES_NAME.listContactFiles(context.contactId));
    }

}
