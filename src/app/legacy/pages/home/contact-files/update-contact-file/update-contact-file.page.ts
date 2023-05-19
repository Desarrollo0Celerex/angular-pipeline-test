import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FILE_SIZES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { LoadingService } from '@core/services/loading/loading.service';
import { CONTACT_FILE_ENDPOINTS } from '@services/contact-file.service';

import { UpdateContactFileService } from './update-contact-file.service';
import { FileParam } from '@interfaces/file-param.interface';

declare var DropifyPlugin: any;

@Component({
    selector: 'agt-update-contact-file',
    templateUrl: './update-contact-file.page.html',
    styles: [],
    providers: [UpdateContactFileService],
})
export class UpdateContactFilePage implements OnInit {
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
    contactFileData: ContactFileDataSend | null = null;
    contactProfileMessage: string =
        'Selecciona el archivo que deseas cargar en el expediente de';
    fileEndpoint: string = '';
    maxFileSize: string = FILE_SIZES.LARGE;
    private _isFormSubmitted: boolean = false;
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        public updateContactFileService: UpdateContactFileService,
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _location: Location,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this.fileEndpoint = CONTACT_FILE_ENDPOINTS.contactFile(
            this._workspaceId,
            this.contactFileData!.contactId,
            this.contactFileData!.contactFileId
        );
        DropifyPlugin.initAux(this.allowedFileExtensions, this.maxFileSize);
        this.updateContactFileService.buildForm();
        this.updateContactFileService.loadContactFileTypes();
        if (!!this.contactFileData) {
            this.updateContactFileService.loadContactFile(this.contactFileData);
        }
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.updateContactFileService.fileForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.updateContactFileService.fileForm.get(constrolName);
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

    onChangeFile(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.updateContactFileService.fileForm.patchValue({ file });
        }
    }

    onSubmitUpdateContactFile(): void {
        this._isFormSubmitted = true;
        if (this.updateContactFileService.fileForm.valid) {
            if (this.updateContactFileService.f.file.value !== '') {
                const fileParams: FileParam[] = this._generateFileParams();
                this.fileUploader.uploadFile(fileParams);
            } else {
                this._updateContactFileWithoutFile();
            }
        }
    }

    onClickCancel(): void {
        this._location.back();
    }

    patchFileValue(value: string): void {
        this.updateContactFileService.fileForm.patchValue({ file: value });
    }

    contactFileUploaded(): void {
        AlertHelper.fileUpdated(this._goToListContactFiles, this);
    }

    private _catchParams(): void {
        this.contactFileData = {
            contactId: this._activatedRoute.snapshot.params.contactId,
            contactFileId: this._activatedRoute.snapshot.params.contactFileId,
        };
    }

    private _generateFileParams(): FileParam[] {
        return [
            {
                name: 'fileName',
                value: this.updateContactFileService.f.fileName.value,
            },
            {
                name: 'contactFileTypeId',
                value: this.updateContactFileService.f.contactFileTypeId.value,
            },
        ];
    }

    private _goToListContactFiles(context: UpdateContactFilePage): void {
        if (!!context.contactFileData) {
            context._router.navigateByUrl(
                ROUTES_NAME.listContactFiles(context.contactFileData.contactId)
            );
        }
    }

    private _updateContactFileWithoutFile(): void {
        if (this.contactFileData !== null) {
            this._loadingService.show();
            this.updateContactFileService
                .updateContactFileWithoutFile(this.contactFileData)
                .subscribe(() => {
                    this._loadingService.hide();
                    AlertHelper.fileUpdated(this._goToListContactFiles, this);
                });
        }
    }
}
