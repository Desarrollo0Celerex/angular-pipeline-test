import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { BRAND_NAME_LENGTH, EMAIL_LENGTH, FREE_TEXT_LENGTH, OWN_NAME_LENGTH, 
    WEB_LINK_LENGTH, CONTACT_SOURCE_TYPES, CONTACT_TYPES, CONTACT_INFORMATION_TYPES 
} from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';

import { CivilStatus } from '@interfaces/civil-status.interface';
import { Contact } from '@interfaces/contact.interface';
import { ContactInformation } from '@interfaces/contact-information.interface';
import { ContactOccupation } from '@interfaces/contact-occupation.interface';
import { ContactStudy } from '@interfaces/contact-study.interface';
import { ContactJob } from '@interfaces/contact-job.interface';
import { ContactCar } from '@interfaces/contact-car.interface';
import { ContactHome } from '@interfaces/contact-home.interface';
import { ContactSmartphone } from '@interfaces/contact-smartphone.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Gender } from '@interfaces/gender.interface';
import { MainContactType } from '@interfaces/main-contact-type.interface';
import { Offspring } from '@interfaces/offspring.interface';
import { UpdateContactDataSend } from '@interfaces/update-contact-data-send.interface';
import { Country } from '@interfaces/country.interface';
import { State } from '@interfaces/state.interface';

import { CivilStatusService } from '@services/civil-status.service';
import { ContactService } from '@services/contact.service';
import { ContactCatalogService } from '@services/contact-catalog.service';
import { ContactInformationService } from '@services/contact-information.service';
import { ContactOccupationService } from '@services/contact-occupation.service';
import { GendersService } from '@services/genders.service';
import { OffspringService } from '@services/offspring.service';
import { CountryService } from '@services/country.service';
import { StateService } from '@services/state.service';

@Injectable()
export class ShowContactDataService {
    contactForm: UntypedFormGroup = this._formBuilder.group({});
    civilStatus: CivilStatus[] = [];
    contact: Contact | null = null;
    contactCars: ContactCar[] = [];
    contactHomes: ContactHome[] = [];
    contactJobs: ContactJob[] = [];
    contactOccupations: ContactOccupation[] = [];
    contactSmartphones: ContactSmartphone[] = [];
    contactStudies: ContactStudy[] = [];
    genders: Gender[] = [];
    mainContactTypes: MainContactType[] = [];
    offsprings: Offspring[] = [];
    countries: Country[] = [];
    states: State[] = [];

    constructor(
        private _civilStatusService: CivilStatusService,
        private _contactCatalogService: ContactCatalogService,
        private _contactInformationService: ContactInformationService,
        private _contactOccupationService: ContactOccupationService,
        private _contactService: ContactService,
        private _datePipe: DatePipe,
        private _formBuilder: UntypedFormBuilder,
        private _gendersService: GendersService,
        private _offspringService: OffspringService,
        private _countryService: CountryService,
        private _stateService: StateService
    ) { }

    get contactInformations(): FormArray {
        return this.f.contactInformations as FormArray;
    }

    get f() {
        return this.contactForm.controls;
    }

    buildForm(): void {
        if(this.contact !== null) {
            this.contactForm = this._formBuilder.group({
                rfc: [this.contact.rfc || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                facebook: [this.contact.facebook || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                instagram: [this.contact.instagram || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                linkedin: [this.contact.linkedin || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                twitter: [this.contact.twitter || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                website: [this.contact.website || '', [Validators.minLength(WEB_LINK_LENGTH.MIN), Validators.maxLength(WEB_LINK_LENGTH.MAX), ValidatorsHelper.webLink]],
                street: [this.contact.street || '', [Validators.minLength(FREE_TEXT_LENGTH), Validators.maxLength(FREE_TEXT_LENGTH), ValidatorsHelper.freeText]],
                exteriorNumber: [this.contact.exteriorNumber || '', [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.alphanumeric]],
                interiorNumber: [this.contact.interiorNumber || '', [Validators.minLength(1), Validators.maxLength(30), ValidatorsHelper.alphanumeric]],
                colony: [this.contact.colony || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                city: [this.contact.city || '', [Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
                stateId: [this.contact.stateId || '', [Validators.required]],
                postalCode: [this.contact.postalCode || '', [ValidatorsHelper.postalCode]],
                countryId: [this.contact.countryId || '', [Validators.required]],
                contactInformations: this._formBuilder.array([])
            });

            if(!!this.contact.contactTypeId && this.contact.contactTypeId == CONTACT_TYPES.PERSON) {
                this.contactForm.addControl('name', new FormControl(this.contact.name || '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]))
                this.contactForm.addControl('namePaternal', new FormControl(this.contact.namePaternal || '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]))
                this.contactForm.addControl('nameMaternal', new FormControl(this.contact.nameMaternal || '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]))
                this.contactForm.addControl('genderId', new FormControl(this.contact.genderId || '', [Validators.required, ValidatorsHelper.number]))
                this.contactForm.addControl('birthdate', new FormControl(this._getDateFormat(this.contact.birthdate) || '', [ValidatorsHelper.date]))
                this.contactForm.addControl('civilStatusId', new FormControl(this.contact.civilStatusId || '', [ValidatorsHelper.number]))
                this.contactForm.addControl('offspringId', new FormControl(this.contact.offspringId || '', [ValidatorsHelper.number]))
                this.contactForm.addControl('contactStudyId', new FormControl(this.contact.contactStudyId || '', [ValidatorsHelper.number]))
                this.contactForm.addControl('contactOccupationId', new FormControl(this.contact.contactOccupationId || '', [ValidatorsHelper.number]))
                this.contactForm.addControl('contactJobId', new FormControl(this.contact.contactJobId || '', [ValidatorsHelper.number]))
                this.contactForm.addControl('contactHomeId', new FormControl(this.contact.contactHomeId || '', [ValidatorsHelper.number]))
                this.contactForm.addControl('contactCarId', new FormControl(this.contact.contactCarId || '', [ValidatorsHelper.number]))
                this.contactForm.addControl('contactSmartphoneId', new FormControl(this.contact.contactSmartphoneId || '', [ValidatorsHelper.number]))
            } else {
                this.contactForm.addControl('companyName', new FormControl(this.contact.companyName || '', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]))
                this.contactForm.addControl('brandName', new FormControl(this.contact.brandName || '', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName])) 
            }
        }
    }

    loadCatalogs(): void {
        this.loadCountries();
        this.loadMainContactTypes();
        if(this.contact !== null && !!this.contact.contactTypeId && this.contact.contactTypeId === CONTACT_TYPES.PERSON) {
            this.loadGenders();
            this.loadOffsprings();
            this.loadCivilStatus();
            this.loadContactOccupations();
            this.loadContactStudies();
            this.loadContactJobs();
            this.loadContactHomes();
            this.loadContactCars();
            this.loadContactSmartphones();
        }
    }

    /**
     * Load the civil status
     * @return           Notice of action done
     */
    loadCivilStatus(): void {
        const fields: string = 'civilStatusId,name';
        this._civilStatusService.getCivilStatus(fields).subscribe((res: HttpResponse) => {
            this.civilStatus = res.data;
        });
    }

    loadContactStudies(): void {
        const fields: string = 'contactStudyId,name';
        this._contactCatalogService.getContactStudies(fields).subscribe((res: HttpResponse) => {
            this.contactStudies = res.data;
        });
    }

    loadContactJobs(): void {
        const fields: string = 'contactJobId,name';
        this._contactCatalogService.getContactJobs(fields).subscribe((res: HttpResponse) => {
            this.contactJobs = res.data;
        });
    }

    loadContactHomes(): void {
        const fields: string = 'contactHomeId,name';
        this._contactCatalogService.getContactHomes(fields).subscribe((res: HttpResponse) => {
            this.contactHomes = res.data;
        });
    }

    loadContactCars(): void {
        const fields: string = 'contactCarId,name';
        this._contactCatalogService.getContactCars(fields).subscribe((res: HttpResponse) => {
            this.contactCars = res.data;
        });
    }
    
    loadContactSmartphones(): void {
        const fields: string = 'contactSmartphoneId,name';
        this._contactCatalogService.getContactSmartphones(fields).subscribe((res: HttpResponse) => {
            this.contactSmartphones = res.data;
        });
    }

    loadMainContactTypes(): void {
        const fields: string = 'mainContactTypeId,name';
        this._contactCatalogService.getMainContactTypes(fields).subscribe((res: HttpResponse) => {
            this.mainContactTypes = res.data;
        });
    }

    /**
     * Load the cantact data
     * @param contactId  The contact ID
     * @return           Notice of action done
     */
    loadContact(contactId: string): Observable<void> {
        const fields: string = 'name,namePaternal,nameMaternal,genderId,birthdate,civilStatusId,contactStudyId,contactOccupationId,contactJobId,contactHomeId,contactCarId,contactSmartphoneId,offspringId,companyName,brandName,rfc,website,street,exteriorNumber,interiorNumber,colony,city,stateId,postalCode,countryId,phoneCodeId,workspaceCountryId,phoneNumber,email,contactTypeId,facebook,instagram,linkedin,twitter';
        return this._contactService.getContact(contactId, fields).pipe(
            tap((res: HttpResponse) => {
                this.contact = res.data;
                this.loadCountryStates(res.data.countryId);
            }),
            map(() => { })
        );
    }

    loadContactInformations(contactId: string): void {
        const fields: string = 'contactInformationId,email,phoneCodeId,phoneNumber,responsibleName,mainContactTypeId,contactInformationTypeId';
        this._contactInformationService.getContactInformations(contactId, fields).subscribe((res: HttpResponse) => {
            this._buildFormContactInformations(res.data.items);
        })
    }

    /**
     * Load the cantact occupations
     * @return           Notice of action done
     */
    loadContactOccupations(): void {
        const fields: string = 'contactOccupationId,name';
        this._contactOccupationService.getContactOccupations(fields).subscribe((res: HttpResponse) => {
            this.contactOccupations = res.data;
        });
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

    /**
     * Load the genders
     * @return  Notice of action done
     */
    loadGenders(): void {
        const fields: string = 'genderId,name';
        this._gendersService.getGenders(fields).subscribe((res: HttpResponse) => {
            this.genders = res.data;
        });
    }

    /**
     * Load the offsprings
     * @return  Notice of action done
     */
    loadOffsprings(): void {
        const fields: string = 'offspringId,name';
        this._offspringService.getOffsprings(fields).subscribe((res: HttpResponse) => {
            this.offsprings = res.data;
        });
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

    private _buildFormContactInformations(contactInformations: ContactInformation[]): void {
        this._addMainContacts(contactInformations);
        const issuesContact: ContactInformation | null = this._findContactInformation(CONTACT_INFORMATION_TYPES.ISSUES, contactInformations);
        const paymentsContact: ContactInformation | null = this._findContactInformation(CONTACT_INFORMATION_TYPES.PAYMENTS, contactInformations);
        const sinistersContact: ContactInformation | null = this._findContactInformation(CONTACT_INFORMATION_TYPES.SINISTERS, contactInformations);
        this._addContactInformation(issuesContact, CONTACT_INFORMATION_TYPES.ISSUES);
        this._addContactInformation(paymentsContact, CONTACT_INFORMATION_TYPES.PAYMENTS);
        this._addContactInformation(sinistersContact, CONTACT_INFORMATION_TYPES.SINISTERS);
    }

    private _addMainContacts(contactInformations: ContactInformation[]): void {
        for(let contactInformation of contactInformations) {
            if(contactInformation.contactInformationTypeId === CONTACT_INFORMATION_TYPES.MAIN) {
                this._addContactInformation(contactInformation, CONTACT_INFORMATION_TYPES.MAIN);
            }
        }
        if(this.contactInformations.length === 0) {
            this._addContactInformation(null, CONTACT_INFORMATION_TYPES.MAIN);
        }
    }

    private _addContactInformation(contactInformation: ContactInformation | null = null, contactInformationTypeId: number): void {
        this.contactInformations.push(this._newContactInformation(contactInformation, contactInformationTypeId));
    }

    private _findContactInformation(key: number, data: ContactInformation[]): ContactInformation | null {
        const contactInformation: ContactInformation | undefined = data.find((element: ContactInformation) => element.contactInformationTypeId === key)
        return (!!contactInformation) ? contactInformation : null;
    }

    private _getDateFormat(date: string | null): string {
        let dateFormat: string = '';
        if(!!date) {
            const formattedDate: string | null = this._datePipe.transform(date, 'dd/MM/yyyy');
            dateFormat = (!!formattedDate) ? formattedDate : '';
        }
        return dateFormat;
    }

    private _newContactInformation(contactInformation: ContactInformation | null = null, contactInformationTypeId: number): FormGroup {
        return this._formBuilder.group({
            contactInformationId: [(contactInformation !== null && contactInformation.contactInformationId) ? contactInformation.contactInformationId : ''],
            email: [(contactInformation !== null && contactInformation.email) ? contactInformation.email : '', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
            phoneCodeId: [(contactInformation !== null && contactInformation.phoneCodeId) ? contactInformation.phoneCodeId : this.contact!.workspaceCountryId, [ValidatorsHelper.number]],
            phoneNumber: [(contactInformation !== null && contactInformation.phoneNumber) ? contactInformation.phoneNumber : '', [ValidatorsHelper.phoneNumber]],
            responsibleName: [(contactInformation !== null && contactInformation.responsibleName) ? contactInformation.responsibleName : '', [Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
            mainContactTypeId: [(contactInformation !== null && contactInformation.mainContactTypeId) ? contactInformation.mainContactTypeId : '', [ValidatorsHelper.number]],
            contactInformationTypeId: [contactInformationTypeId]
        });
    }
}
