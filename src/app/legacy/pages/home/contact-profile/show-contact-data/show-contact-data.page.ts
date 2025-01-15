import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import {
    BUTTON_TYPES,
    CONTACT_TYPES,
    CONTACT_INFORMATION_TYPES,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { ShowContactDataService } from './show-contact-data.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-show-contact-data',
    templateUrl: './show-contact-data.page.html',
    styles: [],
    providers: [ShowContactDataService],
    standalone: false
})
export class ShowContactDataPage implements OnInit {
    BUTTON_TYPES: any = BUTTON_TYPES;
    CONTACT_INFORMATION_TYPES: any = CONTACT_INFORMATION_TYPES;
    CONTACT_TYPES: any = CONTACT_TYPES;
    calendarIdBirthdate: string = 'birthdate';
    contactId: string = '';
    modalIdIncompleteContactData: string = 'agt-incomplete-contact-data';
    modalIdShowContactData: string = 'agt-show-contact-data';
    private _isFormSubmitted: boolean = false;

    constructor(
        public showContactDataService: ShowContactDataService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._loadContact();
        let aux = this.showContactDataService.contactInformations;
    }

    getContactInformationDescription(control: AbstractControl): string {
        const contactInformationTypeId: number = control.get(
            'contactInformationTypeId'
        )!.value;
        let description: string = '';
        switch (contactInformationTypeId) {
            case CONTACT_INFORMATION_TYPES.ISSUES:
                description =
                    'Ingresa los datos para notificar sobre emisiones, renovaciones y vencimiento de pólizas.';
                break;

            case CONTACT_INFORMATION_TYPES.PAYMENTS:
                description =
                    'Ingresa los datos para notificar sobre aplicaciones de pago y recibos pendientes.';
                break;

            case CONTACT_INFORMATION_TYPES.SINISTERS:
                description =
                    'Ingresa los datos para notificar sobre reportes y actualización de siniestros.';
                break;
        }
        return description;
    }

    getContactInformationTitle(control: AbstractControl): string {
        const contactInformationTypeId: number = control.get(
            'contactInformationTypeId'
        )!.value;
        let title: string = '';
        switch (contactInformationTypeId) {
            case CONTACT_INFORMATION_TYPES.MAIN:
                title = 'Contacto Principal';
                break;

            case CONTACT_INFORMATION_TYPES.ISSUES:
                title = 'Contacto para Notificaciones';
                break;

            case CONTACT_INFORMATION_TYPES.PAYMENTS:
                title = 'Contacto para Cobranza';
                break;

            case CONTACT_INFORMATION_TYPES.SINISTERS:
                title = 'Contacto de Siniestros';
                break;
        }
        return title;
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.showContactDataService.contactForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getErrorMessageAux(constrolName: string, index: number): string {
        const control: AbstractControl | null =
            this.showContactDataService.contactInformations
                .at(index)
                .get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.showContactDataService.contactForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    getValidationClassAux(constrolName: string, index: number): string {
        const control: AbstractControl | null =
            this.showContactDataService.contactInformations
                .at(index)
                .get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    loadCountryStates(): void {
        this.showContactDataService.f.stateId.setValue(null);
        this.showContactDataService.loadCountryStates(
            this.showContactDataService.f.countryId.value
        );
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
        this.showContactDataService.contactForm.patchValue({ phoneCodeId });
    }

    /**
     * Submit event to update the contact data
     */
    onSubmitUpdateContact(): void {
        this._isFormSubmitted = true;
        if (
            !!this.showContactDataService.contactForm &&
            this.showContactDataService.contactForm.valid
        ) {
            this._loadingService.show();
            this.showContactDataService
                .updateContact(this.contactId)
                .subscribe(() => {
                    this._loadingService.hide();
                    AlertHelper.contactUpdated();
                    this._router.navigateByUrl(
                        ROUTES_NAME.contactResume(this.contactId)
                    );
                });
        }
    }

    selectPhoneCodeId(phoneCodeId: number, index: number): void {
        this.showContactDataService.contactInformations
            .at(index)
            .patchValue({ phoneCodeId });
    }

    showModalToDownloadContact(): void {
        ModalPlugin.show(this.modalIdShowContactData);
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
        DatePickerPlugin.initElement(
            this.calendarIdBirthdate,
            this._onChangeDate,
            this
        );
    }

    /**
     * Load the contact data
     * Build the contact form
     */
    private _loadContact(): void {
        this.showContactDataService
            .loadContact(this.contactId)
            .subscribe(() => {
                this.showContactDataService.loadCatalogs();
                this.showContactDataService.buildForm();
                this.showContactDataService.loadContactInformations(
                    this.contactId
                );
                this._initCalendars();
            });
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ShowContactDataPage
    ): void {
        context.showContactDataService.contactForm.patchValue({
            [selectorId]: changedValue,
        });
    }
}
