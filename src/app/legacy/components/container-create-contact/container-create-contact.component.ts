import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ERROR_CODES } from '@constants/error-codes';
import { CONTACT_TYPES, IGNORE_MATCHES, ACTION_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ContactSource } from '@interfaces/contact-source.interface';
import { HttpError } from '@interfaces/http-error.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { SelectContactSourceData } from '@interfaces/select-contact-source-data.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ContainerCreateContactService } from './container-create-contact.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-create-contact',
    templateUrl: './container-create-contact.component.html',
    styles: [],
})
export class ContainerCreateContactComponent implements OnInit {
    @Input() contactTypeId: number;
    @Output() contactCreated: EventEmitter<string>;
    CONTACT_TYPES: any;
    actionType: number;
    modaIdDuplicateContact: string;
    modalIdSelectContactSource: string;
    originContactId: string;
    originPolicyId: string;
    private _isFormSubmitted: boolean;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _containerCreateContactService: ContainerCreateContactService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.contactTypeId = 0;
        this.contactCreated = new EventEmitter<string>();
        this.CONTACT_TYPES = CONTACT_TYPES;
        this.actionType = ACTION_TYPES.SELECT_CONTACT;
        this.modaIdDuplicateContact = 'modal-duplicate-contact';
        this.modalIdSelectContactSource = 'modal-select-contact-source';
        this.originContactId = '';
        this.originPolicyId = '';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        this._buildContactForm();
        this.model.loadContactSources();
        this.model.loadCountries();
    }

    get model(): ContainerCreateContactService {
        return this._containerCreateContactService;
    }

    /**
     * Get the contact source name
     * @param  contactSourceId The contact source ID
     * @return                 The contact source name
     */
    getContactSourceName(contactSourceId: number): string {
        const contactSource: ContactSource | undefined =
            this.model.contactSources.find(
                (element: ContactSource) =>
                    element.contactSourceId == contactSourceId
            );
        return !!contactSource ? contactSource.name : '';
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.contactForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.contactForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    loadCountryStates(): void {
        this.model.f.stateId.setValue(null);
        this.model.loadCountryStates(this.model.f.countryId.value);
    }

    /**
     * Click event to select the contact source
     */
    onClickSelectContactSource(): void {
        ModalPlugin.show(this.modalIdSelectContactSource);
    }

    /**
     * Event to update the contact source ID
     */
    onContactSourceIdSelected(data: SelectContactSourceData): void {
        this.model.contactForm.patchValue({
            contactSourceId: data.contactSourceId,
        });
        this.model.contactForm.patchValue({
            contactSourceTypeId: data.contactSourceTypeId,
        });
    }

    /**
     * Event to update the phone code ID
     * @param phoneCodeId The phone code ID selected
     */
    onPhoneCodeIdSelected(phoneCodeId: number): void {
        this.model.contactForm.patchValue({ phoneCodeId });
    }

    /**
     * Event to create the contact
     */
    onSaveContact(): void {
        this._loadingService.show();
        this.model
            .createContact(IGNORE_MATCHES.YES)
            .subscribe((res: HttpResponse) => {
                this._loadingService.hide();
                this.contactCreated.emit(res.data);
            });
    }

    /**
     * Submit event to create the contact
     */
    onSubmitCreateContact(): void {
        this._isFormSubmitted = true;
        if (this.model.contactForm.valid) {
            this._loadingService.show();
            this.model.createContact(IGNORE_MATCHES.NO).subscribe(
                (res: HttpResponse) => {
                    this._loadingService.hide();
                    this.contactCreated.emit(res.data);
                },
                (error: HttpError) => {
                    switch (error.error) {
                        case ERROR_CODES.contactHasCoincidences:
                            ModalPlugin.show(this.modaIdDuplicateContact);
                            break;
                    }
                }
            );
        }
    }

    /**
     * Event to view the matches
     */
    onViewMatches(): void {
        this._router.navigate([ROUTES_NAME.listContactCoincidences], {
            state: { contact: this.model.contactForm.value },
            queryParams: {
                contactTypeId: this.contactTypeId,
                actionType: this.actionType,
                originContactId: this.originContactId,
                originPolicyId: this.originPolicyId,
            },
        });
    }

    /**
     * Build the contact form depending on the contact type
     */
    private _buildContactForm(): void {
        if (this.contactTypeId === CONTACT_TYPES.PERSON) {
            this.model.buildPersonContactForm();
        } else {
            this.model.buildCompanyContactForm();
        }
        this.model.loadWorkspaceCountry();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.actionType = parseInt(
            this._activatedRoute.snapshot.params.actionType || this.actionType
        );
        this.originContactId =
            this._activatedRoute.snapshot.params.contactId || '';
        this.originPolicyId =
            this._activatedRoute.snapshot.params.policyId || '';
    }
}
