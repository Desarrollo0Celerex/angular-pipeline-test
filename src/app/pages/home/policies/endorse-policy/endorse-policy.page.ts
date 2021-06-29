import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ENDORSEMENT_PAYMENT_METHODS, ENDORSEMENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@services/loading.service';

import { EndorsePolicyService } from './endorse-policy.service';

declare var $: any;
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-endorse-policy',
  templateUrl: './endorse-policy.page.html',
  styles: [
  ]
})
export class EndorsePolicyPage implements OnInit {
    calendarIdEndorsementEmissionDate: string;
    calendarIdValidityEndDate: string;
    contactId: string;
    currencyName: string;
    //endorsementAmount: number;
    fractionalReceiptAmount: number;
    increasedAmount: number;
    message: string;
    modalSelectFileData: ModalSelectFileData;
    modalIdConfirmApplyEndorsement: string;
    modalIdConfirmApplyEndorsementWithDecrement: string;
    modalIdConfirmApplyEndorsementWithoutChanges: string;
    modalIdConfirmApplyEndorsementWithSingleReceipt: string;
    modalIdDoCollectionAdjustment: string;
    modalIdSelectEndorsementPaymentMethod: string;
    modalIdShowEndorsementSummary: string;
    modalIdShowNoFractionalReceipt: string;
    modalIdUploadPolicyEndorsement: string;
    newAmount: number;
    policyAmount: number;
    policyId: string;
    receiptAmount: number;
    selectedPaymentPlanName: string;
    selectedEndorsementEmissionDate: string;
    selectedEndorsementPaymentMethod: number;
    selectIdEndorsementType: string;
    selectIdPaymentMethod: string;
    selectIdPaymentPlan: string;
    private _isFormSubmitted: boolean;

    constructor(
        public endorsePolicyService: EndorsePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.calendarIdEndorsementEmissionDate = 'endorsementEmissionDate';
        this.calendarIdValidityEndDate = 'validityEndDate';
        this.contactId = '';
        this.currencyName = '';
        //this.endorsementAmount = 0;
        this.fractionalReceiptAmount = 0;
        this.increasedAmount = 0;
        this.message = 'Captura los detalles del endoso para la póliza de';
        this.modalSelectFileData = {
            title: 'Cargar Endoso',
            description: 'Selecciona el documento con los detalles del endoso.',
            buttonLabel: 'Cargar endoso'
        }
        this.modalIdConfirmApplyEndorsement = 'agt-confirm-apply-endorsement';
        this.modalIdConfirmApplyEndorsementWithDecrement = 'agt-confirm-apply-endorsement-with-decrement';
        this.modalIdConfirmApplyEndorsementWithoutChanges = 'agt-confirm-apply-endorsement-without-changes';
        this.modalIdConfirmApplyEndorsementWithSingleReceipt = 'agt-confirm-apply-endorsement-with-single-receipt';
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
        this.selectIdEndorsementType = 'agt-endorse-type';
        this.selectIdPaymentMethod = 'agt-payment-method';
        this.selectIdPaymentPlan = 'agt-payment-plan';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadPolicy();
        setTimeout(() => {
            PopoverPlugin.init();
        }, 1000);
    }

    get finalPolicyAmount(): number {
        let finalPolicyAmount: number = 0;
        if(this.endorsePolicyService.policy) {
            if(!!this.endorsePolicyService.f.endorsementAmount && !!this.endorsePolicyService.f.endorsementAmount.value && !this.endorsePolicyService.f.endorsementAmount.disabled) {
                const endorsementAmountFormatted: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.endorsePolicyService.f.endorsementAmount.value));
                const policyAmount: number = parseFloat(this.endorsePolicyService.policy.policyAmount.toString());
                finalPolicyAmount = (this.endorsePolicyService.f.endorsementTypeId.value == ENDORSEMENT_TYPES.A) ? policyAmount + endorsementAmountFormatted : policyAmount - endorsementAmountFormatted;
            } else {
                finalPolicyAmount = this.endorsePolicyService.policy.policyAmount;
            }
        }
        return finalPolicyAmount;
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.endorsePolicyService.endorsementForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.endorsePolicyService.endorsementForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Event bluer to change the validity end date
     */
    onBlurChangeValidityEndDate(): void {
        if(this.endorsePolicyService.checkCanExtendValidity()) {
            this.endorsePolicyService.calculatePaymentPlansAvailable();
            this.endorsePolicyService.calculateNewBills();
        }
    }

    /**
     * Event to confirm the application of policy changes
     */
    onPolicyChangesApplicationConfirmed(): void {
        const endorsementAmount: string = this.endorsePolicyService.f.endorsementAmount.value || '0';
        const endorsementAmountFormatted: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(endorsementAmount));
        if(!!endorsementAmountFormatted && !!this.endorsePolicyService.f.endorsementTypeId.value && !!this.endorsePolicyService.policy) {
            const policyAmount: number = parseFloat(this.endorsePolicyService.policy.policyAmount.toString());
            this.newAmount = (this.endorsePolicyService.f.endorsementTypeId.value == ENDORSEMENT_TYPES.A) ? policyAmount + endorsementAmountFormatted : policyAmount - endorsementAmountFormatted;
        } else {
            this.newAmount = 0;
        }
        // If the policy has a new amount
        if(!!this.newAmount) {
            // If the new amount is an increase
            if(this.newAmount > this.policyAmount) {
                const increasedAmount: number = this.newAmount - this.policyAmount;
                this.increasedAmount = UtilitiesHelper.getQuantityWithOnlyTwoDecimals(increasedAmount);
                const receiptsPaid: number = (!!this.endorsePolicyService.policy) ? this.endorsePolicyService.policy.receiptsPaid : 0;
                const receiptsToPay: number = parseInt(this.endorsePolicyService.f.bills.value);
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
            this._applyEndorsement();
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
        ModalPlugin.show(this.modalIdUploadPolicyEndorsement);
    }

    /**
     *  Event to confirm the endorsement application
     */
    onEndorsementApplicationConfirmed(): void {
        this._applyEndorsement();
    }

    /**
     * Event to confirm apply endorsement with a single receipt
     */
    onEndorsementApplicationWithSingleReceipitConfirmed(): void {
        this.selectedEndorsementPaymentMethod = ENDORSEMENT_PAYMENT_METHODS.INDEPENDENT_RECEIPTS;
        this._applyEndorsement();
    }

    /**
     * Event to save the selected file
     * @param file The selected file
     */
    onFileSelected(file: File): void {
        this.endorsePolicyService.endorsementForm.patchValue({ endorsementFile: file})
    }

    /**
     * Event to confirm the endorsement application with fractional receipt
     */
    onEndorsementApplicationWithoutFractionalReceiptConfirmed(): void {
        this.fractionalReceiptAmount = 0;
        this._applyEndorsement();
    }

    /**
     * Event to catch the selected payment method to policy increase
     * @param increaseType The selected payment method
     */
    onEndorsementPaymentMethodSelected(paymentMethod: number): void {
        this.selectedEndorsementPaymentMethod = paymentMethod;
        ModalPlugin.show(this.modalIdDoCollectionAdjustment);
    }

    /**
     * Submit event to save endorsement
     */
    onSubmitSaveEndorsement(): void {
        this._isFormSubmitted = true;
        if(this.endorsePolicyService.endorsementForm.valid) {
            this.selectedEndorsementEmissionDate = this.endorsePolicyService.f.endorsementEmissionDate.value;
            const isPolicyChanged: boolean = this.endorsePolicyService.checkIsPolicyChanged();
            // If the policy data has changes
            if(isPolicyChanged) {
                ModalPlugin.show(this.modalIdConfirmApplyEndorsement);
            } else {
                ModalPlugin.show(this.modalIdConfirmApplyEndorsementWithoutChanges);
            }
        }
    }

    /**
     * Apply the endorsement
     */
    private _applyEndorsement(): void {
        this._loadingService.show();
        this.endorsePolicyService.endorsePolicy(this.contactId, this.policyId, this.fractionalReceiptAmount, this.selectedEndorsementPaymentMethod).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyEndorsed(this._goToListContactPolicies, this);
        })
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    /**
     * Navigates to list contact policies
     * @param context The app context
     */
    private _goToListContactPolicies(context: EndorsePolicyPage): void {
        const endorsementTypeId: number = parseInt(context.endorsePolicyService.f.endorsementTypeId.value);
        if(endorsementTypeId === ENDORSEMENT_TYPES.C) {
            context._router.navigateByUrl(ROUTES_NAME.cancelPolicy(context.contactId, context.policyId));
        } else {
            context._router.navigateByUrl(ROUTES_NAME.listContactPolicies(context.contactId));
        }
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
        this.endorsePolicyService.loadPolicy(this.contactId, this.policyId).subscribe( () => {
            this.policyAmount = (!!this.endorsePolicyService.policy) ? parseFloat(this.endorsePolicyService.policy.policyAmount.toString()) : 0;
            this.currencyName = (!!this.endorsePolicyService.policy) ? this.endorsePolicyService.policy.currencyName : '';
            this._loadEndorsementTypes();
            this._loadPaymentMethods();
            this._loadPaymentPlans();
            this._initCalendars();
            this.endorsePolicyService.disableEndorsementFormFields();
        });
    }

    /**
     * Load the endorsement types
     */
    private _loadEndorsementTypes(): void {
        this.endorsePolicyService.loadEndorsementTypes().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangeEndorsementTypeId();
        })
    }

    /**
     * Load the payment methods
     */
    private _loadPaymentMethods(): void {
        this.endorsePolicyService.loadPaymentMethods().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangePaymentMethodId();
        })
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.endorsePolicyService.loadPaymentPlans().subscribe( () => {
            this.selectedPaymentPlanName = this.endorsePolicyService.getSelectedPaymentPlanName();
            this.endorsePolicyService.calculatePaymentPlansAvailable();
            Select2Plugin.initSelect();
            this._onChangePaymentPlanId();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: EndorsePolicyPage): void {
        context.endorsePolicyService.endorsementForm.patchValue({[selectorId]: changedValue});
    }

    /**
     * Event to change the endorsement type ID value
     * Check if the new amount can show
     * And disable the fields of the endorsement form
     */
    private _onChangeEndorsementTypeId(): void {
        $('select#'+this.selectIdEndorsementType).on('change', (element: any) => {
            this.endorsePolicyService.endorsementForm.patchValue({endorsementTypeId: element.currentTarget.value});
            this.endorsePolicyService.disableEndorsementFormFields();
        });
    }

    /**
     * Event to change the method ID value
     */
    private _onChangePaymentMethodId(): void {
        $('select#'+this.selectIdPaymentMethod).on('change', (element: any) => {
            this.endorsePolicyService.endorsementForm.patchValue({paymentMethodId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the plan ID value
     */
    private _onChangePaymentPlanId(): void {
        $('select#'+this.selectIdPaymentPlan).on('change', (element: any) => {
            this.endorsePolicyService.endorsementForm.patchValue({paymentPlanId: element.currentTarget.value});
            this.selectedPaymentPlanName = this.endorsePolicyService.getSelectedPaymentPlanName();
            this.endorsePolicyService.calculateNewBills();
        });
    }

}
