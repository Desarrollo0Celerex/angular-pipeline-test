import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { BUTTON_TYPES, CONTACT_TYPES } from '@constants/global';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@services/loading.service';

import { ShowContactDataService } from './show-contact-data.service';

declare var $: any;
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var Select2Plugin: any;

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
    canEdit: boolean = false;
    contactId: string = '';
    modalIdIncompleteContactData: string = 'agt-incomplete-contact-data';
    modalIdTransferContact: string = 'agt-transfer-contact';
    selectIdContactOccupations: string = 'agt-contact-occupations';
    selectIdSecondaryContactRelations: string = 'agt-secondary-contact-relations';
    selectIdCivilStatus: string = 'agt-civil-status';
    selectIdGenders: string = 'agt-genders';
    selectIdOffstrings: string = 'agt-offsprings';
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

    /**
     * Click event to enable the fields of the contact form
     */
    onClickEditContact(): void {
        this.canEdit = true;
        this.showContactDataService.enableFormFields();
    }

    /**
     * Click event to transfer contact
     */
    onClickTransferContact(): void {
        ModalPlugin.show(this.modalIdTransferContact);
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
                AlertHelper.contactUpdated(this._disabledContactForm, this);
            })
        }
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId || '';
    }

    /**
     * Disabled the contact form
     * @param context The app context
     */
    private _disabledContactForm(context: ShowContactDataPage): void {
        context.canEdit = false;
        context.showContactDataService.desableFormFields();
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdBirthdate, this._onChangeDate, this);
    }

    /**
     * Load the civil status
     */
    private _loadCivilStatus(): void {
        this.showContactDataService.loadCivilStatus().subscribe(() => {
            Select2Plugin.initSelect();
            this._onChangeCivilId();
        })
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
            this.showContactDataService.desableFormFields();
            this._loadGenders();
            this._initCalendars();
            this._loadOffsprings();
            this._loadCivilStatus();
            this._loadContactRelations();
            this._loadContactOccupations();
        })
    }

    /**
     * Load the genders
     */
    private _loadContactOccupations(): void {
        this.showContactDataService.loadContactOccupations().subscribe(() => {
            Select2Plugin.initSelect();
            this._onChangeContactOccupationId();
        })
    }

    /**
     * Load the genders
     */
    private _loadContactRelations(): void {
        this.showContactDataService.loadContactRelations().subscribe(() => {
            Select2Plugin.initSelect();
            this._onChangeSecondaryContactRelationId();
        })
    }

    /**
     * Load the genders
     */
    private _loadGenders(): void {
        this.showContactDataService.loadGenders().subscribe(() => {
            Select2Plugin.initSelect();
            this._onChangeGenderId();
        })
    }

    /**
     * Load the offsprings
     */
    private _loadOffsprings(): void {
        this.showContactDataService.loadOffsprings().subscribe(() => {
            Select2Plugin.initSelect();
            this._onChangeOffspringId();
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

    /**
     * Event to change the gender ID value
     */
    private _onChangeCivilId(): void {
        $('select#'+this.selectIdCivilStatus).on('change', (element: any) => {
            this.showContactDataService.contactForm.patchValue({civilStatusId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the gender ID value
     */
    private _onChangeContactOccupationId(): void {
        $('select#'+this.selectIdContactOccupations).on('change', (element: any) => {
            this.showContactDataService.contactForm.patchValue({contactOccupationId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the gender ID value
     */
    private _onChangeSecondaryContactRelationId(): void {
        $('select#'+this.selectIdSecondaryContactRelations).on('change', (element: any) => {
            this.showContactDataService.contactForm.patchValue({secondaryContactRelationId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the gender ID value
     */
    private _onChangeGenderId(): void {
        $('select#'+this.selectIdGenders).on('change', (element: any) => {
            this.showContactDataService.contactForm.patchValue({genderId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the offspring ID value
     */
    private _onChangeOffspringId(): void {
        $('select#'+this.selectIdOffstrings).on('change', (element: any) => {
            this.showContactDataService.contactForm.patchValue({offspringId: element.currentTarget.value});
        });
    }

}
