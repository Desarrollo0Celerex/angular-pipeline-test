import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactSource } from '@interfaces/contact-source.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactSourceService } from '@services/contact-source.service';

@Injectable()
export class ModalSelectContactSourceService {
    contactSourceForm: FormGroup;
    contactSources: ContactSource[];

    constructor(
        private _contactSourceService: ContactSourceService,
        private _formBuilder: FormBuilder
    ) {
        this.contactSourceForm = this._formBuilder.group({});
        this.contactSources = [];
    }

    get f() {
        return this.contactSourceForm.controls;
    }

    /**
     * Build the contact source form
     * @param contactSourceId The contact source ID
     */
    buildContactSourceForm(contactSourceId: number): void {
        this.contactSourceForm = this._formBuilder.group({
            contactSourceId: [contactSourceId, [Validators.required]]
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
}
