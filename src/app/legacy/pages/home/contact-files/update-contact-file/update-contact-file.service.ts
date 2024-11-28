import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { FILE_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import { ContactFileType } from '@interfaces/contact-file-type.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactFileService } from '@services/contact-file.service';
import { ContactFileTypeService } from '@services/contact-file-type.service';

import * as moment from 'moment';

@Injectable()
export class UpdateContactFileService {
    contactFileTypes: ContactFileType[] = [];
    fileForm: UntypedFormGroup = this._formBuilder.group({});

    constructor(
        private _contactFileService: ContactFileService,
        private _contactFileTypeService: ContactFileTypeService,
        private _formBuilder: UntypedFormBuilder
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.fileForm.controls;
    }

    /**
     * Build the form
     */
    buildForm(): void {
        this.fileForm = this._formBuilder.group({
            file: [''],
            fileName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(FILE_NAME_LENGTH.MIN),
                    Validators.maxLength(FILE_NAME_LENGTH.MAX),
                    ValidatorsHelper.fileName,
                ],
            ],
            contactFileTypeId: ['', [Validators.required]],
            expiredDate: ['', [ValidatorsHelper.date]]
        });
    }

    /**
     * Load the contact file
     * @param contactFileData [description]
     */
    loadContactFile(contactFileData: ContactFileDataSend): void {
        const fields: string = 'fileName,contactFileTypeId,expiredDate';
        this._contactFileService
            .getContactFile(contactFileData, fields)
            .subscribe((res: HttpResponse) => {
                this._updateFileForm(
                    res.data.fileName,
                    res.data.contactFileTypeId,
                    res.data.expiredDate
                );
            });
    }

    /**
     * Load the contact file types
     */
    loadContactFileTypes(): void {
        const fields: string = 'contactFileTypeId,name';
        this._contactFileTypeService
            .getContactFileTypes(fields)
            .subscribe((res: HttpResponse) => {
                this.contactFileTypes = res.data;
            });
    }

    /**
     * Upload the file
     * @return Notice of action done
     */
    updateContactFileWithoutFile(
        contactFileData: ContactFileDataSend
    ): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._contactFileService.updateContactFileWithoutFile(
            contactFileData,
            requestBody
        );
    }

    /**
     * Get the request body
     * @return The request body
     */
    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('fileName', this.f.fileName.value);
        requestBody.append('contactFileTypeId', this.f.contactFileTypeId.value);
        requestBody.append('expiredDate', this.f.expiredDate.value ? this.f.expiredDate.value : '');
        return requestBody;
    }

    private _updateFileForm(fileName: string, contactFileTypeId: number, expiredDate: string): void {
        fileName = fileName.replace(/_/g, ' ');
        this.fileForm.patchValue({
            fileName,
            contactFileTypeId,
            expiredDate: expiredDate ? moment(expiredDate).format('DD/MM/YYYY') : ''
        });
    }
}
