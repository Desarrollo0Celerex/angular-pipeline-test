import { Component, OnInit, ViewChild } from '@angular/core';
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
import { PolicyActionsComponent } from '@policy/components/policy-actions/policy-actions.component';
import { RewriteField } from '@policy/interfaces/rewrite-field.interface';
import { SelectContactFieldsToRewriteComponent } from '@policy/components/select-contact-fields-to-rewrite/select-contact-fields-to-rewrite.component';
import {
    NOTIFICATION_TYPES,
    NotifierService,
} from '@notifier/services/notifier.service';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { UpdatePolicyService } from './update-policy.service';

declare var ModalPlugin: any;
declare var PopoverPlugin: any;
declare var Select2Plugin: any;

@Component({
    selector: 'agt-update-policy',
    templateUrl: './update-policy.page.html',
    styles: [],
})
export class UpdatePolicyPage implements OnInit {
    @ViewChild(PolicyActionsComponent)
    policyActionsComponent!: PolicyActionsComponent;
    @ViewChild(SelectContactFieldsToRewriteComponent)
    selectContactFieldsToRewriteComponent!: SelectContactFieldsToRewriteComponent;
    CONTACT_TYPES: any = CONTACT_TYPES;
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    INSURANCE_TYPES: any = INSURANCE_TYPES;
    contactFieldsToRewrite: RewriteField[] = [];
    contactId: string;
    existingContactId: string = '';
    existingPolicyId: string = '';
    hasSeller = false;
    hasConsultingCost = false;
    isScannerFailed: boolean = false;
    message: string = 'Valida los datos de la nueva póliza de';
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
    policyId: string;
    paymentId = '';
    searchIdInsurances: string = 'insuranceId';
    searchIdInsurers: string = 'insurerId';
    private _isCompletePolicyAction: boolean = false;
    private _isFormSubmitted: boolean;
    private _scannedPolicyData: Policy | null = null;
    private _policyUrl = '';
    private _policyFile: File | null = null;
    private _titularBirthdate: string | null = null;

    constructor(
        public model: UpdatePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router,
        private _scanningService: ScanningService,
        private _notifierService: NotifierService
    ) {
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

    addContactFieldsToRewrite(fields: string[]): void {
        this.model.contactFieldsToRewrite = fields;
        this._completePolicy();
    }

    /* addNewInsured(): void {
        this.model.addInsured();
    } */

    calculatePaymentAmounts(): void {
        this.model.calculateFirstPaymentAmount();
        this.model.calculateSubsequentReceiptsAmount();
    }

    calculatePolicyAmount(): void {
        this.model.calculatePolicyAmount();
    }

    calculateTaxPay(): void {
        this.model.calculateTaxPay();
    }

    calculatePolicyCommissionAmount(event: any): void {
        this.model.calculatePolicyCommissionAmount(event.target.value);
    }

    calculateConsultingCostAmount(event: any): void {
        this.model.calculateConsultingCostAmount(event.target.value);
    }

    calculateSellerCommissionAmount(event: any): void {
        this.model.calculateSellerCommissionAmount(event.target.value);
    }

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

    generateTitularAge(event: any): void {
        const rfc = event.target.value;
        const birthdate = UtilitiesHelper.generateBirthdateBasedOnRfc(rfc);
        if (birthdate) {
            const age = moment().diff(birthdate, 'years');
            this.model.policyForm.patchValue({ titularAge: age });
        }
    }

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

    loadSellerPercentageSuggestion(event: any): void {
        const sellerId = event.target.value;
        this.model.loadSellerPercentageSuggestion(sellerId);
    }

    onChangeCalculateBills(): void {
        this._calculateBills();
    }

    onChangeReviewPolicyReceiptInputs(): void {
        if (this.model.f.bills.value == 1) {
            this.model.f.subsequentReceiptsAmount.disable();
            this.model.f.subsequentReceiptsGracePeriod.disable();
        } else {
            this.model.f.subsequentReceiptsAmount.enable();
            this.model.f.subsequentReceiptsGracePeriod.enable();
        }
    }

    onClickSelectPolicy(): void {
        ModalPlugin.show(this.modalIdSelectFile);
    }

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

    onLoadScannedPolicyData(): void {
        this.model.buildPolicyForm(this._scannedPolicyData);
        this._calculateBills();
        this._checkAmountInputs();
        this._checkIsRenewal();
        this.calculatePaymentAmounts();
        this.onChangeReviewPolicyReceiptInputs();
    }

    replacePolicyFile(policyFile: File): void {
        this.model.policyForm.patchValue({ policyFile: policyFile });
        //this._scannPolicy(policyFile);
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

        // If the action is 'Complete policy', then complete the process to complete a policy
        if (this._isCompletePolicyAction) {
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
            this._checkContactProfile();
        }
        // Else, complete the process to update a policy
        else {
            if (
                this.model.policy!.receiptsPaid > 0 ||
                this.model.policy!.totalEndorsements > 0
            ) {
                this._loadingService.show();
                this.model
                    .updatePolicy(this.contactId, this.policyId)
                    .subscribe(() => {
                        this._handleUpdatePolicySuccess();
                    });
            } else {
                if (!this.model.checkPolicyAmounts()) {
                    ModalPlugin.show(this.modalIdPolicyAmountsDifferent);
                    return;
                }
                this._loadingService.show();
                this.model
                    .updateCompletePolicy(this.contactId, this.policyId)
                    .subscribe(() => {
                        this._handleUpdatePolicySuccess();
                    });
            }
        }
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

    changeTitularPhoneCodeId(titularPhoneCodeId: number): void {
        this.model.policyForm.patchValue({ titularPhoneCodeId });
    }

    toggleConsultingCost(event: any): void {
        this.hasConsultingCost = event.target.checked;
        if (this.hasConsultingCost) {
            PopoverPlugin.init();
        } else {
            this._resetConsultingCostFields();
        }
    }

    toggleSeller(event: any): void {
        this.hasSeller = event.target.checked;
        if (this.hasSeller) {
            this._clearFieldSellerId();
            PopoverPlugin.init();
        } else {
            this._resetSellerFields();
        }
    }

    tryCalculatePolicyCommissionAmount(): void {
        const agentCommissionPercentage: string =
            this.model.f.agentCommissionPercentage.value;
        if (!!agentCommissionPercentage) {
            this.model.calculatePolicyCommissionAmount(
                agentCommissionPercentage
            );
        }
    }

    private _calculateBills(): void {
        this.model.calculateBills();
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _checkAmountInputs(): void {
        this._checkCoverPay();
        this._checkTaxPay();
        this._checkPolicyAmount();
    }

    private _checkPolicyAmount(): void {
        const policyAmount = this.model.policyForm.value.policyAmount;
        if (policyAmount === '0.00') {
            this.model.calculatePolicyAmount();
        }
    }

    private _checkTaxPay(): void {
        const taxPay = this.model.policyForm.value.taxPay;
        if (taxPay === '0.00') {
            this.model.calculateTaxPay();
        }
    }

    private _checkCoverPay(): void {
        const coverPay = this.model.policyForm.value.coverPay;
        if (coverPay === '0.00') {
            this.model.calculateCoverPay();
        }
    }

    private _checkPolicyPayments(
        receiptsPaid: number,
        totalEndorsements: number
    ): void {
        if (receiptsPaid > 0 || totalEndorsements > 0) {
            this.model.disableFormPaymentFields();
        }
    }

    private _clearFieldSellerId(): void {
        this.model.policyForm.patchValue({
            partnerId: '',
        });
    }

    private _completePolicy(): void {
        this._loadingService.show();
        const policyFile = this.model.policyForm.value.policyFile;
        if (policyFile) {
            this.model.addPolicyCoverByFile(policyFile).subscribe((res) => {
                this._handleAddPolicyCoverSuccessful(res);
            });
        } else {
            this.model.addPolicyCoverByUrl(this._policyUrl).subscribe((res) => {
                this._handleAddPolicyCoverSuccessful(res);
            });
        }
    }

    private _handleAddPolicyCoverSuccessful(file: File): void {
        this.model.policyForm.patchValue({ policyFile: file });
        this.model.completePolicy(this.contactId, this.policyId).subscribe(
            (policy) => {
                this.paymentId = policy.paymentId;
                this._handleCompletePolicySuccess();
            },
            (error: HttpError) => {
                this._handleCompletePolicyError(error);
            }
        );
    }

    private _downloadPolicy(): void {
        this.model.downloadPolicy(this._policyUrl).subscribe(
            (res: any) => {
                this._scannPolicy(res);
            },
            (error: any) => {
                this._scanningService.hide();
                ModalPlugin.show(this.modalIdScanningPolicyFailed);
                this._checkAmountInputs();
            }
        );
    }

    private _goToListContactPolicies(context: UpdatePolicyPage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(context.contactId)
        );
    }

    private _goToListPolicyInsureds(context: UpdatePolicyPage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listPolicyInsureds(context.contactId, context.policyId)
        );
    }

    private _loadContactPolicy(): void {
        this._loadingService.show();
        this.model
            .getContactPolicy(this.contactId, this.policyId)
            .subscribe((res: HttpResponse) => {
                this._loadingService.hide();
                if (!res.data.isCompleted) {
                    this._scanningService.show();
                    this._isCompletePolicyAction = true;
                    this._policyUrl = res.data.policyUrl;
                    this._downloadPolicy();
                } else {
                    this.paymentId = res.data.paymentId;
                }
                this.model.buildPolicyForm(res.data);
                this.hasSeller = res.data.partnerId ? true : false;
                this.hasConsultingCost = res.data.consultingCostAmount
                    ? true
                    : false;
                this.model.loadCurrencies();
                this.model.loadGenders();
                this._loadCountryInsurers(
                    res.data.workspaceCountryId,
                    res.data.insurerId
                );
                this._loadInsurances(res.data.insuranceId);
                this.model.loadPaymentMethods();
                this._loadPaymentPlans();
                this.model.loadPartners(res.data.workspaceRealName);
                this._checkPolicyPayments(
                    res.data.receiptsPaid,
                    res.data.totalEndorsements
                );
                PopoverPlugin.init();
            });
    }

    private _loadPaymentPlans(): void {
        this.model.loadPaymentPlans().subscribe(() => {
            this._calculateBills();
        });
    }

    private _resetConsultingCostFields(): void {
        this.model.policyForm.patchValue({
            consultingCostPercentage: 0,
            consultingCostAmount: 0,
            consultingCostCurrencyId: this.model.policy.workspaceCurrencyId,
        });
    }

    private _resetSellerFields(): void {
        this.model.policyForm.patchValue({
            partnerId: 0,
            sellerCommissionPercentage: 0,
            sellerCommissionAmount: 0,
            sellerCommissionCurrencyId: this.model.policyForm.value.currencyId,
            sellerCommissionPeriod: 1,
        });
    }

    private _validateValidityEndDate(): void {
        const validityStartDate = this.model.policyForm.value.validityStartDate;
        const validityEndDate = this.model.policyForm.value.validityEndDate;
        if (validityEndDate.isBefore(validityStartDate)) {
            this.model.f.validityEndDate.setErrors({
                invalidValidityEndDate: true,
            });
        }
    }

    private _scannPolicy(policyFile: File): void {
        this._policyFile = policyFile;
        this._scanningService.show();
        this.model.scannPolicy(policyFile).subscribe(
            (res: HttpResponse) => {
                this._scanningService.hide();
                ModalPlugin.show(this.modalIdScanningPolicySuccess);
                this._scannedPolicyData = res.data;
                this._reviewPolicyData();
                this._reviewTitularRfc();
                this._reviewTitularData();
            },
            (error: HttpError) => {
                this._handleScanError(error);
            }
        );
    }

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
                'agentKey',
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
                'noTaxPay',
                'extraPay',
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

    private _reviewTitularData(): void {
        this.model.getContact(this.contactId).subscribe((policy) => {
            const policyTitularData: any = {};
            if (!this._scannedPolicyData?.titularName) {
                policyTitularData.titularName = policy.titularName;
            }
            if (!this._scannedPolicyData?.titularRfc) {
                policyTitularData.titularRfc = policy.titularRfc;
            }
            if (!this._scannedPolicyData?.titularPostalCode) {
                policyTitularData.titularPostalCode = policy.titularPostalCode;
            }
            if (!this._scannedPolicyData?.titularEmail) {
                policyTitularData.titularEmail = policy.titularEmail;
            }
            if (!this._scannedPolicyData?.titularPhoneCodeId) {
                policyTitularData.titularPhoneCodeId =
                    policy.titularPhoneCodeId;
            }
            if (!this._scannedPolicyData?.titularPhoneNumber) {
                policyTitularData.titularPhoneNumber =
                    policy.titularPhoneNumber;
            }
            if (!this._scannedPolicyData?.titularAge) {
                if (policy.titularAge) {
                    policyTitularData.titularAge = policy.titularAge;
                } else if (this._titularBirthdate) {
                    policyTitularData.titularAge = UtilitiesHelper.calculateAge(
                        this._titularBirthdate
                    );
                }
            }

            if (!this._scannedPolicyData?.titularGenderId) {
                policyTitularData.titularGenderId = policy.titularGenderId;
            }
            this._scannedPolicyData = {
                ...this._scannedPolicyData,
                ...policyTitularData,
            };
        });
    }

    private _reviewTitularRfc(): void {
        if (this._scannedPolicyData?.titularRfc) {
            this._titularBirthdate =
                UtilitiesHelper.generateBirthdateBasedOnRfc(
                    this._scannedPolicyData?.titularRfc
                );
        }
    }

    private _handleScanError(error: HttpError): void {
        this.isScannerFailed = true;
        this._reviewPolicyData();
        /* switch(error.error) {
            case ERROR_CODES.scanFileError: */
        if (
            !!this.model.policy &&
            (this.model.policy.policySourceId === POLICY_SOURCES.RENEWAL ||
                this.model.policy.policySourceId === POLICY_SOURCES.REISSUE)
        ) {
            const fields: string =
                'policyNumber,clientNumber,emissionDate,validityStartDate,validityEndDate,titularName,titularLegalRepresentative,titularRfc,titularGenderId,titularAge,titularPostalCode,titularEmail,titularPhoneCodeId,titularPhoneNumber,insuranceGroupId,insuranceTypeId,insureds,contactName,contactRfc,contactPostalCode,contactEmail,contactPhoneCodeId,contactPhoneNumber,contactBirthdate,contactGenderId';
            this.model
                .getContactBasePolicy(
                    fields,
                    this.model.policy.baseContactId,
                    this.model.policy.basePolicyId
                )
                .subscribe((res: Policy) => {
                    this.model.buildPolicyForm(res);
                    this._checkAmountInputs();
                    setTimeout(() => {
                        this._scanningService.hide();
                        ModalPlugin.show(this.modalIdBasePoliciDataLoaded);
                    }, 1000);
                    this._checkIsRenewal();
                });
        } else {
            this.model
                .getContact(this.contactId)
                .subscribe((policy: Policy) => {
                    this.model.buildPolicyForm(policy);
                    this._checkAmountInputs();
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

    private _reviewPolicyData(): void {
        const missingFields: string[] = this._getMissingFields();
        const totalMissingFields: number = missingFields.length;
        if (totalMissingFields > 0) {
            this.model
                .createScannerLog(
                    this.contactId,
                    this.policyId,
                    this._policyUrl,
                    totalMissingFields,
                    missingFields.join(',')
                )
                .subscribe(() => {});
        }
    }

    private _handleCompletePolicySuccess(): void {
        const isInTime = this._checkIsInTime();
        const email = this.model.policyForm.value.titularEmail;
        if (isInTime && email) {
            this._sendNotification(this.contactId, this.policyId, email);
        } else {
            this._showCompletePolicySuccessModal();
        }
    }

    private _handleUpdatePolicySuccess(): void {
        this._loadingService.hide();
        this._showModalPolicyActions();
    }

    private _checkIsInTime(): boolean {
        const validityStartDate = moment(
            this.model.policyForm.value.validityStartDate,
            'DD/MM/YYYY'
        );
        return validityStartDate.isSameOrAfter(moment().subtract(8, 'days'));
    }

    private _sendNotification(
        contactId: string,
        policyId: string,
        email: string
    ): void {
        const data = {
            contactId,
            policyId,
            email,
        };
        this._notifierService
            .sendNotificationLegacy(NOTIFICATION_TYPES.POLICY_ISSUED, data)
            .subscribe(
                () => {
                    this._showCompletePolicySuccessModal();
                },
                (error) => {
                    console.error(
                        'No se puedo enviar notificación de póliza emitida: ',
                        error
                    );
                    this._showCompletePolicySuccessModal();
                }
            );
    }

    private _showCompletePolicySuccessModal(): void {
        this._loadingService.hide();
        if (this.areSeveralInsured) {
            AlertHelper.policyCompleted(this._goToListPolicyInsureds, this);
        } else {
            this._showModalPolicyActions();
        }
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

    private _checkContactProfile(): void {
        this.contactFieldsToRewrite = this.model.generateContactFieldsToRewrite(
            this._titularBirthdate
        );
        if (this.contactFieldsToRewrite.length > 0) {
            this.selectContactFieldsToRewriteComponent.init({
                fields: this.contactFieldsToRewrite,
            });
        } else {
            this._completePolicy();
        }
    }

    private _showModalPolicyActions(): void {
        const phoneCode = this._generatePhoneCode(
            this.model.policyForm.value.titularPhoneCodeId
        );
        this.policyActionsComponent.init({
            isSavedPolicy: true,
            contactId: this.contactId,
            policyId: this.policyId,
            paymentId: this.paymentId,
            phoneCode: phoneCode,
            phoneNumber: this.model.policyForm.value.titularPhoneNumber,
            email: this.model.policyForm.value.titularEmail,
            cancelRoute: '/' + ROUTES_NAME.listContactPolicies(this.contactId),
        });
    }

    private _generatePhoneCode(phoneCodeId: string): string {
        switch (parseInt(phoneCodeId)) {
            case 1:
                return '52';
            case 2:
                return '54';
            case 3:
                return '57';
            default:
                return '';
        }
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

    private _onItemSelected(
        context: UpdatePolicyPage,
        selectedItem: number,
        elementId: string
    ): void {
        context.model.policyForm.patchValue({ [elementId]: selectedItem });
        if (elementId === 'insuranceId') {
            context._loadInsuranceContext();
        }
    }

    private _loadInsuranceContext(): void {
        this.model.f.insuranceTypeId.setValue(null);
        this._updateInsurance();
        this._loadInsuranceTypes();
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

    private _loadInsuranceTypes(): void {
        const insuranceId: number = this.model.f.insuranceId.value;
        this.model.loadInsuranceTypes(insuranceId);
    }

    onChangeInsuranceTypeId(): void {
        const newInsuranceTypeId: number = parseInt(
            this.model.f.insuranceTypeId.value
        );
        this.model.policy!.insuranceTypeId = newInsuranceTypeId;
        /* this.model.buildPolicyForm(this.model.policyForm.value);
        this.confirmUpdateInsured(0); */

        this.model.resetFormInsureds();
        this.model.addInsured();
    }

    confirmUpdateInsured(insuredIndex: number): void {
        this.model.insureds.at(insuredIndex).enable();
        this.model.initDropifyPlugin();
    }

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

    validitateFields(): void {
        this.model.calculateBills();
        this._validateValidityEndDate();
    }

    private _checkIsRenewal(): void {
        if (
            !!this.model.policy &&
            this.model.policy.policySourceId === POLICY_SOURCES.RENEWAL
        ) {
            this._loadRenewalData();
        }
    }

    private _loadRenewalData(): void {
        const fields: string =
            'isAutoPayment,partnerId,sellerCommissionPercentage,sellerCommissionCurrencyId';
        this.model
            .getPolicyRenewed(
                fields,
                this.model.policy.baseContactId,
                this.model.policy.basePolicyId
            )
            .subscribe((policy: Policy) => {
                this.model.patchForm({
                    isAutoPayment:
                        policy.isAutoPayment && policy.isAutoPayment != '0'
                            ? true
                            : false,
                });
                this._checkHasPartner(policy);
            });
    }

    private _checkHasPartner(policy: Policy): void {
        if (policy.partnerId) {
            this.toggleSeller({ target: { checked: true } });
            this.model.calculateSellerCommissionAmount(
                policy.sellerCommissionPercentage
            );
            this.model.patchForm({
                partnerId: policy.partnerId,
                sellerCommissionPercentage: policy.sellerCommissionPercentage,
                sellerCommissionCurrencyId: policy.sellerCommissionCurrencyId,
                sellerCommissionPeriod: 1,
            });
        }
    }
}
