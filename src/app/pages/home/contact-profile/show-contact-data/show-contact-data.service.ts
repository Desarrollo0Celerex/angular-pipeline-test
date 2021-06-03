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
                name: [this.contact.name || '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                namePaternal: [this.contact.namePaternal || '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                nameMaternal: [this.contact.nameMaternal || '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                genderId: [this.contact.genderId || '', [Validators.required]],
                birthdate: [this._getDateFormat(this.contact.birthdate) || '', [ValidatorsHelper.date]],
                civilStatusId: [this.contact.civilStatusId || '', [ValidatorsHelper.number]],
                contactOccupationId: [this.contact.contactOccupationId || '', [ValidatorsHelper.number]],
                offspringId: [this.contact.offspringId || '', [ValidatorsHelper.number]],
                rfc: [this.contact.rfc || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                email: [this.contact.email || '', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                phoneCodeId: [this.contact.phoneCodeId || DEFAULT_PHONE_CODE_ID, [ValidatorsHelper.number]],
                phoneNumber: [this.contact.phoneNumber || '', [ValidatorsHelper.phoneNumber]],
                website: [this.contact.website || '', [Validators.minLength(WEB_LINK_LENGTH.MIN), Validators.maxLength(WEB_LINK_LENGTH.MAX), ValidatorsHelper.webLink]],
                secondaryContactName: [this.contact.secondaryContactName || '', [Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                secondaryContactRelationId: [this.contact.secondaryContactRelationId || '', [ValidatorsHelper.number]],
                secondaryContactEmail: [this.contact.secondaryContactEmail || '', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                secondaryContactPhoneCodeId: [this.contact.secondaryContactPhoneCodeId || DEFAULT_PHONE_CODE_ID],
                secondaryContactPhoneNumber: [this.contact.secondaryContactPhoneNumber || '', [ValidatorsHelper.phoneNumber]],
                street: [this.contact.street || '', [Validators.minLength(FREE_TEXT_LENGTH), Validators.maxLength(FREE_TEXT_LENGTH), ValidatorsHelper.freeText]],
                exteriorNumber: [this.contact.exteriorNumber || '', [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.alphanumeric]],
                interiorNumber: [this.contact.interiorNumber || '', [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.alphanumeric]],
                colony: [this.contact.colony || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                city: [this.contact.city || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                state: [this.contact.state || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                postalCode: [this.contact.postalCode || '', [ValidatorsHelper.postalCode]],
                country: [this.contact.country || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
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
                companyName: [this.contact.companyName || '', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
                brandName: [this.contact.brandName || '', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
                rfc: [this.contact.rfc || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                email: [this.contact.email || '', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                phoneCodeId: [this.contact.phoneCodeId || DEFAULT_PHONE_CODE_ID, [ValidatorsHelper.number]],
                phoneNumber: [this.contact.phoneNumber || '', [ValidatorsHelper.phoneNumber]],
                website: [this.contact.website || '', [Validators.minLength(WEB_LINK_LENGTH.MIN), Validators.maxLength(WEB_LINK_LENGTH.MAX), ValidatorsHelper.webLink]],
                secondaryContactName: [this.contact.secondaryContactName || '', [Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                secondaryContactRelationId: [this.contact.secondaryContactRelationId || '', [ValidatorsHelper.number]],
                secondaryContactEmail: [this.contact.secondaryContactEmail || '', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                secondaryContactPhoneCodeId: [this.contact.secondaryContactPhoneCodeId || DEFAULT_PHONE_CODE_ID],
                secondaryContactPhoneNumber: [this.contact.secondaryContactPhoneNumber || '', [ValidatorsHelper.phoneNumber]],
                street: [this.contact.street || '', [Validators.minLength(FREE_TEXT_LENGTH), Validators.maxLength(FREE_TEXT_LENGTH), ValidatorsHelper.freeText]],
                exteriorNumber: [this.contact.exteriorNumber || '', [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.alphanumeric]],
                interiorNumber: [this.contact.interiorNumber || '', [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.alphanumeric]],
                colony: [this.contact.colony || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                city: [this.contact.city || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                state: [this.contact.state || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                postalCode: [this.contact.postalCode || '', [ValidatorsHelper.postalCode]],
                country: [this.contact.country || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                contactTypeId: [this.contact.contactTypeId]
            });
        }
    }

    /**
     * Enable the form fields
     */
    enableFormFields(): void {
        if(!!this.contactForm) {
            for(const field in this.contactForm.controls) {
                this.contactForm.get(field)!.enable();
            }
        }
    }

    /**
     * Disable the form fields
     */
    desableFormFields(): void {
        if(!!this.contactForm) {
            for(const field in this.contactForm.controls) {
                this.contactForm.controls[field].disable();
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
