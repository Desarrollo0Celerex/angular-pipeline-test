import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FILE_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { ContactFileType } from '@interfaces/contact-file-type.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactFileService } from '@services/contact-file.service';
import { ContactFileTypeService } from '@services/contact-file-type.service';

@Injectable()
export class UploadContactFileService {
    contactFileTypes: ContactFileType[] = [];
    fileForm: FormGroup = this._formBuilder.group({});

    constructor(
        private _contactFileService: ContactFileService,
        private _contactFileTypeService: ContactFileTypeService,
        private _formBuilder: FormBuilder
    ) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.fileForm.controls;
    }

    /**
     * Build the form
     */
    buildForm(): void {
        this.fileForm = this._formBuilder.group({
            file: ['', [Validators.required]],
            fileName: ['', [Validators.required, Validators.minLength(FILE_NAME_LENGTH.MIN), Validators.maxLength(FILE_NAME_LENGTH.MAX), ValidatorsHelper.fileName]],
            contactFileTypeId: ['', [Validators.required]]
        });
    }

    /**
     * Load the contact file types
     */
    loadContactFileTypes(): void {
        const fields: string = 'contactFileTypeId,name';
        this._contactFileTypeService.getContactFileTypes(fields).subscribe((res: HttpResponse) => {
            this.contactFileTypes = res.data;
        })
    }

    /**
     * Upload the file
     * @return Notice of action done
     */
    uploadFile(contactId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._contactFileService.uploadContactFile(contactId, requestBody);
    }

    /**
     * Get the request body
     * @return The request body
     */
    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('file', this.f.file.value);
        requestBody.append('fileName', this.f.fileName.value);
        requestBody.append('contactFileTypeId', this.f.contactFileTypeId.value);
        return requestBody;
    }
}
