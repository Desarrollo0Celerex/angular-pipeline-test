import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ERROR_CODES } from '@constants/error-codes';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpError } from '@interfaces/http-error.interface';
import { UpdateReceiptPaidDataSend } from '@interfaces/update-receipt-paid-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { ModalUpdateReceiptPaidService } from './modal-update-receipt-paid.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-update-receipt-paid',
  templateUrl: './modal-update-receipt-paid.component.html',
  styles: [
  ],
  providers: [ModalUpdateReceiptPaidService]
})
export class ModalUpdateReceiptPaidComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() receiptPaidId: string = '';
    @Output() receiptPaidUpdated: EventEmitter<UpdateReceiptPaidDataSend> = new EventEmitter<UpdateReceiptPaidDataSend>();
    calendarIdApplicationDate: string = 'applicationDate';
    modalIdErrorUpdatingPaidReceipt: string = 'agt-error-updating-paid-receipt';
    private _isFormSubmitted: boolean = false;

    constructor(
        private _modalUpdateReceiptPaidService: ModalUpdateReceiptPaidService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.receiptPaidId && !!changes.receiptPaidId.currentValue) {
            this._loadReceiptPaid(changes.receiptPaidId.currentValue);
        }
    }

    get model(): ModalUpdateReceiptPaidService {
        return this._modalUpdateReceiptPaidService;
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

    updateReceipPaid(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            this._loadingService.show();
            this.model.updateReceipPaid(this.receiptPaidId).subscribe(() => {
                ModalPlugin.hide(this.modalId);
                this.receiptPaidUpdated.emit(this.model.form.value);
                setTimeout(() => {
                    this._loadingService.hide();
                    AlertHelper.receiptPaidUpdated();
                },500);
            }, (error: HttpError) => {
                switch(error.error) {
                    case ERROR_CODES.receiptsAmountExceeded:
                    case ERROR_CODES.receiptsNumberExceeded:
                    case ERROR_CODES.pendingAmount:
                    case ERROR_CODES.pendingReceipts:
                        ModalPlugin.hide(this.modalId);
                        ModalPlugin.show(this.modalIdErrorUpdatingPaidReceipt);
                    break;
                }
            })
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdApplicationDate, this._onChangeDate, this);
    }

    private _loadReceiptPaid(receiptPaidId: string): void {
        this.model.isBuiltForm = false;
        this.model.loadReceiptPaid(receiptPaidId).subscribe(() => {
            this.model.buildForm();
            this._initCalendars();
        });
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalUpdateReceiptPaidComponent): void {
        context.model.form.patchValue({[selectorId]: changedValue});
    }
}
