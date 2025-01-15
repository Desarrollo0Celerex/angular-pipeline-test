import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ERROR_CODES } from '@constants/error-codes';
import {
    BRAND_NAME_LENGTH,
    DEFAULT_CONTACT_SOURCE_ID,
    DEFAULT_CONTACT_SOURCE_TYPE_ID,
    DEFAULT_PHONE_CODE_ID,
    EMAIL_LENGTH,
    OWN_NAME_LENGTH,
} from '@constants/global';
import { IGNORE_MATCHES } from '@contact/constants/ignore-matches';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { CONTACT_TYPES } from '@contact/enums/contact-types.enum';
import { ContactService } from '@contact/services/contact.service';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { Country } from '@countries/interfaces/country.interface';
import { CountryService } from '@countries/services/country.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpError } from '@interfaces/http-error.interface';
import { QUOTATION_ROUTES } from '@quotation/constants/routes';
import { State } from '@state/interfaces/state.interface';
import { StateService } from '@state/services/state.service';
import { WorkspaceService } from '@workspace/services/workspace.service';
import { DuplicateContactModalComponent } from '../duplicate-contact-modal/duplicate-contact-modal.component';
import { CONTACTS_ROUTES } from '@contact/constants/routes';
import { CreatePolicyModalService } from '@policy/components/create-policy-modal/create-policy-modal.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-create-contact-modal',
    templateUrl: './create-contact-modal.component.html',
    styles: [],
    standalone: false
})
export class CreateContactModalComponent implements OnInit {
    @ViewChild(DuplicateContactModalComponent)
    duplicateContactModalComponent!: DuplicateContactModalComponent;
    CONTACT_TYPES = CONTACT_TYPES;
    contactType = 0;
    countries: Country[] = [];
    form = this._buildForm();
    isFormCreated = false;
    modalId = 'agt-create-contact-modal';
    modalData = {
        title: '',
        description: '',
        buttonIcon: '',
        buttonLabel: '',
    };
    states: State[] = [];
    private _contactAction = 0;
    private _contactId?: string = undefined;
    private _policyId?: string = undefined;
    private _isFormSubmitted = false;

    constructor(
        private _contactService: ContactService,
        private _countryService: CountryService,
        private _createPolicyModalService: CreatePolicyModalService,
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _router: Router,
        private _stateService: StateService,
        private _workspaceService: WorkspaceService
    ) {}

    ngOnInit(): void {
        this._loadCountries();
        this._loadWorkspaceCountry();
    }

    changePhoneCodeId(phoneCodeId: number): void {
        this.form.patchValue({ phoneCodeId });
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
        this._isFormSubmitted = false;
        this._removeFormFields();
        this._resetFormFields();
    }

    createDuplicateContact(): void {
        this._createContact(IGNORE_MATCHES.YES);
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    loadStates(): void {
        const countryId = this.form.value.countryId;
        const fields = 'stateId,name';
        this._stateService.getStates(countryId, fields).subscribe((states) => {
            this.states = states;
            this._patchStateIdField(this.states[0].stateId);
        });
    }

    openModal(data: {
        contactAction: CONTACT_ACTIONS;
        contactType: CONTACT_TYPES;
        contactId?: string;
        policyId?: string;
    }): void {
        this._contactAction = data.contactAction;
        this.contactType = data.contactType;
        this._contactId = data.contactId;
        this._policyId = data.policyId;
        this._generateModalData();
        this._addFormFields();
        ModalPlugin.show(this.modalId);
    }

    reopenModal(): void {
        ModalPlugin.show(this.modalId);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._createContact(IGNORE_MATCHES.NO);
        }
    }

    viewMatches(): void {
        const contact = this.form.value;
        this.closeModal();
        this._router.navigate([CONTACTS_ROUTES.listContactCoincidences], {
            state: { contact },
            queryParams: {
                contactTypeId: this.contactType,
                actionType: this._contactAction,
                originContactId: this._contactId,
                originPolicyId: this._policyId,
            },
        });
    }

    private _addFormFields(): void {
        switch (this.contactType) {
            case CONTACT_TYPES.PERSON:
                this._addPersonFields();
                break;

            case CONTACT_TYPES.COMPANY:
                this._addCompanyFields();
                break;
        }
        this.isFormCreated = true;
    }

    private _addCompanyFields(): void {
        this.form.addControl(
            'companyName',
            new FormControl('', [
                Validators.required,
                Validators.minLength(BRAND_NAME_LENGTH.MIN),
                Validators.maxLength(BRAND_NAME_LENGTH.MAX),
                ValidatorsHelper.brandName,
            ])
        );
        this.form.addControl(
            'brandName',
            new FormControl('', [
                Validators.required,
                Validators.minLength(BRAND_NAME_LENGTH.MIN),
                Validators.maxLength(BRAND_NAME_LENGTH.MAX),
                ValidatorsHelper.brandName,
            ])
        );
        this.form.addControl(
            'legalRepresentative',
            new FormControl('', [
                Validators.minLength(OWN_NAME_LENGTH.MIN),
                Validators.maxLength(OWN_NAME_LENGTH.MAX),
                ValidatorsHelper.ownName,
            ])
        );
        this.form.addControl(
            'comercialActivity',
            new FormControl('', [
                Validators.minLength(BRAND_NAME_LENGTH.MIN),
                Validators.maxLength(BRAND_NAME_LENGTH.MAX),
                ValidatorsHelper.brandName,
            ])
        );
        this.form.addControl(
            'contactTypeId',
            new FormControl(CONTACT_TYPES.COMPANY, [Validators.required])
        );
    }

    private _addPersonFields(): void {
        this.form.addControl(
            'name',
            new FormControl('', [
                Validators.required,
                Validators.minLength(OWN_NAME_LENGTH.MIN),
                Validators.maxLength(OWN_NAME_LENGTH.MAX),
                ValidatorsHelper.ownName,
            ])
        );
        this.form.addControl(
            'namePaternal',
            new FormControl('', [
                Validators.required,
                Validators.minLength(OWN_NAME_LENGTH.MIN),
                Validators.maxLength(OWN_NAME_LENGTH.MAX),
                ValidatorsHelper.ownName,
            ])
        );
        this.form.addControl(
            'nameMaternal',
            new FormControl('', [
                Validators.minLength(OWN_NAME_LENGTH.MIN),
                Validators.maxLength(OWN_NAME_LENGTH.MAX),
                ValidatorsHelper.ownName,
            ])
        );
        this.form.addControl(
            'contactTypeId',
            new FormControl(CONTACT_TYPES.PERSON, [Validators.required])
        );
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            countryId: ['', [Validators.required]],
            stateId: ['', [Validators.required]],
            contactSourceId: [DEFAULT_CONTACT_SOURCE_ID, [Validators.required]],
            contactSourceTypeId: [
                DEFAULT_CONTACT_SOURCE_TYPE_ID,
                [Validators.required],
            ],
            email: [
                '',
                [
                    Validators.email,
                    Validators.minLength(EMAIL_LENGTH.MIN),
                    Validators.maxLength(EMAIL_LENGTH.MAX),
                ],
            ],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: ['', [ValidatorsHelper.phoneNumber]],
        });
    }

    private _createContact(ignoreMatches: boolean): void {
        const requestBody = {
            ...this.form.value,
            ignoreMatches,
        };
        this._loadingService.show();
        ModalPlugin.hide(this.modalId);
        this._contactService.createContact(requestBody).subscribe(
            (contactId) => {
                this._loadingService.hide();
                this._doAction(contactId);
            },
            (error: HttpError) => {
                switch (error.error) {
                    case ERROR_CODES.contactHasCoincidences:
                        this.duplicateContactModalComponent.openModal();
                        break;
                }
            }
        );
    }

    private _doAction(contactId: string): void {
        this.closeModal();
        switch (this._contactAction) {
            case CONTACT_ACTIONS.CREATE_QUOTATION:
                this._goToCreateQuotationPage(contactId);
                break;

            case CONTACT_ACTIONS.CREATE_POLICY:
                this._createPolicyModalService.openModal({
                    contactId,
                    contactAction: this._contactAction,
                    contactType: this.contactType,
                });
                break;

            case CONTACT_ACTIONS.RENEW_POLICY:
            case CONTACT_ACTIONS.REISSUE_POLICY:
                this._createPolicyModalService.openModal({
                    contactId: this._contactId!,
                    contactAction: this._contactAction,
                    contactType: this.contactType,
                    oldPolicyId: this._policyId!,
                    newContactId: contactId,
                });
                break;
        }
    }

    private _generateModalData(): void {
        switch (this._contactAction) {
            case CONTACT_ACTIONS.CREATE_QUOTATION:
                this.modalData = {
                    title: 'Crear Prospecto',
                    description: 'Ingresa los datos para guardar al prospecto.',
                    buttonIcon: '🛡️',
                    buttonLabel: 'COTIZAR SEGURO',
                };
                break;

            case CONTACT_ACTIONS.CREATE_POLICY:
            case CONTACT_ACTIONS.RENEW_POLICY:
            case CONTACT_ACTIONS.REISSUE_POLICY:
                this.modalData = {
                    title: 'Crear Cliente',
                    description: 'Ingresa los datos para guardar al cliente.',
                    buttonIcon: '🗃️',
                    buttonLabel: 'CARGAR PÓLIZA',
                };
                break;
        }
    }

    private _goToCreateQuotationPage(contactId: string): void {
        this._router.navigateByUrl(QUOTATION_ROUTES.createQuotation(contactId));
    }

    private _loadCountries(): void {
        const fields = 'countryId,name';
        this._countryService.getCountries(fields).subscribe((countries) => {
            this.countries = countries;
        });
    }

    private _loadWorkspaceCountry(): void {
        const fields: string = 'countryId';
        this._workspaceService.getWorkspace(fields).subscribe((workspace) => {
            this._patchCuntryIdField(workspace.countryId);
        });
    }

    private _patchCuntryIdField(countryId: number): void {
        this.form.patchValue({
            countryId,
            phoneCodeId: countryId,
        });
        this.loadStates();
    }

    private _patchStateIdField(stateId: number): void {
        this.form.patchValue({
            stateId,
        });
    }

    private _removeFormFields(): void {
        switch (this.contactType) {
            case CONTACT_TYPES.PERSON:
                this._removePersonFields();
                break;

            case CONTACT_TYPES.COMPANY:
                this._removeCompanyFields();
                break;
        }
        this.isFormCreated = false;
    }

    private _removeCompanyFields(): void {
        this.form.removeControl('companyName');
        this.form.removeControl('brandName');
        this.form.removeControl('legalRepresentative');
        this.form.removeControl('comercialActivity');
        this.form.removeControl('contactTypeId');
    }

    private _removePersonFields(): void {
        this.form.removeControl('name');
        this.form.removeControl('namePaternal');
        this.form.removeControl('nameMaternal');
        this.form.removeControl('contactTypeId');
    }

    private _resetFormFields(): void {
        this.form.patchValue({
            email: '',
            phoneCodeId: DEFAULT_PHONE_CODE_ID,
            phoneNumber: '',
        });
    }
}
