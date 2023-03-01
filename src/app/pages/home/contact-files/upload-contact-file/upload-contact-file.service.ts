import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { FILE_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { ContactFileType } from '@interfaces/contact-file-type.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactFileTypeService } from '@services/contact-file-type.service';

@Injectable()
export class UploadContactFileService {
    contactFileTypes: ContactFileType[] = [];
    fileForm: UntypedFormGroup = this._formBuilder.group({});

    constructor(
        private _contactFileTypeService: ContactFileTypeService,
        private _formBuilder: UntypedFormBuilder
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
}
