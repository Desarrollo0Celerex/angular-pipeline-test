import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { SLACK_UNITS } from '@constants/global';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { LoadingService } from '@services/loading.service';

import { ModalApplyPaymentService } from './modal-apply-payment.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
  selector: 'agt-modal-apply-payment',
  templateUrl: './modal-apply-payment.component.html',
  styles: [
  ],
  providers: [ModalApplyPaymentService]
})
export class ModalApplyPaymentComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Output() receiptPaid: EventEmitter<void> = new EventEmitter<void>();
    @Output() showModalAgain: EventEmitter<void> = new EventEmitter<void>();
    calendarIdApplicationDate: string = 'applicationDate';
    calendarIdNextPaymentDate: string = 'nextPaymentDate';
    modalIdConfirmApplyPaymentWithBalanceOutstanding: string = 'agt-confirm-apply-payment-with-balance-outstanding'
    modalIdConfirmApplyPaymentWithBalanceRemaining: string = 'agt-confirm-apply-payment-with-balance-remaining'
    modalIdNotifyAmountExceeded: string = 'agt-notify-amount-exceeded';
    modalIdNotifyReceiptsExceeded: string = 'agt-notify-receipts-exceeded';
    modalIdNotifyMissingReceipts: string = 'agt-notify-missing-receipts';
    modalIdNotifyMissingAmount: string = 'agt-notify-missing-amount';
    amountExceeded: number = 0;
    receiptsExceeded: number = 0;
    missingReceipts: number = 0;
    missingAmount: number = 0;
    private _isFormSubmitted: boolean = false;
    private _canIgnoreAmountExceeded: boolean = false;
    private _canIgnoreMissingAmount: boolean = false;

    constructor(
        private _modalApplyPaymentService: ModalApplyPaymentService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.paymentId && !!changes.paymentId.currentValue) {
            this._canIgnoreAmountExceeded = false;
            this._canIgnoreMissingAmount = false;
            this._loadPayment();
        }
    }

    get model(): ModalApplyPaymentService {
        return this._modalApplyPaymentService;
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.paymentForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.paymentForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    applyPayment(): void {
        this._isFormSubmitted = true;
        if(this.model.paymentForm.valid && !!this.model.payment) {
            this.receiptsExceeded = 0;
            this.amountExceeded = 0;
            this.missingReceipts = 0;
            this.missingReceipts = 0;
            const receiptsToPay: number = parseInt(this.model.f.receipts.value);
            const pendingReceipts: number = parseInt(this.model.payment.pendingReceipts.toString());
            const amountToPay: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.model.f.amount.value));
            const pendingAmount: number = parseFloat(this.model.payment.pendingAmount.toString());
            // If the receipts to pay are greater than the pending receipts
            if(receiptsToPay > pendingReceipts) {
                this.receiptsExceeded = receiptsToPay - pendingReceipts;
                ModalPlugin.hide(this.modalId);
                ModalPlugin.show(this.modalIdNotifyReceiptsExceeded);
                throw new Error('Receipts exceeded');
            }
            // If you can't ignore the amount excceded
            if(!this._canIgnoreAmountExceeded) {
                // If the payment to pay is grater than the pending amount
                if(amountToPay > (pendingAmount + SLACK_UNITS)) {
                    this.amountExceeded = amountToPay - pendingAmount;
                    ModalPlugin.hide(this.modalId);
                    ModalPlugin.show(this.modalIdNotifyAmountExceeded);
                    throw new Error('Amount exceeded');
                }
            }
            // If the amount to pay covers the total payment
            // And the recipts to pay are less than the total receipts
            if(
                (amountToPay > (pendingAmount - SLACK_UNITS)) &&
                receiptsToPay < pendingReceipts
            ) {
                this.missingReceipts = pendingReceipts - receiptsToPay;
                ModalPlugin.hide(this.modalId);
                ModalPlugin.show(this.modalIdNotifyMissingReceipts);
                throw new Error('Missing receipts');
            }
            // If you can't ignore the missing amount
            if(!this._canIgnoreMissingAmount) {
                // If the receipts to pay covers the total receipts
                // And the amount to pay is less than the total amount
                if(
                    receiptsToPay === pendingReceipts &&
                    amountToPay < (pendingAmount - SLACK_UNITS)
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

    /**
     * Create a payment
     */
    private _createReceiptPaid(): void {
        this._loadingService.show();
        ModalPlugin.hide(this.modalId);
        this.model.createReceiptPaid(this.contactId, this.policyId,this.paymentId).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.receiptPaid(this._notifyReceiptPaid, this);
        });
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdApplicationDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdNextPaymentDate, this._onChangeDate, this);
    }

    /**
     * Load the payment data
     */
    private _loadPayment(): void {
        this.model.loadPayment(this.paymentId).subscribe(() => {
            PopoverPlugin.init();
            this._initCalendars();
            this.model.buildPaymentForm();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalApplyPaymentComponent): void {
        context.model.paymentForm.patchValue({[selectorId]: changedValue});
    }

    /**
     * Request reload the payments
     * @param context The app context
     */
    private _notifyReceiptPaid(context: ModalApplyPaymentComponent): void {
        context.receiptPaid.emit();
    }
}
