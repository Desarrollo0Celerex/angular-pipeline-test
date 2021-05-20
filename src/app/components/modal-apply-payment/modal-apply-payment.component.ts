import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { ModalApplyPaymentService } from './modal-apply-payment.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
  selector: 'agt-modal-apply-payment',
  templateUrl: './modal-apply-payment.component.html',
  styles: [
  ]
})
export class ModalApplyPaymentComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Output() receiptPaid: EventEmitter<string> = new EventEmitter<string>();
    calendarIdApplicationDate: string = 'applicationDate';
    calendarIdNextPaymentDate: string = 'nextPaymentDate';
    modalIdConfirmApplyPaymentWithBalanceOutstanding: string = 'agt-confirm-apply-payment-with-balance-outstanding'
    modalIdConfirmApplyPaymentWithBalanceRemaining: string = 'agt-confirm-apply-payment-with-balance-remaining'
    private _isFormSubmitted: boolean = false;

    constructor(
        public modalApplyPaymentService: ModalApplyPaymentService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.paymentId && !!changes.paymentId.currentValue) {
            this._loadPolicy();
        }
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalApplyPaymentService.paymentForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalApplyPaymentService.paymentForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Click event to request close the modal
     */
    onClickCloseModal(): void {
        this._closeModal();
    }

    /**
     * Event to cancel the payment application
     */
    onPaymentApplicationCancelled(): void {
        ModalPlugin.show(this.modalId);
        ModalPlugin.setFixed();
    }

    /**
     * Event to confirm the payment application
     */
    onPaymentApplicationConfirmed(): void {
        this._applyPayment();
    }

    /**
     * Submit event to apply the payment
     */
    onSubmitApplyPayment(): void {
        this._isFormSubmitted = true;
        if(this.modalApplyPaymentService.paymentForm.valid) {
            if(this.modalApplyPaymentService.checkHasBalanceRemaining()) {
                this._closeModal();
                this.modalApplyPaymentService.calculateBalanceRemaining();
                ModalPlugin.show(this.modalIdConfirmApplyPaymentWithBalanceRemaining);
            } else if(this.modalApplyPaymentService.checkHasBalanceOutstanding()) {
                this._closeModal();
                this.modalApplyPaymentService.calculateBalanceOutstanding();
                ModalPlugin.show(this.modalIdConfirmApplyPaymentWithBalanceOutstanding);
            } else {
                this._applyPayment();
            }
        }
    }

    /**
     * Apply payment
     */
    private _applyPayment(): void {
        this._loadingService.show();
        this.modalApplyPaymentService.createReceiptPaid(this.paymentId).subscribe( (res: HttpResponse) => {
            this._closeModal();
            this._loadingService.hide();
            const receiptPaidId: string = res.data;
            AlertHelper.receiptPaid(this._notifyReceiptPaid, this, receiptPaidId);
        });
    }

    /**
     * Close the modal
     */
    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
        ModalPlugin.removeFixed();
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
     * Load the policy data
     */
    private _loadPolicy(): void {
        this.modalApplyPaymentService.loadPolicy(this.paymentId).subscribe(() => {
            PopoverPlugin.init();
            this._initCalendars();
            this.modalApplyPaymentService.buildPaymentForm();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalApplyPaymentComponent): void {
        context.modalApplyPaymentService.paymentForm.patchValue({[selectorId]: changedValue});
    }

    /**
     * Request reload the payments
     * @param context The app context
     */
    private _notifyReceiptPaid(context: ModalApplyPaymentComponent, receiptPaidId: string): void {
        context.receiptPaid.emit(receiptPaidId);
    }
}
