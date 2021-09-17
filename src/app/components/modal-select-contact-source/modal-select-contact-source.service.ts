import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactSource } from '@interfaces/contact-source.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactSourceService } from '@services/contact-source.service';
import { ContactSourceType } from '@interfaces/contact-source-type.interface';
import { ContactSourceTypeService } from '@services/contact-source-type.service';

@Injectable()
export class ModalSelectContactSourceService {
    contactSourceForm: FormGroup = this._formBuilder.group({});
    contactSources: ContactSource[] = [];
    contactSourceTypes: ContactSourceType[] = [];

    constructor(
        private _contactSourceService: ContactSourceService,
        private _contactSourceTypeService: ContactSourceTypeService,
        private _formBuilder: FormBuilder
    ) { }

    get f() {
        return this.contactSourceForm.controls;
    }

    /**
     * Build the contact source form
     * @param contactSourceId The contact source ID
     */
    buildContactSourceForm(contactSourceId: number, contactSourcetypeId: number): void {
        this.contactSourceForm = this._formBuilder.group({
            contactSourceId: [contactSourceId, [Validators.required]],
            contactSourceTypeId: [contactSourcetypeId, [Validators.required]]
        });
    }

    /**
     * Load the contact sources
     */
    loadContactSources(): void {
        this._contactSourceService.getContactSources().subscribe( (res: HttpResponse) => {
            this.contactSources = res.data;
        })
    }

    loadContactSourceTypes(contactSourceId: number): void {
        this._contactSourceTypeService.getContactSourceTypes(contactSourceId).subscribe( (res: ContactSourceType[]) => {
            this.contactSourceTypes = res;
        })
    }
}
