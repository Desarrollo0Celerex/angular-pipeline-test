import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ENDORSEMENT_PAYMENT_METHODS, ENDORSEMENT_TYPES, FILE_ALL_FORMATS, FILE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@services/loading.service';

import { EndorsePolicyService } from './endorse-policy.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
  selector: 'agt-endorse-policy',
  templateUrl: './endorse-policy.page.html',
  styles: [
  ],
  providers: [EndorsePolicyService]
})
export class EndorsePolicyPage implements OnInit {
    calendarIdEndorsementEmissionDate: string = 'endorsementEmissionDate';
    calendarIdValidityEndDate: string = 'validityEndDate';
    contactId: string = '';
    currencyName: string = '';
    endorsementAmount: number = 0;
    capturedFractionalReceiptAmount: number = 0;
    modalIdConfirmApplyEndorsement: string = 'agt-confirm-apply-endorsement';
    modalIdConfirmApplyEndorsementWithIncrement: string = 'agt-confirm-apply-endorsement-with-increment';
    modalIdConfirmApplyEndorsementWithoutChanges: string = 'agt-confirm-apply-endorsement-without-changes';
    modalIdConfirmApplyFractionalReceipt: string = 'agt-confirm-apply-fractional-receipt';
    selectedEndorsementPaymentMethod: number = 0;
    selectedEndorsementEmissionDate: string = '';
    modalIdConfirmApplyEndorsementWithDecrement: string = 'agt-confirm-apply-endorsement-with-decrement';
    modalIdNotifyEndorsementCannotBeApplied: string = 'agt-notify-endorsement-cannot-be-applied';
    modalIdSelectEndorsementPaymentMethod: string = 'agt-select-endorsement-payment-method';;
    modalIdShowEndorsementSummary: string;
    modalIdUploadPolicyEndorsement: string;
    modalIdUploadPolicyEvidence: string = 'agt-upload-policy-evidence';
    newAmount: number;
    policyAmount: number;
    policyId: string;
    receiptAmount: number;
    selectedPaymentPlanName: string;
    selectedModalData: ModalSelectFileData | null = null;
    private _isFormSubmitted: boolean;
    private _modalSelectEndorsementData: ModalSelectFileData = {
        title: 'Cargar Endoso',
        description: 'Selecciona el documento con los detalles del endoso.',
        buttonLabel: 'Cargar endoso',
        formats: FILE_ALL_FORMATS,
        fileType: FILE_TYPES.MIXED
    }
    private _modalSelectEvidenceData: ModalSelectFileData = {
        title: 'Cargar Evidencia',
        description: 'Selecciona el formato digital de la evidencia del endoso.',
        buttonLabel: 'Cargar evidencia',
        formats: FILE_ALL_FORMATS,
        fileType: FILE_TYPES.MIXED
    };

    get finalPolicyAmount(): number {
        let finalPolicyAmount: number = 0;
        if(this.model.policy) {
            if(!!this.model.f.endorsementAmount && !!this.model.f.endorsementAmount.value && !this.model.f.endorsementAmount.disabled) {
                const endorsementAmountFormatted: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.model.f.endorsementAmount.value));
                const policyAmount: number = parseFloat(this.model.policy.policyAmount.toString());
                finalPolicyAmount = (this.model.f.endorsementTypeId.value == ENDORSEMENT_TYPES.A) ? policyAmount + endorsementAmountFormatted : policyAmount - endorsementAmountFormatted;
            } else {
                finalPolicyAmount = this.model.policy.policyAmount;
                this.model.f.endorsementAmount.setValue('');
            }
        }
        return finalPolicyAmount;
    }

    constructor(
        public model: EndorsePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.modalIdShowEndorsementSummary = 'agt-show-endorsement-summary';
        this.modalIdUploadPolicyEndorsement = 'agt-upload-policy-endorsement';
        this.newAmount = 0;
        this.policyAmount = 0;
        this.policyId = '';
        this.receiptAmount = 0;
        this.selectedPaymentPlanName = '';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadPolicy();
        setTimeout(() => {
            PopoverPlugin.init();
        }, 1000);
    }

    applyEndorsement(): void {
        const selectedEndorsementTypeId: number = parseInt(this.model.f.endorsementTypeId.value);
        this.endorsementAmount = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.model.f.endorsementAmount.value));

        switch(selectedEndorsementTypeId) {
            case ENDORSEMENT_TYPES.A:
                if(this._hasPendingReceipts()) {
                    this._showModalToSelectEndorsementPaymentMethod();
                } else {
                    this.selectedEndorsementEmissionDate = this.model.f.endorsementEmissionDate.value;
                    this.selectedEndorsementPaymentMethod = ENDORSEMENT_PAYMENT_METHODS.SINGLE_RECEIPT;
                    this.capturedFractionalReceiptAmount = 0;
                    this._showModalToConfirmApplyEndorsementWithIncrement();
                }
            break;

            case ENDORSEMENT_TYPES.B:
                this._applyEndorsementWithChanges();
            break;

            case ENDORSEMENT_TYPES.C:
                this._applyEndorsementWithCancellation();
            break;

            case ENDORSEMENT_TYPES.D:
                const policyPendingAmount: number = this.model.policy!.paymentAmount - this.model.policy!.paymentAmountPaid;
                console.log('policyPendingAmount: ',policyPendingAmount);
                if(this._hasPendingReceipts() && policyPendingAmount > this.endorsementAmount) {
                    this._showModalToConfirmApplyEndorsementWithDecrement();
                } else {
                    this._showModalNotifyEndorsementCannotBeApplied();
                }
            break;
        }
    }

    applyEndorsementWithFractionalReceipt(fractionalReceiptAmount: number): void {
        this.capturedFractionalReceiptAmount = fractionalReceiptAmount;
        this._showModalToConfirmApplyEndorsementWithIncrement();
    }

    applyEndorsementWithDecrement(): void {
        this._applyEndorsementWithDecrement();
    }

    applyEndorsementWithIncrement(): void {
        this._applyEndorsementWithIncrement();
    }

    applyEndorsementWithoutFractionalReceipt(): void {
        this.capturedFractionalReceiptAmount = 0;
        this._showModalToConfirmApplyEndorsementWithIncrement();
    }

    endorsementFileSelected(file: File): void {
        this.model.form.patchValue({ endorsementFile: file})
    }

    endorsementTypeIdChanged(): void {
        this.model.disableFormFields();
    }

    evidenceFileSelected(file: File): void {
        this.model.form.patchValue({ evidenceFile: file})
    }

    formSubmitted(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            const policyDataWasChanged: boolean = this.model.checkPolicyDataWasChanged();
            // If the policy data was changed
            if(policyDataWasChanged) {
                this._showModalToConfirmApplyEndorsement();
            } else {
                this._showModalToConfirmApplyEndorsementWithoutChanges();
            }
        }
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    paymentPlanIdChanged(): void {
        this.selectedPaymentPlanName = this.model.getSelectedPaymentPlanName();
        this.model.calculateNewBills();
    }

    selectEndorsementPaymentMethod(paymentMethod: number): void {
        this.selectedEndorsementPaymentMethod = paymentMethod;
        this._showModalToConfirmApplyFractionalReceipt();
    }

    uploadEndorsement(): void {
        this.selectedModalData = this._modalSelectEndorsementData;
        ModalPlugin.show(this.modalIdUploadPolicyEndorsement);
    }

    uploadEvidence(): void {
        this.selectedModalData = this._modalSelectEvidenceData;
        ModalPlugin.show(this.modalIdUploadPolicyEvidence);
    }

    validityEndDateChanged(): void {
        if(this.model.f.validityEndDate.valid) {
            this.model.calculatePaymentPlansAvailable();
            this.model.calculateNewBills();
        }
    }

    private _applyEndorsementWithCancellation(): void {
        this._loadingService.show();
        this.model.endorsePolicyWithCancellation(this.contactId, this.policyId).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyEndorsed();
            this._goToCancelPolicy();
        });
    }

    private _applyEndorsementWithChanges(): void {
        this._loadingService.show();
        this.model.endorsePolicyWithChanges(this.contactId, this.policyId).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyEndorsed();
            this._goToListContactPolicies();
        });
    }

    private _applyEndorsementWithDecrement(): void {
        console.log('Aplicar endoso con decremento.')
        /*this._loadingService.show();
        this.model.endorsePolicyWithIncrement(this.contactId, this.policyId, this.capturedFractionalReceiptAmount, this.selectedEndorsementPaymentMethod).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyEndorsed();
            this._goToListContactPolicies();
        });*/
    }

    private _applyEndorsementWithIncrement(): void {
        this._loadingService.show();
        this.model.endorsePolicyWithIncrement(this.contactId, this.policyId, this.capturedFractionalReceiptAmount, this.selectedEndorsementPaymentMethod).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyEndorsed();
            this._goToListContactPolicies();
        });
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _goToCancelPolicy(): void {
        const url: string = ROUTES_NAME.cancelPolicy(this.contactId, this.policyId);
        this._router.navigateByUrl(url);
    }

    private _goToListContactPolicies(): void {
        const url: string = ROUTES_NAME.listContactPolicies(this.contactId);
        this._router.navigateByUrl(url);
    }

    private _hasPendingReceipts(): boolean {
        const receiptsPaid: number = (!!this.model.policy) ? this.model.policy.receiptsPaid : 0;
        const receiptsToPay: number = parseInt(this.model.f.bills.value);
        return (receiptsToPay > receiptsPaid) ? true : false;
    }

    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdEndorsementEmissionDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdValidityEndDate, this._onChangeDate, this);
    }

    private _loadPaymentPlans(): void {
        this.model.loadPaymentPlans().subscribe( () => {
            this.selectedPaymentPlanName = this.model.getSelectedPaymentPlanName();
            this.model.calculatePaymentPlansAvailable();
        })
    }

    private _loadPolicy(): void {
        this.model.loadPolicy(this.contactId, this.policyId).subscribe( () => {
            this.policyAmount = (!!this.model.policy) ? parseFloat(this.model.policy.policyAmount.toString()) : 0;
            this.currencyName = (!!this.model.policy) ? this.model.policy.currencyName : '';
            this.model.loadEndorsementTypes();
            this.model.loadPaymentMethods();
            this._loadPaymentPlans();
            this._initCalendars();
            this.model.disableFormFields();
        });
    }

    private _onChangeDate(selectorId: string, changedValue: string, context: EndorsePolicyPage): void {
        context.model.form.patchValue({[selectorId]: changedValue});
    }

    private _showModalNotifyEndorsementCannotBeApplied(): void {
        console.log('Paso 1');
        ModalPlugin.show(this.modalIdNotifyEndorsementCannotBeApplied);
    }

    private _showModalToConfirmApplyEndorsement(): void {
        ModalPlugin.show(this.modalIdConfirmApplyEndorsement);
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

    private _showModalToSelectEndorsementPaymentMethod(): void {
        ModalPlugin.show(this.modalIdSelectEndorsementPaymentMethod);
    }

}
