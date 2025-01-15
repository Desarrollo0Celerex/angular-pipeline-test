import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import {
    SLACK_UNITS,
    IMAGE_AND_DOCUMENT_FORMATS,
    FILE_TYPES,
} from '@constants/global';
import { ModalSelectEvidenceComponent } from '@components/modal-select-evidence/modal-select-evidence.component';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalApplyPaymentService } from './modal-apply-payment.service';
import { PaymentAppliedActionsModalComponent } from '@payment/components/payment-applied-actions-modal/payment-applied-actions-modal.component';
import { HttpResponse } from '@core/interfaces/http-response.interface';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
    selector: 'agt-modal-apply-payment',
    templateUrl: './modal-apply-payment.component.html',
    styles: [],
    providers: [ModalApplyPaymentService],
    standalone: false
})
export class ModalApplyPaymentComponent implements OnChanges, OnInit {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Input() canReloadApplyPayment: boolean = false;
    @Output() receiptPaid: EventEmitter<void> = new EventEmitter<void>();
    @Output() showModalAgain: EventEmitter<void> = new EventEmitter<void>();
    @Output() applyPaymentReloaded: EventEmitter<void> =
        new EventEmitter<void>();
    @ViewChild('modalSelectEvidence')
    private _modalSelectEvidence!: ModalSelectEvidenceComponent;
    @ViewChild(PaymentAppliedActionsModalComponent)
    private _paymentAppliedActionsModalComponent!: PaymentAppliedActionsModalComponent;
    amountExceeded: number = 0;
    calendarIdApplicationDate: string = 'applicationDate';
    calendarIdNextPaymentDate: string = 'nextPaymentDate';
    missingAmount: number = 0;
    missingReceipts: number = 0;
    modalIdConfirmApplyPaymentWithBalanceOutstanding: string =
        'agt-confirm-apply-payment-with-balance-outstanding';
    modalIdConfirmApplyPaymentWithBalanceRemaining: string =
        'agt-confirm-apply-payment-with-balance-remaining';
    modalIdNotifyAmountExceeded: string = 'agt-notify-amount-exceeded';
    modalIdNotifyReceiptsExceeded: string = 'agt-notify-receipts-exceeded';
    modalIdNotifyMissingReceipts: string = 'agt-notify-missing-receipts';
    modalIdNotifyMissingAmount: string = 'agt-notify-missing-amount';
    modalIdSelectPaymentEvidence: string = 'agt-upload-payment-evidence';
    modalSelectEvidenceData: ModalSelectFileData = {
        title: 'Cargar Evidencia',
        description: 'Selecciona el formato digital de la evidencia del pago.',
        buttonLabel: 'Cargar evidencia',
        formats: IMAGE_AND_DOCUMENT_FORMATS,
        fileType: FILE_TYPES.IMAGE_AND_DOCUMENT,
    };
    receiptsExceeded: number = 0;
    private _isFormSubmitted: boolean = false;
    private _canIgnoreAmountExceeded: boolean = false;
    private _canIgnoreMissingAmount: boolean = false;

    constructor(
        public model: ModalApplyPaymentService,
        private _loadingService: LoadingService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
            (!!changes.paymentId && !!changes.paymentId.currentValue) ||
            (!!changes.canReloadApplyPayment &&
                !!changes.canReloadApplyPayment &&
                !!this.paymentId)
        ) {
            this._canIgnoreAmountExceeded = false;
            this._canIgnoreMissingAmount = false;
            this._loadPayment();

            setTimeout(() => {
                this.applyPaymentReloaded.emit();
            }, 500);
        }
    }

    ngOnInit(): void {
        this.model.loadPaymentTypes();
    }

    addPaymentEvidence(file: File): void {
        this.showModalApplyPayment();
        this.model.paymentForm.patchValue({ paymentEvidence: file });
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.paymentForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.paymentForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    applyPayment(): void {
        this._isFormSubmitted = true;
        if (this.model.paymentForm.valid && !!this.model.payment) {
            this.receiptsExceeded = 0;
            this.amountExceeded = 0;
            this.missingReceipts = 0;
            this.missingReceipts = 0;
            const receiptsToPay: number = parseInt(this.model.f.receipts.value);
            const pendingReceipts: number = parseInt(
                this.model.payment.pendingReceipts.toString()
            );
            const amountToPay: number = parseFloat(
                UtilitiesHelper.removeCommasFromQuantity(
                    this.model.f.amount.value
                )
            );
            let pendingAmount: number = parseFloat(
                this.model.payment.pendingAmount.toString()
            );
            pendingAmount =
                pendingAmount >= 0 ? pendingAmount : pendingAmount * -1;
            // If the receipts to pay are greater than the pending receipts
            if (receiptsToPay > pendingReceipts) {
                this.receiptsExceeded = receiptsToPay - pendingReceipts;
                ModalPlugin.hide(this.modalId);
                ModalPlugin.show(this.modalIdNotifyReceiptsExceeded);
                throw new Error('Receipts exceeded');
            }
            // If you can't ignore the amount excceded
            if (!this._canIgnoreAmountExceeded) {
                // If the payment to pay is grater than the pending amount
                if (amountToPay > pendingAmount + SLACK_UNITS) {
                    this.amountExceeded = amountToPay - pendingAmount;
                    ModalPlugin.hide(this.modalId);
                    ModalPlugin.show(this.modalIdNotifyAmountExceeded);
                    throw new Error('Amount exceeded');
                }
            }
            // If the amount to pay covers the total payment
            // And the recipts to pay are less than the total receipts
            if (
                amountToPay > pendingAmount - SLACK_UNITS &&
                receiptsToPay < pendingReceipts
            ) {
                this.missingReceipts = pendingReceipts - receiptsToPay;
                ModalPlugin.hide(this.modalId);
                ModalPlugin.show(this.modalIdNotifyMissingReceipts);
                throw new Error('Missing receipts');
            }
            // If you can't ignore the missing amount
            if (!this._canIgnoreMissingAmount) {
                // If the receipts to pay covers the total receipts
                // And the amount to pay is less than the total amount
                if (
                    receiptsToPay === pendingReceipts &&
                    amountToPay < pendingAmount - SLACK_UNITS
                ) {
                    this.missingAmount = pendingAmount - amountToPay;
                    ModalPlugin.hide(this.modalId);
                    ModalPlugin.show(this.modalIdNotifyMissingAmount);
                    throw new Error('Missing amount');
                }
            }
            // Create the receipt paid
            this._createReceiptPaid();
        }
    }

    ignoreAmountExceeded(): void {
        this._canIgnoreAmountExceeded = true;
        this.applyPayment();
    }

    ignoreMissingAmount(): void {
        this._canIgnoreMissingAmount = true;
        this.applyPayment();
    }

    requestShowModalAgain(): void {
        this.showModalAgain.emit();
    }

    selectPaymentEvidence(): void {
        ModalPlugin.hide(this.modalId);
        ModalPlugin.show(this.modalIdSelectPaymentEvidence);
    }

    showModalApplyPayment(): void {
        ModalPlugin.show(this.modalId);
    }

    onChangeFile(event: any): void {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            if (
                this._checkIfValidFile(
                    file.name,
                    this.modalSelectEvidenceData.formats
                )
            ) {
                this.model.paymentForm.patchValue({ paymentEvidence: file });
            }
        }
    }

    /**
     * Create a payment
     */
    private _createReceiptPaid(): void {
        this._loadingService.show();
        ModalPlugin.hide(this.modalId);
        this.model
            .createReceiptPaid(this.contactId, this.policyId, this.paymentId)
            .subscribe((res: HttpResponse) => {
                this._loadingService.hide();
                this.model.payment = null;
                this.receiptPaid.emit();
                this._paymentAppliedActionsModalComponent.openModal({
                    contactId: this.contactId,
                    policyId: this.policyId,
                    paymentId: this.paymentId,
                    receiptPaidId: res.data,
                });
            });
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdApplicationDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdNextPaymentDate,
            this._onChangeDate,
            this
        );
    }

    /**
     * Load the payment data
     */
    private _loadPayment(): void {
        this.model.loadPayment(this.paymentId).subscribe(() => {
            PopoverPlugin.init();
            this._initCalendars();
            this.model.buildPaymentForm();
            if (!!this._modalSelectEvidence) {
                this._modalSelectEvidence.resetEvidenceValue();
            }
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
        context: ModalApplyPaymentComponent
    ): void {
        context.model.paymentForm.patchValue({ [selectorId]: changedValue });
    }

    /**
     * Request reload the payments
     * @param context The app context
     */
    private _notifyReceiptPaid(context: ModalApplyPaymentComponent): void {
        context.receiptPaid.emit();
    }

    private _checkIfValidFile(
        fileName: string,
        fileFormats: string[]
    ): boolean {
        const fileExtension: string = this._getFileExtension(fileName);
        const isValid: boolean = fileFormats.includes(fileExtension);
        return isValid;
    }

    private _getFileExtension(fileName: string): string {
        const index: number = fileName.lastIndexOf('.');
        return index !== -1 ? fileName.substring(index + 1) : '';
    }
}
