import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

import { ERROR_CODES } from '@constants/error-codes';
import {
    DOCUMENT_FORMATS,
    FILE_TYPES,
    POLICY_SOURCES,
    INSURANCE_GROUPS,
    INSURANCE_TYPES,
    CONTACT_TYPES,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { PolicyInsuredHelper } from '@helpers/policy-insured-helper';
import { HttpError } from '@interfaces/http-error.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { Policy } from '@core/interfaces/policy.interface';
import { LoadingService } from '@core/services/loading/loading.service';
import { ScanningService } from '@services/scanning.service';

import { CompletePolicyService } from './complete-policy.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
    selector: 'agt-complete-policy',
    templateUrl: './complete-policy.page.html',
    styles: [],
})
export class CompletePolicyPage implements OnInit {
    CONTACT_TYPES: any = CONTACT_TYPES;
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    INSURANCE_TYPES: any = INSURANCE_TYPES;
    contactId: string;
    existingContactId: string = '';
    existingPolicyId: string = '';
    isScannerFailed: boolean = false;
    message: string = 'Valida los datos de la nueva póliza de';
    policyId: string;
    modalIdBasePoliciDataLoaded: string = 'agt-base-policy-data-loaded';
    modalIdInvalidExpiredPolicy: string = 'agt-invalid-expired-policy';
    modalIdInvalidHistoryPolicy: string = 'agt-invalid-history-policy';
    modalIdNotifyPolicyAlreadyExists: string =
        'agt-notify-policy-already-exists';
    modalIdPolicyAmountsDifferent: string = 'agt-policy-amounts-different';
    modalIdSelectFile: string;
    modalIdScanningPolicy: string;
    modalIdScanningPolicyFailed: string;
    modalIdScanningPolicySuccess: string;
    modalIdShowPolicy: string;
    modalSelectFileData: ModalSelectFileData;
    emissionDateCalendarId: string;
    validityEndDateCalendarId: string;
    validityStartDateCalendarId: string;
    private _isFormSubmitted: boolean;
    private _scannedPolicyData: Policy | null = null;

    constructor(
        public model: CompletePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router,
        private _scanningService: ScanningService
    ) {
        this.emissionDateCalendarId = 'emissionDate';
        this.contactId = '';
        this.policyId = '';
        this.modalIdSelectFile = 'agt-select-file';
        this.modalIdScanningPolicy = 'agt-scanning-policy';
        this.modalIdScanningPolicyFailed = 'agt-scanning-policy-failed';
        this.modalIdScanningPolicySuccess = 'agt-scanning-policy-success';
        this.modalIdShowPolicy = 'agt-show-policy';
        this.modalSelectFileData = {
            title: 'Actualizar Póliza',
            description: 'Selecciona el formato digital de la póliza.',
            buttonLabel: 'Cargar poliza',
            formats: DOCUMENT_FORMATS,
            fileType: FILE_TYPES.DOCUMENT,
        };
        this.validityEndDateCalendarId = 'validityEndDate';
        this.validityStartDateCalendarId = 'validityStartDate';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadContactPolicy();
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

    /* addNewInsured(): void {
        this.model.addInsured();
    } */

    calculatePolicyCommission(event: any): void {
        this.model.calculatePolicyCommission(event.target.value);
    }

    calculatePolicyCommissionAmount(event: any): void {
        this.model.calculatePolicyCommissionAmount(event.target.value);
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
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'insuredPolicyFile') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    /**
     * Change event to calculate the bills
     */
    onChangeCalculateBills(): void {
        this._calculateBills();
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

    onDeletePolicy(): void {
        this._loadingService.show();
        this.model.deletePolicy(this.contactId, this.policyId).subscribe(() => {
            this._loadingService.hide();
            this._router.navigateByUrl(
                ROUTES_NAME.showHistoryPolicy(
                    this.existingContactId,
                    this.existingPolicyId
                )
            );
        });
    }

    /**
     * Event to load the data of the scanned policy
     */
    onLoadScannedPolicyData(): void {
        this.model.buildPolicyForm(this._scannedPolicyData);
        this._calculateBills();
    }

    /**
     * Event to update the form policy file
     */
    onPolicySelected(policyFile: File): void {
        this.model.policyForm.patchValue({ policyFile: policyFile });
        this._scannPolicy(policyFile);
    }

    /**
     * Submit event to save policy
     */
    onSubmitSavePolicy(): void {
        this._isFormSubmitted = true;
        if (!this.model.policyForm.valid) {
            AlertHelper.invalidForm();
            return;
        }
        // Check the policy amounts
        if (!this.model.checkPolicyAmounts()) {
            ModalPlugin.show(this.modalIdPolicyAmountsDifferent);
            return;
        }
        // Check if it is a new policy
        /*if(this.model.checkIsNewPolicy()) {
            // Check if it is a expired policy
            if(this.model.checkIsExpiredPolicy()) {
                // Check if it is a valid expired policy
                if(!this.model.checkIsValidExpiredPolicy()) {
                    ModalPlugin.show(this.modalIdInvalidExpiredPolicy);
                    return;
                }
            }
        }*/
        else {
            // Check if the policy is a history policy
            if (this.model.checkIsHistoryPolicy()) {
                // Check if it is a valid history policy
                if (!this.model.checkIsValidHistoryPolicy()) {
                    ModalPlugin.show(this.modalIdInvalidHistoryPolicy);
                    return;
                }
            }
        }
        // Complete the policy
        this._loadingService.show();
        this.model
            .completePolicy(
                this.contactId,
                this.policyId,
                this._scannedPolicyData
            )
            .subscribe(
                () => {
                    this._loadingService.hide();
                    if (this.areSeveralInsured) {
                        AlertHelper.policyCompleted(
                            this._goToListPolicyInsureds,
                            this
                        );
                    } else {
                        AlertHelper.policyCompleted(
                            this._goToListContactPolicies,
                            this
                        );
                    }
                },
                (error: HttpError) => {
                    this._handleCompletePolicyError(error);
                }
            );
    }

    removeInsured(insuredIndex: number): void {
        this.model.removeInsured(insuredIndex);
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

    titularPhoneCodeIdSelected(titularPhoneCodeId: number): void {
        this.model.policyForm.patchValue({ titularPhoneCodeId });
    }

    tryCalculatePolicyCommissionAmount(): void {
        const policyCommission: string = this.model.f.policyCommission.value;
        if (!!policyCommission) {
            this.model.calculatePolicyCommissionAmount(policyCommission);
        }
    }

    /**
     * Calculate the bills
     */
    private _calculateBills(): void {
        this.model.calculateBills();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _downloadPolicy(policyUrl: string): void {
        this.model.downloadPolicy(policyUrl).subscribe(
            (res: any) => {
                this._scannPolicy(res, policyUrl);
            },
            (error: any) => {
                this._scanningService.hide();
                ModalPlugin.show(this.modalIdScanningPolicyFailed);
            }
        );
    }

    /**
     * Navigates to list contact policies
     * @param context The app context
     */
    private _goToListContactPolicies(context: CompletePolicyPage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(context.contactId)
        );
    }

    private _goToListPolicyInsureds(context: CompletePolicyPage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listPolicyInsureds(context.contactId, context.policyId)
        );
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.emissionDateCalendarId,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.validityStartDateCalendarId,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.validityEndDateCalendarId,
            this._onChangeDate,
            this
        );
    }

    /**
     * Load the contact policy
     */
    private _loadContactPolicy(): void {
        this._scanningService.show();
        this.model
            .getContactPolicy(this.contactId, this.policyId)
            .subscribe((res: HttpResponse) => {
                this._downloadPolicy(res.data.policyUrl);
                this.model.buildPolicyForm(res.data);
                this._initCalendars();
                this.model.loadCurrencies();
                this.model.loadGenders();
                this.model.loadPartners(res.data.workspaceRealName);
                this.model.loadPaymentMethods();
                this._loadPaymentPlans();
                PopoverPlugin.init();
            });
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.model.loadPaymentPlans().subscribe(() => {
            this._calculateBills();
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
        context: CompletePolicyPage
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

    private _validValidityEndDate(
        context: CompletePolicyPage,
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

    /**
     * Scan the policy file
     * @param policyFile The policy file to scan
     */
    private _scannPolicy(policyFile: any, policyUrl: string = ''): void {
        this._scanningService.show();
        this.model.scannPolicy(policyFile).subscribe(
            (res: HttpResponse) => {
                this._scanningService.hide();
                ModalPlugin.show(this.modalIdScanningPolicySuccess);
                this._scannedPolicyData = res.data;
                this._reviewPolicyData(policyUrl);
                this._reviewTitularData();
            },
            (error: HttpError) => {
                this._handleScanError(error, policyUrl);
            }
        );
    }

    private _getTitularMissingFields(): string[] {
        let titularMissingFields: string[] = [];
        const data: any = this._scannedPolicyData;
        for (const field in data) {
            if (
                field === 'titularName' ||
                field === 'titularRfc' ||
                field === 'titularAge' ||
                field === 'titularGenderId' ||
                field === 'titularPostalCode' ||
                field === 'titularPhoneNumber'
            ) {
                if (data[field] == '') {
                    titularMissingFields.push(field);
                }
            }
        }
        return titularMissingFields;
    }

    private _reviewTitularData(): void {
        const titularMissingFields: string[] = this._getTitularMissingFields();
        if (titularMissingFields.length > 0) {
            this.model
                .getPolicyTitularInfo(this.contactId, titularMissingFields)
                .subscribe((res: HttpResponse) => {
                    this._scannedPolicyData = {
                        ...this._scannedPolicyData,
                        ...res.data,
                    };
                });
        }
    }

    private _handleScanError(error: HttpError, policyUrl: string): void {
        this.isScannerFailed = true;
        this._reviewPolicyData(policyUrl);
        /* switch(error.error) {
            case ERROR_CODES.scanFileError: */
        if (
            !!this.model.policy &&
            (this.model.policy.policySourceId === POLICY_SOURCES.RENEWAL ||
                this.model.policy.policySourceId === POLICY_SOURCES.REISSUE)
        ) {
            this.model
                .getContactBasePolicy(
                    this.model.policy.baseContactId,
                    this.model.policy.basePolicyId
                )
                .subscribe((res: Policy) => {
                    this.model.buildPolicyForm(res);
                    setTimeout(() => {
                        this._scanningService.hide();
                        ModalPlugin.show(this.modalIdBasePoliciDataLoaded);
                    }, 1000);
                });
        } else {
            this.model
                .getContact(this.contactId)
                .subscribe((policy: Policy) => {
                    this.model.buildPolicyForm(policy);
                    setTimeout(() => {
                        this._scanningService.hide();
                        ModalPlugin.show(this.modalIdScanningPolicyFailed);
                    }, 1000);
                });
        }
        /* break;

            default:
                setTimeout(() => {
                    this._scanningService.hide();
                    ModalPlugin.show(this.modalIdScanningPolicyFailed);
                }, 1000);
        } */
    }

    /**
     * Review the policy data to see if a field is missing
     */
    private _reviewPolicyData(policyUrl: string): void {
        const missingFields: string[] = this._getMissingFields();
        const totalMissingFields: number = missingFields.length;
        if (totalMissingFields > 0) {
            this.model
                .createScannerLog(
                    this.contactId,
                    this.policyId,
                    policyUrl,
                    totalMissingFields,
                    missingFields.join(',')
                )
                .subscribe(() => {});
        }
    }

    /**
     * Get the missing fields
     * @return The missing fields
     */
    private _getMissingFields(): string[] {
        let missingFields: string[] = [];
        if (!!this._scannedPolicyData) {
            const data: any = this._scannedPolicyData;
            for (const field in data) {
                if (field === 'insureds') {
                    for (const fieldAux in data[field][0]) {
                        if (data[field][0][fieldAux] == '') {
                            switch (this.model.policy!.insuranceGroupId) {
                                case INSURANCE_GROUPS.PEOPLE:
                                    switch (fieldAux) {
                                        case 'personName':
                                        case 'personGenderId':
                                        case 'personAge':
                                            missingFields.push(fieldAux);
                                            break;
                                    }
                                    break;

                                case INSURANCE_GROUPS.VEHICLES:
                                    switch (fieldAux) {
                                        case 'vehicleMaker':
                                        case 'vehicleVersion':
                                        case 'vehicleModel':
                                        case 'vehiclePlates':
                                        case 'vehicleSerial':
                                        case 'vehicleMotor':
                                            missingFields.push(fieldAux);
                                            break;
                                    }
                                    break;

                                case INSURANCE_GROUPS.BUILDINGS:
                                    switch (fieldAux) {
                                        case 'buildingName':
                                        case 'buildingUsage':
                                        case 'buildingLocation':
                                            missingFields.push(fieldAux);
                                            break;
                                    }
                                    break;

                                case INSURANCE_GROUPS.MERCHANDISE:
                                case INSURANCE_GROUPS.OBJECTS:
                                case INSURANCE_GROUPS.RC:
                                    switch (fieldAux) {
                                        case 'objectName':
                                        case 'objectUsage':
                                        case 'objectDescription':
                                            missingFields.push(fieldAux);
                                            break;
                                    }
                                    break;
                            }
                        }
                    }
                } else {
                    if (data[field] == '') {
                        missingFields.push(field);
                    }
                }
            }
        } else {
            missingFields = [
                'agentNumber',
                'policyNumber',
                'clientNumber',
                'titularName',
                'titularRfc',
                'titularAge',
                'titularGenderId',
                'titularPostalCode',
                'titularPhoneNumber',
                'policyPlan',
                'emissionDate',
                'validityStartDate',
                'validityEndDate',
                'netPay',
                'taxPay',
                'feePay',
                'coverPay',
                'extraPay',
                'firstPay',
                'discount',
                'policyAmount',
                'currencyId',
                'paymentMethodId',
                'paymentPlanId',
            ];
            switch (this.model.policy!.insuranceGroupId) {
                case INSURANCE_GROUPS.PEOPLE:
                    missingFields.push('personName');
                    missingFields.push('personGenderId');
                    missingFields.push('personAge');
                    break;

                case INSURANCE_GROUPS.VEHICLES:
                    missingFields.push('vehicleMaker');
                    missingFields.push('vehicleVersion');
                    missingFields.push('vehicleModel');
                    missingFields.push('vehiclePlates');
                    missingFields.push('vehicleSerial');
                    missingFields.push('vehicleMotor');
                    break;

                case INSURANCE_GROUPS.BUILDINGS:
                    missingFields.push('buildingName');
                    missingFields.push('buildingUsage');
                    missingFields.push('buildingLocation');
                    break;

                case INSURANCE_GROUPS.MERCHANDISE:
                case INSURANCE_GROUPS.OBJECTS:
                case INSURANCE_GROUPS.RC:
                    missingFields.push('objectName');
                    missingFields.push('objectUsage');
                    missingFields.push('objectDescription');
                    break;
            }
        }
        return missingFields;
    }

    private _handleCompletePolicyError(error: HttpError): void {
        const arrError: string[] = error.error.split(' ');
        switch (arrError[0]) {
            case ERROR_CODES.policyAlreadyExists:
                this.existingContactId = arrError[1];
                this.existingPolicyId = arrError[2];
                ModalPlugin.show(this.modalIdNotifyPolicyAlreadyExists);
                break;

            case ERROR_CODES.policyAlreadyConfirmed:
                AlertHelper.policyCompleted(
                    this._goToListContactPolicies,
                    this
                );
                break;
        }
    }
}
