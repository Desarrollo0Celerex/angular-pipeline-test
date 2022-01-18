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
    //endorsementAmount: number;
    fractionalReceiptAmount: number = 0;
    increasedAmount: number = 0;
    modalIdConfirmApplyEndorsement: string = 'agt-confirm-apply-endorsement';
    modalIdConfirmApplyEndorsementWithDecrement: string = 'agt-confirm-apply-endorsement-with-decrement';
    modalIdConfirmApplyEndorsementWithSingleReceipt: string = 'agt-confirm-apply-endorsement-with-single-receipt';
    modalIdConfirmApplyEndorsementWithoutChanges: string = 'agt-confirm-apply-endorsement-without-changes';




    modalIdDoCollectionAdjustment: string;
    modalIdSelectEndorsementPaymentMethod: string;
    modalIdShowEndorsementSummary: string;
    modalIdShowNoFractionalReceipt: string;
    modalIdUploadPolicyEndorsement: string;
    modalIdUploadPolicyEvidence: string = 'agt-upload-policy-evidence';
    newAmount: number;
    policyAmount: number;
    policyId: string;
    receiptAmount: number;
    selectedPaymentPlanName: string;
    selectedEndorsementEmissionDate: string;
    selectedEndorsementPaymentMethod: number;
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

    constructor(
        public model: EndorsePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        //this.endorsementAmount = 0;
        this.modalIdDoCollectionAdjustment = 'agt-do-collection-adjustment';
        this.modalIdSelectEndorsementPaymentMethod = 'agt-select-endorsement-payment-method';
        this.modalIdShowEndorsementSummary = 'agt-show-endorsement-summary';
        this.modalIdShowNoFractionalReceipt = 'agt-show-no-fractional-receipt';
        this.modalIdUploadPolicyEndorsement = 'agt-upload-policy-endorsement';
        this.newAmount = 0;
        this.policyAmount = 0;
        this.policyId = '';
        this.receiptAmount = 0;
        this.selectedEndorsementEmissionDate = '';
        this.selectedEndorsementPaymentMethod = 0;
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
        console.log('selectedEndorsementTypeId: ',selectedEndorsementTypeId);
        switch(selectedEndorsementTypeId) {
            case ENDORSEMENT_TYPES.A:
                console.log('Aplicar endoso con incremento')
            break;

            case ENDORSEMENT_TYPES.B:
                this._applyEndorsementWithChanges();
            break;

            case ENDORSEMENT_TYPES.C:
                this._applyEndorsementWithCancellation();
            break;

            case ENDORSEMENT_TYPES.D:
                console.log('Aplicar endoso con decremento')
            break;
        }
        /*const endorsementAmount: string = this.model.f.endorsementAmount.value || '0';
        const endorsementAmountFormatted: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(endorsementAmount));
        if(!!endorsementAmountFormatted && !!this.model.f.endorsementTypeId.value && !!this.model.policy) {
            const policyAmount: number = parseFloat(this.model.policy.policyAmount.toString());
            this.newAmount = (this.model.f.endorsementTypeId.value == ENDORSEMENT_TYPES.A) ? policyAmount + endorsementAmountFormatted : policyAmount - endorsementAmountFormatted;
        } else {
            this.newAmount = 0;
        }
        // If the policy has a new amount
        if(!!this.newAmount) {
            // If the new amount is an increase
            if(this.newAmount > this.policyAmount) {
                const increasedAmount: number = this.newAmount - this.policyAmount;
                this.increasedAmount = UtilitiesHelper.getQuantityWithOnlyTwoDecimals(increasedAmount);
                const receiptsPaid: number = (!!this.model.policy) ? this.model.policy.receiptsPaid : 0;
                const receiptsToPay: number = parseInt(this.model.f.bills.value);
                // If the policy has more than one payment pending:
                if( receiptsToPay > receiptsPaid) {
                    ModalPlugin.show(this.modalIdSelectEndorsementPaymentMethod);
                } else {
                    // If not, request a single receipt
                    ModalPlugin.show(this.modalIdConfirmApplyEndorsementWithSingleReceipt);
                }
            } else {
                // Show modal to confirm decrement
                ModalPlugin.show(this.modalIdConfirmApplyEndorsementWithDecrement);
            }
        } else {
            // If not, save the endorsement normally
            console.log('Aplicar endoso: ',this.model.f.endorsementTypeId.value)
            //this.endorsePolicy();
        }*/
    }

    /*endorsePolicy(): void {
        this._loadingService.show();
        this.model.endorsePolicy(this.contactId, this.policyId, this.fractionalReceiptAmount, this.selectedEndorsementPaymentMethod).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyEndorsed();
            this._goToListContactPolicies();
        });
    }*/

    endorsementTypeIdChanged(): void {
        this.model.disableFormFields();
    }

    formSubmitted(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            //this.selectedEndorsementEmissionDate = this.model.f.endorsementEmissionDate.value;
            const policyDataWasChanged: boolean = this.model.checkPolicyDataWasChanged();
            // If the policy data was changed
            if(policyDataWasChanged) {
                this._showModalToConfirmApplyEndorsement();
            } else {
                this._showModalToConfirmApplyEndorsementWithoutChanges();
            }
        }
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
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
        this.model._applyEndorsementWithChanges(this.contactId, this.policyId).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyEndorsed();
            this._goToListContactPolicies();
        });
    }

    private _goToCancelPolicy(): void {
        const url: string = ROUTES_NAME.cancelPolicy(this.contactId, this.policyId);
        this._router.navigateByUrl(url);
    }

    private _goToListContactPolicies(): void {
        const url: string = ROUTES_NAME.listContactPolicies(this.contactId);
        this._router.navigateByUrl(url);
    }

    private _showModalToConfirmApplyEndorsement(): void {
        ModalPlugin.show(this.modalIdConfirmApplyEndorsement);
    }

    private _showModalToConfirmApplyEndorsementWithoutChanges(): void {
        ModalPlugin.show(this.modalIdConfirmApplyEndorsementWithoutChanges);
    }

    /**********************************************************************
    ***********************************************************************
    **********************************************************************/


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



    /**
     * Event bluer to change the validity end date
     */
    onBlurChangeValidityEndDate(): void {
        if(this.model.checkCanExtendValidity()) {
            this.model.calculatePaymentPlansAvailable();
            this.model.calculateNewBills();
        }
    }

    /**
     * Event to apply endorsement with fractional receipt
     * @param fractionalReceiptAmount The fractional receipt amount
     */
    onApplyEndorsementWithFractionalReceipt(fractionalReceiptAmount: number): void {
        this.fractionalReceiptAmount = fractionalReceiptAmount;
        //this.endorsementAmount = UtilitiesHelper.getQuantityWithOnlyTwoDecimals(this.newAmount - (this.policyAmount + this.fractionalReceiptAmount));
        ModalPlugin.show(this.modalIdShowEndorsementSummary);
    }

    /**
     * Event to request confirm apply endorsement without fractional receipt
     */
    onApplyEndorsementWithoutFractionalReceipt(): void {
        //this.endorsementAmount = UtilitiesHelper.getQuantityWithOnlyTwoDecimals(this.newAmount - this.policyAmount);
        ModalPlugin.show(this.modalIdShowNoFractionalReceipt);
    }

    /**
     * Click event to show modal to upload policy endorsement
     */
    onClickUploadEndorsement(): void {
        this.selectedModalData = this._modalSelectEndorsementData;
        ModalPlugin.show(this.modalIdUploadPolicyEndorsement);
    }

    /**
     * Click event to show modal to upload the evidence
     */
    onClickUploadEvidence(): void {
        this.selectedModalData = this._modalSelectEvidenceData;
        ModalPlugin.show(this.modalIdUploadPolicyEvidence);
    }

    /**
     *  Event to confirm the endorsement application
     */
    onEndorsementApplicationConfirmed(): void {
        //this.endorsePolicy();
    }

    /**
     * Event to confirm apply endorsement with a single receipt
     */
    onEndorsementApplicationWithSingleReceipitConfirmed(): void {
        this.selectedEndorsementPaymentMethod = ENDORSEMENT_PAYMENT_METHODS.INDEPENDENT_RECEIPTS;
        ModalPlugin.hide(this.modalIdConfirmApplyEndorsementWithSingleReceipt);
        //this.endorsePolicy();
    }

    /**
     * Event to save the selected file
     * @param file The selected file
     */
    onEvidenceSelected(file: File): void {
        this.model.form.patchValue({ evidenceFile: file})
    }

    /**
     * Event to save the selected file
     * @param file The selected file
     */
    onFileSelected(file: File): void {
        this.model.form.patchValue({ endorsementFile: file})
    }

    /**
     * Event to confirm the endorsement application with fractional receipt
     */
    onEndorsementApplicationWithoutFractionalReceiptConfirmed(): void {
        this.fractionalReceiptAmount = 0;
        //this.endorsePolicy();
    }

    /**
     * Event to catch the selected payment method to policy increase
     * @param increaseType The selected payment method
     */
    onEndorsementPaymentMethodSelected(paymentMethod: number): void {
        this.selectedEndorsementPaymentMethod = paymentMethod;
        ModalPlugin.show(this.modalIdDoCollectionAdjustment);
    }

    paymentPlanIdChanged(): void {
        this.selectedPaymentPlanName = this.model.getSelectedPaymentPlanName();
        this.model.calculateNewBills();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdEndorsementEmissionDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdValidityEndDate, this._onChangeDate, this);
    }

    /**
     * Load the policy data
     */
    private _loadPolicy(): void {
        this.model.loadPolicy(this.contactId, this.policyId).subscribe( () => {
            this.policyAmount = (!!this.model.policy) ? parseFloat(this.model.policy.policyAmount.toString()) : 0;
            this.currencyName = (!!this.model.policy) ? this.model.policy.currencyName : '';
            this.model.loadEndorsementTypes()
            this.model.loadPaymentMethods();
            this._loadPaymentPlans();
            this._initCalendars();
            this.model.disableFormFields();
        });
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.model.loadPaymentPlans().subscribe( () => {
            this.selectedPaymentPlanName = this.model.getSelectedPaymentPlanName();
            this.model.calculatePaymentPlansAvailable();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: EndorsePolicyPage): void {
        context.model.form.patchValue({[selectorId]: changedValue});
    }

}
