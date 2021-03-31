import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ERROR_CODES } from '@constants/error-codes';
import { CONTACT_TYPES, IGNORE_MATCHES, ACTION_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ContactSource } from '@interfaces/contact-source.interface';
import { HttpError } from '@interfaces/http-error.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { ContainerCreateContactService } from './container-create-contact.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-create-contact',
  templateUrl: './container-create-contact.component.html',
  styles: [
  ]
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
        public containerCreateContactService: ContainerCreateContactService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.contactTypeId = 0;
        this.contactCreated = new EventEmitter<string>();
        this.CONTACT_TYPES = CONTACT_TYPES;
        this.actionType = ACTION_TYPES.SELECT_CONTACT;
        this.modaIdDuplicateContact = 'modal-duplicate-contact'
        this.modalIdSelectContactSource = 'modal-select-contact-source';
        this.originContactId = '';
        this.originPolicyId = '';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        this._buildContactForm();
        this.containerCreateContactService.loadContactSources();
    }

    /**
     * Get the contact source name
     * @param  contactSourceId The contact source ID
     * @return                 The contact source name
     */
    getContactSourceName(contactSourceId: number): string {
        const contactSource: ContactSource | undefined = this.containerCreateContactService.contactSources.find( (element: ContactSource) => element.contactSourceId == contactSourceId);
        return (!!contactSource) ? contactSource.name : '';
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.containerCreateContactService.contactForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.containerCreateContactService.contactForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Click event to select the contact source
     */
    onClickSelectContactSource(): void {
        ModalPlugin.show(this.modalIdSelectContactSource);
    }

    /**
     * Event to update the contact source ID
     * @param contactSourceId The contact source ID to update
     */
    onContactSourceIdSelected(contactSourceId: number): void {
        this.containerCreateContactService.contactForm.patchValue({contactSourceId});
    }

    /**
     * Event to update the phone code ID
     * @param phoneCodeId The phone code ID selected
     */
    onPhoneCodeIdSelected(phoneCodeId: number): void {
        this.containerCreateContactService.contactForm.patchValue({phoneCodeId});
    }

    /**
     * Event to create the contact
     */
    onSaveContact(): void {
        this._loadingService.show();
        this.containerCreateContactService.createContact(IGNORE_MATCHES.YES).subscribe( (res: HttpResponse) => {
            this._loadingService.hide();
            this.contactCreated.emit(res.data);
        });
    }

    /**
     * Submit event to create the contact
     */
    onSubmitCreateContact(): void {
        this._isFormSubmitted = true;
        if(this.containerCreateContactService.contactForm.valid) {
            this._loadingService.show();
            this.containerCreateContactService.createContact(IGNORE_MATCHES.NO).subscribe( (res: HttpResponse) => {
                this._loadingService.hide();
                this.contactCreated.emit(res.data);
            },
            (error: HttpError) => {
                switch(error.error) {
                    case ERROR_CODES.contactHasCoincidences:
                        ModalPlugin.show(this.modaIdDuplicateContact);
                        break;
                }
            })
        }
    }

    /**
     * Event to view the matches
     */
    onViewMatches(): void {
        this._router.navigate(
            [ROUTES_NAME.listContactCoincidences],
            {
                state: { contact: this.containerCreateContactService.contactForm.value },
                queryParams: {
                    contactTypeId: this.contactTypeId,
                    actionType: this.actionType,
                    originContactId: this.originContactId,
                    originPolicyId: this.originPolicyId
                }
            }
        );
    }

    /**
     * Build the contact form depending on the contact type
     */
    private _buildContactForm(): void {
        if(this.contactTypeId === CONTACT_TYPES.PERSON) {
             this.containerCreateContactService.buildPersonContactForm();
        } else {
            this.containerCreateContactService.buildCompanyContactForm();
        }
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.actionType = parseInt(this._activatedRoute.snapshot.params.actionType || this.actionType);
        this.originContactId = this._activatedRoute.snapshot.params.contactId || '';
        this.originPolicyId = this._activatedRoute.snapshot.params.policyId || '';
    }
}
