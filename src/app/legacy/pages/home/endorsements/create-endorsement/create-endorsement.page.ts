import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
    CONTACT_TYPES,
    ENDORSEMENT_PAYMENT_METHODS,
    ENDORSEMENT_TYPES,
    FILE_ALL_FORMATS,
    FILE_TYPES,
    INSURANCE_GROUPS,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { CreateEndorsementService } from './create-endorsement.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
    selector: 'agt-create-endorsement',
    templateUrl: './create-endorsement.page.html',
    styles: [],
    providers: [CreateEndorsementService],
})
export class CreateEndorsementPage implements OnInit {
    CONTACT_TYPES: any = CONTACT_TYPES;
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    calendarIdEndorsementEmissionDate: string = 'endorsementEmissionDate';
    calendarIdEndorsementValidityStartDate: string =
        'endorsementValidityStartDate';
    calendarIdEndorsementValidityEndDate: string = 'endorsementValidityEndDate';
    calendarIdValidityEndDate: string = 'validityEndDate';
    contactId: string = '';
    endorsementTotalAmount: number = 0;
    fractionalReceiptAmount: number = 0;
    modalIdConfirmApplyEndorsementWithChanges: string =
        'agt-confirm-apply-endorsement-with-changes';
    modalIdConfirmApplyEndorsementWithDecrement: string =
        'agt-confirm-apply-endorsement-with-decrement';
    modalIdConfirmApplyEndorsementWithIncrement: string =
        'agt-confirm-apply-endorsement-with-increment';
    modalIdConfirmApplyEndorsementWithoutChanges: string =
        'agt-confirm-apply-endorsement-without-changes';
    modalIdConfirmApplyFractionalReceipt: string =
        'agt-confirm-apply-fractional-receipt';
    modalIdEndorsementAmountsDifferent: string =
        'agt-endorsement-amounts-different';
    modalIdNotifyEndorsementCannotBeApplied: string =
        'agt-notify-endorsement-cannot-be-applied';
    modalIdSelectEndorsementPaymentMethod: string =
        'agt-select-endorsement-payment-method';
    modalIdUploadPolicyEndorsement: string = 'agt-upload-policy-endorsement';
    modalIdUploadPolicyEvidence: string = 'agt-upload-policy-evidence';
    policyId: string = '';
    selectedEndorsementPaymentMethodId: number = 0;
    selectedModalData: ModalSelectFileData | null = null;
    selectedPaymentPlanName: string = '';
    private _isFormSubmitted: boolean = false;
    private _modalSelectEndorsementData: ModalSelectFileData = {
        title: 'Cargar Endoso',
        description: 'Selecciona el documento con los detalles del endoso.',
        buttonLabel: 'Cargar endoso',
        formats: FILE_ALL_FORMATS,
        fileType: FILE_TYPES.MIXED,
    };
    private _modalSelectEvidenceData: ModalSelectFileData = {
        title: 'Cargar Evidencia',
        description:
            'Selecciona el formato digital de la evidencia del endoso.',
        buttonLabel: 'Cargar evidencia',
        formats: FILE_ALL_FORMATS,
        fileType: FILE_TYPES.MIXED,
    };

    constructor(
        public model: CreateEndorsementService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._loadData();
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

    get policyAmount(): number {
        return this.model.policy !== null
            ? parseFloat(this.model.policy.policyAmount.toString())
            : 0;
    }

    createEndorsement(): void {
        const selectedEndorsementTypeId: number = parseInt(
            this.model.f.endorsementTypeId.value
        );
        switch (selectedEndorsementTypeId) {
            case ENDORSEMENT_TYPES.A:
                this.endorsementTotalAmount = parseFloat(
                    UtilitiesHelper.removeCommasFromQuantity(
                        this.model.f.endorsementTotalAmount.value
                    )
                );
                if (this.model.checkHasPolicyPendingReceipts()) {
                    this._showModalToSelectEndorsementPaymentMethod();
                } else {
                    this.selectedEndorsementPaymentMethodId =
                        ENDORSEMENT_PAYMENT_METHODS.SINGLE_RECEIPT;
                    this.fractionalReceiptAmount = 0;
                    this._showModalToConfirmApplyEndorsementWithIncrement();
                }
                break;

            case ENDORSEMENT_TYPES.B:
                this._createEndorsementWithChanges();
                break;

            case ENDORSEMENT_TYPES.C:
                this._createEndorsementWithCancellation();
                break;

            case ENDORSEMENT_TYPES.D:
                this.endorsementTotalAmount = parseFloat(
                    UtilitiesHelper.removeCommasFromQuantity(
                        this.model.f.endorsementTotalAmount.value
                    )
                );
                const policyPendingAmount: number =
                    this.model.policy!.paymentAmount -
                    this.model.policy!.paymentAmountPaid;
                if (
                    this.model.checkHasPolicyPendingReceipts() &&
                    policyPendingAmount > this.endorsementTotalAmount
                ) {
                    this._showModalToConfirmApplyEndorsementWithDecrement();
                } else {
                    this._showModalToNotifyEndorsementCannotBeApplied();
                }
                break;
        }
    }

    createEndorsementWithDecrement(): void {
        this._createEndorsementWithDecrement();
    }

    createEndorsementWithIncrement(): void {
        this._applyEndorsementWithIncrement();
    }

    createEndorsementWithFractionalReceipt(
        fractionalReceiptAmount: number
    ): void {
        this.fractionalReceiptAmount = fractionalReceiptAmount;
        this._showModalToConfirmApplyEndorsementWithIncrement();
    }

    createEndorsementWithoutFractionalReceipt(): void {
        this.fractionalReceiptAmount = 0;
        this._showModalToConfirmApplyEndorsementWithIncrement();
    }

    enableAndDesableFormFields(event: any): void {
        const selectedEndorsementTypeId: number = parseInt(event.target.value);
        this.model.enableAndDesableFormFields(selectedEndorsementTypeId);
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getErrorMessageInsured(constrolName: string, insuredIndex: number): string {
        const control: AbstractControl | null = this.model.insureds
            .at(insuredIndex)
            .get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'endorsementFile') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
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

    selectEndorsementFile(file: File): void {
        this.model.form.patchValue({ endorsementFile: file });
    }

    selectEvidenceFile(file: File): void {
        this.model.form.patchValue({ evidenceFile: file });
    }

    selectEndorsementPaymentMethod(paymentMethodId: number): void {
        this.selectedEndorsementPaymentMethodId = paymentMethodId;
        this.fractionalReceiptAmount =
            this.model.calculateFractionalReceiptAmount(
                this.endorsementTotalAmount
            );
        this._showModalToConfirmApplyFractionalReceipt();
    }

    selectTitularPhoneCodeId(titularPhoneCodeId: number): void {
        this.model.form.patchValue({ titularPhoneCodeId });
    }

    uploadEndorsement(): void {
        this.selectedModalData = this._modalSelectEndorsementData;
        ModalPlugin.show(this.modalIdUploadPolicyEndorsement);
    }

    uploadEvidence(): void {
        this.selectedModalData = this._modalSelectEvidenceData;
        ModalPlugin.show(this.modalIdUploadPolicyEvidence);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            const selectedEndorsementTypeId: number = parseInt(
                this.model.f.endorsementTypeId.value
            );
            if (selectedEndorsementTypeId === ENDORSEMENT_TYPES.C) {
                this._showModalToConfirmApplyEndorsementWithoutChanges();
            } else {
                if (this.model.canShowEndorsementPaymentFields === true) {
                    if (this.model.checkEndorsementAmounts() === true) {
                        this._showModalToConfirmApplyEndorsementWithChanges();
                    } else {
                        this._showModalEndorsementAmountsDifferent();
                    }
                } else {
                    this._showModalToConfirmApplyEndorsementWithChanges();
                }
            }
        }
    }

    validateValidityEndDate(): void {
        if (this.model.f.validityEndDate.valid) {
            //this.model.calculatePaymentPlansAvailable();
            //this.model.calculateMonthsLeftToPay();
            //this.model.calculateNewBills();
        }
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _createEndorsementWithCancellation(): void {
        this._loadingService.show();
        this.model
            .createEndorsementWithCancellation(this.contactId, this.policyId)
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.policyEndorsed();
                this._goToCancelPolicy();
            });
    }

    private _createEndorsementWithChanges(): void {
        this._loadingService.show();
        this.model
            .createEndorsementWithChanges(this.contactId, this.policyId)
            .subscribe(() => {
                this._handleSuccessfulEndorsementCreation();
            });
    }

    private _createEndorsementWithDecrement(): void {
        this._loadingService.show();
        this.model
            .createEndorsementWithDecrement(this.contactId, this.policyId)
            .subscribe(() => {
                this._handleSuccessfulEndorsementCreation();
            });
    }

    private _applyEndorsementWithIncrement(): void {
        this._loadingService.show();
        this.model
            .createEndorsementWithIncrement(
                this.contactId,
                this.policyId,
                this.fractionalReceiptAmount,
                this.selectedEndorsementPaymentMethodId
            )
            .subscribe(() => {
                this._handleSuccessfulEndorsementCreation();
            });
    }

    private _finishEndorsementCreation(): void {
        this._loadingService.hide();
        AlertHelper.policyEndorsed();
        this._goToPolicyHistory();
    }

    private _goToCancelPolicy(): void {
        const url: string = ROUTES_NAME.cancelPolicy(
            this.contactId,
            this.policyId
        );
        this._router.navigateByUrl(url);
    }

    private _goToPolicyHistory(): void {
        const url: string = ROUTES_NAME.showHistoryPolicy(
            this.contactId,
            this.policyId
        );
        this._router.navigateByUrl(url);
    }

    private _handleSuccessfulEndorsementCreation(): void {
        if (this.model.areSeveralInsured === false) {
            this.model
                .updatePolicyInsured(this.contactId, this.policyId)
                .subscribe(() => {
                    this._finishEndorsementCreation();
                });
        } else {
            this._finishEndorsementCreation();
        }
    }

    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdEndorsementEmissionDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdEndorsementValidityStartDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdEndorsementValidityEndDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdValidityEndDate,
            this._onChangeDate,
            this
        );
    }

    private _loadData(): void {
        this.model
            .getPolicy(this.contactId, this.policyId)
            .subscribe((res: HttpResponse) => {
                this.model.loadPolicy(res.data);
                this.model.buildForm();
                this.model.enableAndDesableFormFields();
                this._initCalendars();
                this.model.loadEndorsementTypes();
                this.model.loadGenders();
                this.model.loadPaymentMethods();
                this._loadPaymentPlans();
                PopoverPlugin.init();
            });
    }

    private _loadPaymentPlans(): void {
        this.model.loadPaymentPlans().subscribe(() => {
            const selectedPaymentPlanId = this.model.policy!.paymentPlanId;
            this.selectedPaymentPlanName = this.model.getPaymentPlanName(
                selectedPaymentPlanId
            );
            // PENDIENTE
            /*this.model.calculatePaymentPlansAvailable();
            this.model.calculateMonthsLeftToPay(); */
        });
    }

    private _showModalEndorsementAmountsDifferent(): void {
        ModalPlugin.show(this.modalIdEndorsementAmountsDifferent);
    }

    private _showModalToConfirmApplyEndorsementWithChanges(): void {
        ModalPlugin.show(this.modalIdConfirmApplyEndorsementWithChanges);
    }

    private _showModalToConfirmApplyEndorsementWithDecrement(): void {
        ModalPlugin.show(this.modalIdConfirmApplyEndorsementWithDecrement);
    }

    private _showModalToConfirmApplyEndorsementWithIncrement(): void {
        ModalPlugin.show(this.modalIdConfirmApplyEndorsementWithIncrement);
    }

    private _showModalToConfirmApplyEndorsementWithoutChanges(): void {
        ModalPlugin.show(this.modalIdConfirmApplyEndorsementWithoutChanges);
    }

    private _showModalToConfirmApplyFractionalReceipt(): void {
        ModalPlugin.show(this.modalIdConfirmApplyFractionalReceipt);
    }

    private _showModalToNotifyEndorsementCannotBeApplied(): void {
        ModalPlugin.show(this.modalIdNotifyEndorsementCannotBeApplied);
    }

    private _showModalToSelectEndorsementPaymentMethod(): void {
        ModalPlugin.show(this.modalIdSelectEndorsementPaymentMethod);
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: CreateEndorsementPage
    ): void {
        context.model.form.patchValue({ [selectorId]: changedValue });
    }
}
