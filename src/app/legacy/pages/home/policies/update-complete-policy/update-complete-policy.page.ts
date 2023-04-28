import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

import {
    DOCUMENT_FORMATS,
    FILE_TYPES,
    INSURANCE_GROUPS,
    INSURANCE_TYPES,
    CONTACT_TYPES,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { PolicyInsuredHelper } from '@helpers/policy-insured-helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@core/services/loading.service';

import { UpdateCompletePolicyService } from './update-complete-policy.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;
declare var Select2Plugin: any;

@Component({
    selector: 'agt-update-complete-policy',
    templateUrl: './update-complete-policy.page.html',
    styles: [],
    providers: [UpdateCompletePolicyService],
})
export class UpdateCompletePolicyPage implements OnInit {
    CONTACT_TYPES: any = CONTACT_TYPES;
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    INSURANCE_TYPES: any = INSURANCE_TYPES;
    calendarIdEmissionDate: string = 'emissionDate';
    calendarIdValidityEndDate: string = 'validityEndDate';
    calendarIdValidityStartDate: string = 'validityStartDate';
    contactId: string = '';
    message: string = 'Actualiza los datos de la póliza';
    modalIdConfirmRemoveInsured: string = 'agt-confirm-remove-insured';
    modalIdPolicyAmountsDifferent: string = 'agt-policy-amounts-different';
    modalIdSelectFile: string = 'agt-select-file';
    modalIdShowPolicy: string = 'agt-show-policy';
    modalIdShowPolicyFile: string = 'agt-show-policy-file';
    modalSelectFileData: ModalSelectFileData = {
        title: 'Actualizar Póliza',
        description: 'Selecciona el formato digital de la póliza.',
        buttonLabel: 'Cargar poliza',
        formats: DOCUMENT_FORMATS,
        fileType: FILE_TYPES.DOCUMENT,
    };
    policyId: string = '';
    searchIdInsurers: string = 'insurerId';
    searchIdInsurances: string = 'insuranceId';
    /* searchIdInsurers: string = 'agt-search-insurers';
    searchIdInsurances: string = 'agt-search-insurances'; */
    selectedPolicyUrl: string = '';
    selectedCertificate: string = '';
    private _isFormSubmitted: boolean = false;
    private _selectedInsuredIndex: number = 0;

    constructor(
        public model: UpdateCompletePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._loadPolicy();
    }

    get areSeveralInsured(): boolean {
        if (this.model.policy !== null && !!this.model.policy.insuranceTypeId) {
            return PolicyInsuredHelper.checkAreSeveralInsured(
                this.model.policy.insuranceTypeId
            );
        }
        return false;
    }

    get labelPolicyCommissionCurrency(): string {
        const currencyId: number = parseInt(this.model.f.currencyId.value);
        if (!!currencyId && this.model.currencies.length > 0) {
            return this.model.currencies[currencyId - 1].name;
        }
        return '';
    }

    get objectNameLabel(): string {
        let label: string = '';
        if (!!this.model.policy && !!this.model.policy.insuranceGroupId) {
            switch (this.model.policy.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS:
                case INSURANCE_GROUPS.MERCHANDISE:
                    label = 'Nombre del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.RC:
                    label = 'Nombre de la Persona o Bien Asegurado';
                    break;
            }
        }
        return label;
    }

    get objectUsageLabel(): string {
        let label: string = '';
        if (!!this.model.policy && !!this.model.policy.insuranceGroupId) {
            switch (this.model.policy.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS:
                    label = 'Marca del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.MERCHANDISE:
                    label = 'Uso del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.RC:
                    label = 'Actividad Asegurada';
                    break;
            }
        }
        return label;
    }

    get objectDescriptionLabel(): string {
        let label: string = '';
        if (!!this.model.policy && !!this.model.policy.insuranceGroupId) {
            switch (this.model.policy.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS:
                    label = 'Características del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.MERCHANDISE:
                    label = 'Descripción del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.RC:
                    label = 'Descripción';
                    break;
            }
        }
        return label;
    }

    get policyNumber(): string {
        if (!!this.model.policy && !!this.model.policy.policyNumber) {
            return this.model.policy.policyNumber;
        }
        return ' ';
    }

    calculatePolicyCommission(event: any): void {
        this.model.calculatePolicyCommission(event.target.value);
    }

    calculatePolicyCommissionAmount(event: any): void {
        this.model.calculatePolicyCommissionAmount(event.target.value);
    }

    confirmRemoveInsured(insuredIndex: number): void {
        const policyInsuredId: any = this.model.insureds
            .at(insuredIndex)
            .get('policyInsuredId');
        if (!!policyInsuredId) {
            this._selectedInsuredIndex = insuredIndex;
            this.selectedCertificate = this.model.insureds
                .at(insuredIndex)
                .get('certificate')!.value;
            ModalPlugin.show(this.modalIdConfirmRemoveInsured);
        } else {
            this.model.removeInsured(insuredIndex);
        }
    }

    confirmUpdateInsured(insuredIndex: number): void {
        this.model.insureds.at(insuredIndex).enable();
        this.model.initDropifyPlugin();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.policyForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getErrorMessageInsured(constrolName: string, insuredIndex: number): string {
        const control: AbstractControl | null = this.model.insureds
            .at(insuredIndex)
            .get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.policyForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    getValidationClassInsured(
        constrolName: string,
        insuredIndex: number
    ): string {
        const control: AbstractControl | null = this.model.insureds
            .at(insuredIndex)
            .get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    /**
     * Change event to calculate the bills
     */
    onChangeCalculateBills(): void {
        this.model.calculateBills();
    }

    onChangeInsuranceTypeId(): void {
        const newInsuranceTypeId: number = parseInt(
            this.model.f.insuranceTypeId.value
        );
        this.model.policy!.insuranceTypeId = newInsuranceTypeId;
        this.model.buildPolicyForm(this.model.policy);
        this.confirmUpdateInsured(0);
    }

    /**
     * Click event to show modal to select policy
     */
    onClickSelectPolicy(): void {
        ModalPlugin.show(this.modalIdSelectFile);
    }

    /**
     * Click event to show modal to view the policy
     */
    onClickShowPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to update the form policy file
     */
    onPolicySelected(policyFile: File): void {
        this.model.policyForm.patchValue({ policyFile: policyFile });
    }

    /**
     * Submit event to save policy
     */
    onSubmitSavePolicy(): void {
        this._isFormSubmitted = true;
        if (this.model.policyForm.valid) {
            // Policy has receipts paid or endorsements
            if (
                this.model.policy!.receiptsPaid > 0 ||
                this.model.policy!.totalEndorsements > 0
            ) {
                this._loadingService.show();
                this.model
                    .updatePolicy(this.contactId, this.policyId)
                    .subscribe(() => {
                        this._loadingService.hide();
                        AlertHelper.policyUpdated(
                            this._goToListContactPolicies,
                            this
                        );
                    });
            } else {
                if (this.model.checkPolicyAmounts()) {
                    this._loadingService.show();
                    this.model
                        .updateCompletePolicy(this.contactId, this.policyId)
                        .subscribe(() => {
                            this._loadingService.hide();
                            AlertHelper.policyUpdated(
                                this._goToListContactPolicies,
                                this
                            );
                        });
                } else {
                    ModalPlugin.show(this.modalIdPolicyAmountsDifferent);
                }
            }
        } else {
            AlertHelper.invalidForm();
        }
    }

    deleteInsured(): void {
        this._selectedInsuredIndex;
        this._loadingService.show();
        this.model
            .deletePolicyInsured(
                this.contactId,
                this.policyId,
                this._selectedInsuredIndex
            )
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.policyInsuredDeleted();
            });
    }

    selectInsuredPolicyFile(event: any, index: number): void {
        if (event.target.files.length > 0) {
            const insuredPolicyFile = event.target.files[0];
            this.model.insureds.at(index).patchValue({ insuredPolicyFile });
            this.model.insureds
                .at(index)
                .get('insuredPolicyFile')!
                .updateValueAndValidity();
        }
    }

    showPolicyFile(insuredIndex: number): void {
        this.selectedPolicyUrl = this.model.insureds
            .at(insuredIndex)
            .get('policyUrl')!.value;
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    titularPhoneCodeIdSelected(titularPhoneCodeId: number): void {
        this.model.policyForm.patchValue({ titularPhoneCodeId });
    }

    tryCalculatePolicyCommissionAmount(): void {
        const policyCommission: string = this.model.f.policyCommission.value;
        if (!!policyCommission) {
            this.model.calculatePolicyCommissionAmount(policyCommission);
        }
    }

    goToListPolicyInsureds(): void {
        this._router.navigateByUrl(
            ROUTES_NAME.listPolicyInsureds(this.contactId, this.policyId)
        );
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _checkPolicyPayments(
        receiptsPaid: number,
        totalEndorsements: number
    ): void {
        if (receiptsPaid > 0 || totalEndorsements > 0) {
            this.model.disableFormFields();
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdEmissionDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdValidityStartDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdValidityEndDate,
            this._onChangeDate,
            this
        );
    }

    /**
     * Navigates to list contact policies
     * @param context The app context
     */
    private _goToListContactPolicies(context: UpdateCompletePolicyPage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(context.contactId)
        );
    }

    private _loadCountryInsurers(countryId: number, insurerId: number): void {
        this.model.loadCountryInsurers(countryId).subscribe(() => {
            Select2Plugin.initSearch(
                this.searchIdInsurers,
                this._onItemSelected,
                this
            );
            setTimeout(() => {
                Select2Plugin.setValue(this.searchIdInsurers, insurerId);
            }, 0);
        });
    }

    /**
     * Load the currencies
     */
    private _loadCurrencies(): void {
        this.model.loadCurrencies().subscribe(() => {});
    }

    private _loadGenders(): void {
        this.model.loadGenders();
    }

    private _loadInsuranceContext(): void {
        this.model.f.insuranceTypeId.setValue(null);
        this._updateInsurance();
        this._loadInsuranceTypes();
    }

    /**
     * Load the insurances
     */
    private _loadInsurances(insuranceId: number): void {
        this.model.loadInsurances().subscribe(() => {
            this._loadInsuranceTypes();
            Select2Plugin.initSearch(
                this.searchIdInsurances,
                this._onItemSelected,
                this
            );
            setTimeout(() => {
                Select2Plugin.setValue(this.searchIdInsurances, insuranceId);
            }, 0);
        });
    }

    /**
     * Load the insurance types
     */
    private _loadInsuranceTypes(): void {
        const insuranceId: number = this.model.f.insuranceId.value;
        this.model.loadInsuranceTypes(insuranceId);
    }

    private _loadPartners(workspaceRealName: string): void {
        this.model.loadPartners(workspaceRealName);
    }

    /**
     * Load the payment methods
     */
    private _loadPaymentMethods(): void {
        this.model.loadPaymentMethods().subscribe(() => {});
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.model.loadPaymentPlans().subscribe(() => {
            this.model.calculateBills();
        });
    }

    private _onItemSelected(
        context: UpdateCompletePolicyPage,
        selectedItem: number,
        elementId: string
    ): void {
        context.model.policyForm.patchValue({ [elementId]: selectedItem });
        if (elementId === 'insuranceId') {
            context._loadInsuranceContext();
        }
    }

    /**
     * Load the policy data
     */
    private _loadPolicy(): void {
        this.model
            .loadPolicy(this.contactId, this.policyId)
            .subscribe((res: HttpResponse) => {
                this.model.buildPolicyForm(res.data);
                this._initCalendars();
                this._loadCurrencies();
                this._loadGenders();
                this._loadCountryInsurers(
                    res.data.workspaceCountryId,
                    res.data.insurerId
                );
                this._loadInsurances(res.data.insuranceId);
                this._loadPaymentMethods();
                this._loadPaymentPlans();
                this._loadPartners(res.data.workspaceRealName);
                this._checkPolicyPayments(
                    res.data.receiptsPaid,
                    res.data.totalEndorsements
                );
                PopoverPlugin.init();
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
        context: UpdateCompletePolicyPage
    ): void {
        context.model.policyForm.patchValue({ [selectorId]: changedValue });
        context.model.calculateBills();
        if (
            selectorId === 'validityStartDate' ||
            selectorId === 'validityEndDate'
        ) {
            let validityStartDate: string = '';
            let validityEndDate: string = '';
            switch (selectorId) {
                case 'validityStartDate':
                    validityStartDate = changedValue;
                    validityEndDate = context.model.f.validityEndDate.value;
                    break;

                case 'validityEndDate':
                    validityStartDate = context.model.f.validityStartDate.value;
                    validityEndDate = changedValue;
                    break;
            }
            context._validValidityEndDate(
                context,
                validityStartDate,
                validityEndDate
            );
        }
    }

    private _updateInsurance(): void {
        const newInsuranceId: number = parseInt(this.model.f.insuranceId.value);
        this.model.policy!.insuranceId = newInsuranceId;
        this.model
            .loadInsuranceGroupIdByInsuranceId(newInsuranceId)
            .subscribe(() => {
                this.model.replaceInsureds();
            });
    }

    private _validValidityEndDate(
        context: UpdateCompletePolicyPage,
        validityStartDate: string,
        validityEndDate: string
    ): void {
        const validityStartDateAux = moment(validityStartDate, 'DD/MM/YYYY');
        const validityEndDateAux = moment(validityEndDate, 'DD/MM/YYYY');
        if (validityEndDateAux.isBefore(validityStartDateAux)) {
            context.model.f.validityEndDate.setErrors({
                invalidValidityEndDate: true,
            });
        }
    }
}
