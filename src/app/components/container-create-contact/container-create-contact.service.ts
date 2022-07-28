import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { BRAND_NAME_LENGTH, CONTACT_TYPES, DEFAULT_PHONE_CODE_ID, DEFAULT_CONTACT_SOURCE_ID, EMAIL_LENGTH, OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { CreateContactDataSend } from '@interfaces/create-contact-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactSource } from '@interfaces/contact-source.interface';
import { Country } from '@interfaces/country.interface';
import { State } from '@interfaces/state.interface';
import { ContactService } from '@services/contact.service';
import { ContactSourceService } from '@services/contact-source.service';
import { CountryService } from '@services/country.service';
import { StateService } from '@services/state.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class ContainerCreateContactService {
    contactForm: UntypedFormGroup;
    contactSources: ContactSource[];
    countries: Country[] = [];
    states: State[] = [];

    constructor(
        private _contactService: ContactService,
        private _contactSourceService: ContactSourceService,
        private _countryService: CountryService,
        private _formBuilder: UntypedFormBuilder,
        private _stateService: StateService,
        private _workspaceService: WorkspaceService
    ) {
        this.contactForm = this._formBuilder.group({});
        this.contactSources = [];
    }

    get f() {
        return this.contactForm.controls;
    }

    /**
     * Build the contact form of person type
     */
    buildPersonContactForm(): void {
        this.contactForm = this._formBuilder.group({
            countryId: ['', [Validators.required]],
            stateId: ['', [Validators.required]],
            contactSourceId: [DEFAULT_CONTACT_SOURCE_ID, [Validators.required]],
            contactSourceTypeId: ['1', [Validators.required]],
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
            namePaternal: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
            nameMaternal: ['', [Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
            email: ['', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: ['', [ValidatorsHelper.phoneNumber]],
            contactTypeId: [CONTACT_TYPES.PERSON, [Validators.required]]
        })
    }

    /**
     * Build the contact form of person company
     */
    buildCompanyContactForm(): void {
        this.contactForm = this._formBuilder.group({
            countryId: ['', [Validators.required]],
            stateId: ['', [Validators.required]],
            contactSourceId: [DEFAULT_CONTACT_SOURCE_ID, [Validators.required]],
            contactSourceTypeId: ['1', [Validators.required]],
            companyName: ['', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
            brandName: ['', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
            email: ['', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: ['', [ValidatorsHelper.phoneNumber]],
            contactTypeId: [CONTACT_TYPES.COMPANY, [Validators.required]]
        })
    }

    /**
     * Create a contact
     * @param  ignoreMatches Flag to ignore the matches
     * @return               The created contact ID
     */
    createContact(ignoreMatches: number): Observable<HttpResponse> {
        const requestBody: CreateContactDataSend = { ...this.contactForm.value, ignoreMatches: ignoreMatches };
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

    loadCountries(): void {
        const fields: string = 'countryId,name';
        this._countryService.getCountries(fields).subscribe((res: HttpResponse) => {
            this.countries = res.data;
        })
    }

    loadCountryStates(countryId: number): void {
        const fields: string = 'stateId,name';
        this._stateService.getCountryStates(countryId, fields).subscribe((res: HttpResponse) => {
            this.states = res.data;
        })
    }

    loadWorkspaceCountry(): void {
        const fields: string = 'countryId';
        this._workspaceService.getWorkspace(fields).subscribe((res: HttpResponse) => {
            const countryId: number = res.data.countryId;
            this.contactForm.patchValue({countryId, phoneCodeId: countryId });
            this.loadCountryStates(countryId);
        })
    }
}
