import { Injectable } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { ContactSource } from '@interfaces/contact-source.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactSourceService } from '@services/contact-source.service';
import { ContactSourceType } from '@interfaces/contact-source-type.interface';
import { ContactSourceTypeService } from '@services/contact-source-type.service';

@Injectable()
export class ModalSelectContactSourceService {
    contactSourceForm: UntypedFormGroup = this._formBuilder.group({});
    contactSources: ContactSource[] = [];
    contactSourceTypes: ContactSourceType[] = [];

    constructor(
        private _contactSourceService: ContactSourceService,
        private _contactSourceTypeService: ContactSourceTypeService,
        private _formBuilder: UntypedFormBuilder
    ) {}

    get f() {
        return this.contactSourceForm.controls;
    }

    /**
     * Build the contact source form
     * @param contactSourceId The contact source ID
     */
    buildContactSourceForm(
        contactSourceId: number,
        contactSourcetypeId: number
    ): void {
        this.contactSourceForm = this._formBuilder.group({
            contactSourceId: [contactSourceId, [Validators.required]],
            contactSourceTypeId: [contactSourcetypeId, [Validators.required]],
        });
    }

    /**
     * Load the contact sources
     */
    loadContactSources(): void {
        this._contactSourceService
            .getContactSources()
            .subscribe((res: HttpResponse) => {
                this.contactSources = res.data;
            });
    }

    loadContactSourceTypes(contactSourceId: number): void {
        this._contactSourceTypeService
            .getContactSourceTypes(contactSourceId)
            .subscribe((res: ContactSourceType[]) => {
                this.contactSourceTypes = res;
            });
    }
}
