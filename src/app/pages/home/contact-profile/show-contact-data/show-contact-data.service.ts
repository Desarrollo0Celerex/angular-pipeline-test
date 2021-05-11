import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BRAND_NAME_LENGTH, DEFAULT_PHONE_CODE_ID, EMAIL_LENGTH, FREE_TEXT_LENGTH, OWN_NAME_LENGTH, WEB_LINK_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { CivilStatus } from '@interfaces/civil-status.interface';
import { Contact } from '@interfaces/contact.interface';
import { ContactOccupation } from '@interfaces/contact-occupation.interface';
import { ContactRelation } from '@interfaces/contact-relation.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Gender } from '@interfaces/gender.interface';
import { Offspring } from '@interfaces/offspring.interface';
import { UpdateContactDataSend } from '@interfaces/update-contact-data-send.interface';
import { CivilStatusService } from '@services/civil-status.service';
import { ContactService } from '@services/contact.service';
import { ContactOccupationService } from '@services/contact-occupation.service';
import { ContactRelationService } from '@services/contact-relation.service';
import { GendersService } from '@services/genders.service';
import { OffspringService } from '@services/offspring.service';

@Injectable()
export class ShowContactDataService {
    contactForm: FormGroup = this._formBuilder.group({});
    civilStatus: CivilStatus[] = [];
    contact: Contact | null = null;
    contactOccupations: ContactOccupation[] = [];
    contactRelations: ContactRelation[] = [];
    genders: Gender[] = [];
    offsprings: Offspring[] = [];

    constructor(
        private _civilStatusService: CivilStatusService,
        private _contactOccupationService: ContactOccupationService,
        private _contactRelationService: ContactRelationService,
        private _contactService: ContactService,
        private _datePipe: DatePipe,
        private _formBuilder: FormBuilder,
        private _gendersService: GendersService,
        private _offspringService: OffspringService
    ) { }

    get f() {
        return this.contactForm.controls;
    }

    /**
     * Build the person form
     */
    buildPersonForm(): void {
        if(!!this.contact) {
            this.contactForm = this._formBuilder.group({
                name: [ {value: this.contact.name || '', disabled: true}, [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                namePaternal: [ {value: this.contact.namePaternal || '', disabled: true}, [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                nameMaternal: [ {value: this.contact.nameMaternal || '', disabled: true}, [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                genderId: [ {value: this.contact.genderId || '', disabled: true}, [Validators.required]],
                birthdate: [ {value: this._getDateFormat(this.contact.birthdate) || '', disabled: true}, [ValidatorsHelper.date]],
                civilStatusId: [ {value: this.contact.civilStatusId || '', disabled: true}, [ValidatorsHelper.number]],
                contactOccupationId: [ {value: this.contact.contactOccupationId || '', disabled: true}, [ValidatorsHelper.number]],
                offspringId: [ {value: this.contact.offspringId || '', disabled: true}, [ValidatorsHelper.number]],
                rfc: [ {value: this.contact.rfc || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                email: [ {value: this.contact.email || '', disabled: true}, [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                phoneCodeId: [ {value: this.contact.phoneCodeId || DEFAULT_PHONE_CODE_ID, disabled: true}, [ValidatorsHelper.number]],
                phoneNumber: [ {value: this.contact.phoneNumber || '', disabled: true}, [ValidatorsHelper.phoneNumber]],
                website: [ {value: this.contact.website || '', disabled: true}, [Validators.minLength(WEB_LINK_LENGTH.MIN), Validators.maxLength(WEB_LINK_LENGTH.MAX), ValidatorsHelper.webLink]],
                secondaryContactName: [ {value: this.contact.secondaryContactName || '', disabled: true}, [Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                secondaryContactRelationId: [ {value: this.contact.secondaryContactRelationId || '', disabled: true}, [ValidatorsHelper.number]],
                secondaryContactEmail: [ {value: this.contact.secondaryContactEmail || '', disabled: true}, [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                secondaryContactPhoneCodeId: [ {value: this.contact.secondaryContactPhoneCodeId || DEFAULT_PHONE_CODE_ID, disabled: true}],
                secondaryContactPhoneNumber: [ {value: this.contact.secondaryContactPhoneNumber || '', disabled: true}, [ValidatorsHelper.phoneNumber]],
                street: [ {value: this.contact.street || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH), Validators.maxLength(FREE_TEXT_LENGTH), ValidatorsHelper.freeText]],
                exteriorNumber: [ {value: this.contact.exteriorNumber || '', disabled: true}, [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.freeText]],
                interiorNumber: [ {value: this.contact.interiorNumber || '', disabled: true}, [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.freeText]],
                colony: [ {value: this.contact.colony || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                city: [ {value: this.contact.city || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                state: [ {value: this.contact.state || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                postalCode: [ {value: this.contact.postalCode || '', disabled: true}, [ValidatorsHelper.postalCode]],
                country: [ {value: this.contact.country || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                contactTypeId: [this.contact.contactTypeId]
            });
        }
    }

    /**
     * Build the company form
     */
    buildCompanyForm(): void {
        if(!!this.contact) {
            this.contactForm = this._formBuilder.group({
                companyName: [ {value: this.contact.companyName || '', disabled: true}, [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
                brandName: [ {value: this.contact.brandName || '', disabled: true}, [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
                rfc: [ {value: this.contact.rfc || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                email: [ {value: this.contact.email || '', disabled: true}, [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                phoneCodeId: [ {value: this.contact.phoneCodeId || DEFAULT_PHONE_CODE_ID, disabled: true}, [ValidatorsHelper.number]],
                phoneNumber: [ {value: this.contact.phoneNumber || '', disabled: true}, [ValidatorsHelper.phoneNumber]],
                website: [ {value: this.contact.website || '', disabled: true}, [Validators.minLength(WEB_LINK_LENGTH.MIN), Validators.maxLength(WEB_LINK_LENGTH.MAX), ValidatorsHelper.webLink]],
                secondaryContactName: [ {value: this.contact.secondaryContactName || '', disabled: true}, [Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                secondaryContactRelationId: [ {value: this.contact.secondaryContactRelationId || '', disabled: true}, [ValidatorsHelper.number]],
                secondaryContactEmail: [ {value: this.contact.secondaryContactEmail || '', disabled: true}, [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                secondaryContactPhoneCodeId: [ {value: this.contact.secondaryContactPhoneCodeId || DEFAULT_PHONE_CODE_ID, disabled: true}],
                secondaryContactPhoneNumber: [ {value: this.contact.secondaryContactPhoneNumber || '', disabled: true}, [ValidatorsHelper.phoneNumber]],
                street: [ {value: this.contact.street || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH), Validators.maxLength(FREE_TEXT_LENGTH), ValidatorsHelper.freeText]],
                exteriorNumber: [ {value: this.contact.exteriorNumber || '', disabled: true}, [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.freeText]],
                interiorNumber: [ {value: this.contact.interiorNumber || '', disabled: true}, [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.freeText]],
                colony: [ {value: this.contact.colony || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                city: [ {value: this.contact.city || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                state: [ {value: this.contact.state || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                postalCode: [ {value: this.contact.postalCode || '', disabled: true}, [ValidatorsHelper.postalCode]],
                country: [ {value: this.contact.country || '', disabled: true}, [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                contactTypeId: [this.contact.contactTypeId]
            });
        }
    }

    /**
     * Disabled the contact form fields
     */
    disableContactForm(): void {
        if(!!this.contactForm) {
            for(const field in this.contactForm.controls) {
                this.contactForm.get(field)!.disable();
            }
        }

    }

    /**
     * Enable the contact form fields
     */
    enableContactForm(): void {
        if(!!this.contactForm) {
            for(const field in this.contactForm.controls) {
                this.contactForm.get(field)!.enable();
            }
        }

    }

    /**
     * Load the civil status
     * @return           Notice of action done
     */
    loadCivilStatus(): Observable<void> {
        const fields: string = 'civilStatusId,name';
        return this._civilStatusService.getCivilStatus(fields).pipe(
            tap((res: HttpResponse) => {
                this.civilStatus = res.data;
            }),
            map(() => { })
        )
    }

    /**
     * Load the cantact data
     * @param contactId  The contact ID
     * @return           Notice of action done
     */
    loadContact(contactId: string): Observable<void> {
        const fields: string = 'name,namePaternal,nameMaternal,genderId,birthdate,civilStatusId,contactOccupationId,offspringId,companyName,brandName,rfc,website,secondaryContactName,secondaryContactRelationId,secondaryContactPhoneCodeId,secondaryContactPhoneNumber,secondaryContactEmail,street,exteriorNumber,interiorNumber,colony,city,state,postalCode,country,phoneCodeId,phoneNumber,email,contactTypeId';
        return this._contactService.getContact(contactId, fields).pipe(
            tap((res: HttpResponse) => {
                this.contact = res.data;
            }),
            map(() => { })
        )
    }

    /**
     * Load the cantact occupations
     * @return           Notice of action done
     */
    loadContactOccupations(): Observable<void> {
        const fields: string = 'contactOccupationId,name';
        return this._contactOccupationService.getContactOccupations(fields).pipe(
            tap((res: HttpResponse) => {
                this.contactOccupations = res.data;
            }),
            map(() => { })
        )
    }

    /**
     * Load the cantact occupations
     * @return Notice of action done
     */
    loadContactRelations(): Observable<void> {
        const fields: string = 'contactRelationId,name';
        return this._contactRelationService.getContactRelations(fields).pipe(
            tap((res: HttpResponse) => {
                this.contactRelations = res.data;
            }),
            map(() => { })
        )
    }

    /**
     * Load the genders
     * @return  Notice of action done
     */
    loadGenders(): Observable<void> {
        const fields: string = 'genderId,name';
        return this._gendersService.getGenders(fields).pipe(
            tap((res: HttpResponse) => {
                this.genders = res.data;
            }),
            map(() => { })
        )
    }

    /**
     * Load the offsprings
     * @return  Notice of action done
     */
    loadOffsprings(): Observable<void> {
        const fields: string = 'offspringId,name';
        return this._offspringService.getOffsprings(fields).pipe(
            tap( (res: HttpResponse) => {
                this.offsprings = res.data;
            }),
            map(() => { })
        );
    }

    /**
     * Update the contact data
     * @param  contactId    The contact ID
     * @return              Notification of action done
     */
    updateContact(contactId: string): Observable<void> {
        const requestBody: UpdateContactDataSend = {...this.contactForm.value};
        return this._contactService.updateContact(contactId, requestBody);
    }

    /**
     * Get the date format
     * @param  date The date to format
     * @return      The formatted date
     */
    private _getDateFormat(date: string | null): string {
        let dateFormat: string = '';
        if(!!date) {
            const formattedDate: string | null = this._datePipe.transform(date, 'dd/MM/yyyy');
            dateFormat = (!!formattedDate) ? formattedDate : '';
        }
        return dateFormat;
    }
}
