import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { BUTTON_TYPES, CONTACT_TYPES } from '@constants/global';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SelectContactSourceData } from '@interfaces/select-contact-source-data.interface';
import { LoadingService } from '@services/loading.service';

import { ShowContactDataService } from './show-contact-data.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-show-contact-data',
  templateUrl: './show-contact-data.page.html',
  styles: [
  ],
  providers: [ShowContactDataService]
})
export class ShowContactDataPage implements OnInit {
    BUTTON_TYPES: any = BUTTON_TYPES;
    CONTACT_TYPES: any = CONTACT_TYPES;
    calendarIdBirthdate: string = 'birthdate';
    contactId: string = '';
    modalIdIncompleteContactData: string = 'agt-incomplete-contact-data';
    modalIdSelectContactSource: string = 'agt-select-contact-source';
    private _isFormSubmitted: boolean = false;

    constructor(
        public showContactDataService: ShowContactDataService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this._catchParams();
        this._loadContact();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.showContactDataService.contactForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.showContactDataService.contactForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    loadCountryStates(): void {
        this.showContactDataService.f.stateId.setValue(null);
        this.showContactDataService.loadCountryStates(this.showContactDataService.f.countryId.value);
    }

    /**
     * Event to catch the action failed
     */
    onContactActionFailed(): void {
        ModalPlugin.show(this.modalIdIncompleteContactData);
    }

    /**
     * Event to update the selected contact ID
     * @param phoneCodeId The selected contact ID
     */
    onPhoneCodeIdSelected(phoneCodeId: number): void {
        this.showContactDataService.contactForm.patchValue({phoneCodeId});
    }

    /**
     * Event to update the secondary contact phone code ID
     * @param secondaryContactPhoneCodeId The selected secondary contact phone code ID
     */
    onSecondaryContactPhoneCodeIdSelected(secondaryContactPhoneCodeId: number): void {
        this.showContactDataService.contactForm.patchValue({secondaryContactPhoneCodeId});
    }

    /**
     * Submit event to update the contact data
     */
    onSubmitUpdateContact(): void {
        this._isFormSubmitted = true;
        if(!!this.showContactDataService.contactForm && this.showContactDataService.contactForm.valid) {
            this._loadingService.show();
            this.showContactDataService.updateContact(this.contactId).subscribe( () => {
                this._loadingService.hide();
                AlertHelper.contactUpdated();
            })
        }
    }

    /**
     * Click event to transfer contact
     */
    selectContactSource(): void {
        ModalPlugin.show(this.modalIdSelectContactSource);
    }

    updateContactSource(data: SelectContactSourceData): void {
        this._loadingService.show();
        this.showContactDataService.updateContactSource(this.contactId, data).subscribe(() => {
            this._loadingService.hide();
            AlertHelper.contactSourceUpdated();
        });
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId || '';
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdBirthdate, this._onChangeDate, this);
    }

    /**
     * Load the contact data
     * Build the contact form
     */
    private _loadContact(): void {
        this.showContactDataService.loadContact(this.contactId).subscribe( () => {
            if(this.showContactDataService.contact?.contactTypeId === CONTACT_TYPES.PERSON) {
                this.showContactDataService.buildPersonForm();
            } else {
                this.showContactDataService.buildCompanyForm();
            }
            this._initCalendars();
            this.showContactDataService.loadGenders()
            this.showContactDataService.loadOffsprings();
            this.showContactDataService.loadCivilStatus();
            this.showContactDataService.loadContactRelations();
            this.showContactDataService.loadContactOccupations();
            this.showContactDataService.loadCountries();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ShowContactDataPage): void {
        context.showContactDataService.contactForm.patchValue({[selectorId]: changedValue});
    }

}
