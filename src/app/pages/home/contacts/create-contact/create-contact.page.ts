import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CONTACT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ContactSource } from '@interfaces/contact-source.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { CreateContactService } from './create-contact.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-create-contact',
  templateUrl: './create-contact.page.html',
  styles: [
  ]
})
export class CreateContactPage implements OnInit {
    CONTACT_TYPES: any;
    contactTypeId: number;
    selectContactSourceModalId: string;
    private _isFormSubmitted: boolean;

    constructor(
        public createContactService: CreateContactService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.CONTACT_TYPES = CONTACT_TYPES;
        this.contactTypeId = 0;
        this.selectContactSourceModalId = 'modal-select-contact-source';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        console.log('contactTypeId: ',this.contactTypeId);
        this._buildContactForm();
        this.createContactService.loadContactSources();
    }

    /**
     * Get the contact source name
     * @param  contactSourceId The contact source ID
     * @return                 The contact source name
     */
    getContactSourceName(contactSourceId: number): string {
        const contactSource: ContactSource | undefined = this.createContactService.contactSources.find( (element: ContactSource) => element.contactSourceId == contactSourceId);
        return (!!contactSource) ? contactSource.name : '';
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.createContactService.contactForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.createContactService.contactForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Click event to select the contact source
     */
    onClickSelectContactSource(): void {
        ModalPlugin.show(this.selectContactSourceModalId);
    }

    /**
     * Event to update the contact source ID
     * @param contactSourceId The contact source ID to update
     */
    onContactSourceIdSelected(contactSourceId: number): void {
        this.createContactService.contactForm.patchValue({contactSourceId});
    }

    /**
     * Event to update the phone code ID
     * @param phoneCodeId The phone code ID selected
     */
    onPhoneCodeIdSelected(phoneCodeId: number): void {
        this.createContactService.contactForm.patchValue({phoneCodeId});
    }

    /**
     * Submit event to create the contact
     */
    onSubmitCreateContact(): void {
        this._isFormSubmitted = true;
        if(this.createContactService.contactForm.valid) {
            this._loadingService.show();
            this.createContactService.createContact().subscribe( (res: HttpResponse) => {
                this._loadingService.hide();
                this._router.navigateByUrl(ROUTES_NAME.contactResume(res.data), { state: { contactSaved: true }});
            })
        }
    }

    /**
     * Build the contact form depending on the contact type
     */
    private _buildContactForm(): void {
        if(this.contactTypeId === CONTACT_TYPES.PERSON) {
             this.createContactService.buildPersonContactForm();
        } else {
            this.createContactService.buildCompanyContactForm();
        }
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactTypeId = parseInt(this._activatedRoute.snapshot.params.contactTypeId);
    }

}
