import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { BRAND_NAME_LENGTH, CONTACT_TYPES, DEFAULT_PHONE_CODE_ID, DEFAULT_CONTACT_SOURCE_ID, EMAIL_LENGTH, OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { CreateContactDataSend } from '@interfaces/create-contact-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactSource } from '@interfaces/contact-source.interface';
import { ContactService } from '@services/contact.service';
import { ContactSourceService } from '@services/contact-source.service';

@Injectable()
export class CreateContactService {
    contactForm: FormGroup;
    contactSources: ContactSource[];

    constructor(
        private _contactService: ContactService,
        private _contactSourceService: ContactSourceService,
        private _formBuilder: FormBuilder
    ) {
        this.contactForm = this._formBuilder.group({});
        this.contactSources = [];
    }

    public get f() {
        return this.contactForm.controls;
    }

    /**
     * Build the contact form of person type
     */
    buildPersonContactForm(): void {
        this.contactForm = this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
            namePaternal: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
            nameMaternal: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
            email: ['', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: ['', [ValidatorsHelper.phoneNumber]],
            contactSourceId: [DEFAULT_CONTACT_SOURCE_ID, [Validators.required]],
            contactTypeId: [CONTACT_TYPES.PERSON, [Validators.required]]
        })
    }

    /**
     * Build the contact form of person company
     */
    buildCompanyContactForm(): void {
        this.contactForm = this._formBuilder.group({
            companyName: ['', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
            brandName: ['', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
            email: ['', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: ['', [ValidatorsHelper.phoneNumber]],
            contactSourceId: [DEFAULT_CONTACT_SOURCE_ID, [Validators.required]],
            contactTypeId: [CONTACT_TYPES.COMPANY, [Validators.required]]
        })
    }

    /**
     * Create a contact
     * @return The contact ID
     */
    createContact(): Observable<HttpResponse> {
        const requestBody: CreateContactDataSend = this.contactForm.value;
        return this._contactService.createContact(requestBody);
    }

    /**
     * Load the contact sources
     */
    loadContactSources(): void {
        const fields: string = 'contactSourceId,name';
        this._contactSourceService.getContactSources(fields).subscribe( (res: HttpResponse) => {
            this.contactSources = res.data;
        })
    }
}
