import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FILE_TYPES, } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { UpdateContactFileService } from './update-contact-file.service';

declare var DropifyPlugin: any;

@Component({
  selector: 'agt-update-contact-file',
  templateUrl: './update-contact-file.page.html',
  styles: [
  ],
  providers: [UpdateContactFileService]
})
export class UpdateContactFilePage implements OnInit {
    contactFileData: ContactFileDataSend | null = null;
    contactProfileMessage: string = 'Selecciona el archivo que deseas cargar en el expediente de';
    private _allowedFileTypes: string[] = ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'mail', 'eml', 'doc', 'docx', 'txt', 'csv', 'xls', 'xlsx', 'zip', 'rar'];
    private _isFormSubmitted: boolean = false;
    private _canShowPreview: boolean = true;
    private _maxFileSize: string = '6M';

    constructor(
        public updateContactFileService: UpdateContactFileService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _location: Location,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._catchParams();
        DropifyPlugin.init(FILE_TYPES.MIXED, this._allowedFileTypes, this._canShowPreview, this._maxFileSize);
        this.updateContactFileService.buildForm();
        this.updateContactFileService.loadContactFileTypes();
        if(!!this.contactFileData) {
            this.updateContactFileService.loadContactFile(this.contactFileData);
        }
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.updateContactFileService.fileForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.updateContactFileService.fileForm.get(constrolName);
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
            this.updateContactFileService.fileForm.patchValue({file});
        }
    }

    /**
     * Submit event to upload the file
     */
    onSubmitUpdateContactFile(): void {
        this._isFormSubmitted = true;
        if(this.updateContactFileService.fileForm.valid && !!this.contactFileData) {
            this._loadingService.show();
            this.updateContactFileService.updateContactFile(this.contactFileData).subscribe(() => {
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
        this.contactFileData = {
            contactId: this._activatedRoute.snapshot.params.contactId,
            contactFileId: this._activatedRoute.snapshot.params.contactFileId
        };
    }

    /**
     * Navigate to list the contact files
     * @param context The app context
     */
    private _goToListContactFiles(context: UpdateContactFilePage): void {
        if(!!context.contactFileData) {
            context._router.navigateByUrl(ROUTES_NAME.listContactFiles(context.contactFileData.contactId));
        }
    }

}
