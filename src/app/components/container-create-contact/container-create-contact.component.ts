import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { CONTACT_TYPES } from '@constants/global';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ContactSource } from '@interfaces/contact-source.interface';
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
    modalIdSelectContactSource: string;
    private _isFormSubmitted: boolean;

    constructor(
        public containerCreateContactService: ContainerCreateContactService,
        private _loadingService: LoadingService
    ) {
        this.contactTypeId = 0;
        this.contactCreated = new EventEmitter<string>();
        this.CONTACT_TYPES = CONTACT_TYPES;
        this.modalIdSelectContactSource = 'modal-select-contact-source';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
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
     * Submit event to create the contact
     */
    onSubmitCreateContact(): void {
        this._isFormSubmitted = true;
        if(this.containerCreateContactService.contactForm.valid) {
            this._loadingService.show();
            this.containerCreateContactService.createContact().subscribe( (res: HttpResponse) => {
                this._loadingService.hide();
                this.contactCreated.emit(res.data);
            })
        }
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
}
