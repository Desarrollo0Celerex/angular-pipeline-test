import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FILE_SIZES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { CONTACT_FILE_ENDPOINTS } from '@services/contact-file.service';
import { LoadingService } from '@core/services/loading/loading.service';

import { UploadContactFileService } from './upload-contact-file.service';
import { FileParam } from '@components/file-uploader/file-uploader.component';

declare var DropifyPlugin: any;
declare var DatePickerPlugin: any;

@Component({
    selector: 'agt-upload-contact-file',
    templateUrl: './upload-contact-file.page.html',
    styles: [],
    providers: [UploadContactFileService],
})
export class UploadContactFilePage implements OnInit {
    @ViewChild('fileUploader') fileUploader: any;
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
    contactId: string = '';
    contactProfileMessage: string =
        'Selecciona el archivo que deseas cargar en el expediente de';
    fileEndpoint: string = '';
    maxFileSize: string = FILE_SIZES.LARGE;
    calendarIdExpiredAt: string = 'expiredAt';
    private _isFormSubmitted: boolean = false;
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        public uploadFileService: UploadContactFileService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _loadingService: LoadingService,
        private _location: Location,
        private _router: Router
    ) {}

    ngOnInit(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdExpiredAt,
            this._onChangeDate,
            this
        );
        this._catchParams();
        this.fileEndpoint = CONTACT_FILE_ENDPOINTS.contactFiles(
            this._workspaceId,
            this.contactId
        );
        DropifyPlugin.initV2(this.allowedFileExtensions, this.maxFileSize);
        this.uploadFileService.loadContactFileTypes();
        this.uploadFileService.buildForm();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.uploadFileService.fileForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.uploadFileService.fileForm.get(constrolName);
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
     * Change event to catch the file selected
     * @param event The event lounched
     */
    onChangeFile(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadFileService.fileForm.patchValue({ file });
        }
    }

    /**
     * Submit event to upload the file
     */
    onSubmitUploadContactFile(): void {
        this._isFormSubmitted = true;
        if (this.uploadFileService.fileForm.valid) {
            const fileParams: FileParam[] = this._generateFileParams();
            this.fileUploader.uploadFile(fileParams);
        }
    }

    /**
     * Click event to cancel action
     */
    onClickCancel(): void {
        this._location.back();
    }

    patchFileValue(value: string): void {
        this.uploadFileService.fileForm.patchValue({ file: value });
    }

    contactFileUploaded(): void {
        AlertHelper.fileUpdated(this._goToListContactFiles, this);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

    private _generateFileParams(): FileParam[] {
        return [
            {
                name: 'fileName',
                value: this.uploadFileService.f.fileName.value,
            },
            {
                name: 'contactFileTypeId',
                value: this.uploadFileService.f.contactFileTypeId.value,
            },
            {
                name: 'expiredAt',
                value: this.uploadFileService.f.expiredAt.value
            }
        ];
    }

    /**
     * Navigate to list the contact files
     * @param context The app context
     */
    private _goToListContactFiles(context: UploadContactFilePage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listContactFiles(context.contactId)
        );
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: UploadContactFilePage
    ): void {
        context.uploadFileService.fileForm.patchValue({
            [selectorId]: changedValue,
        });
    }

}
