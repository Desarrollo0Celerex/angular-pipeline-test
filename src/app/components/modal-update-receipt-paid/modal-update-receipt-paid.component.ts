import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';

import { ModalUpdateReceiptPaidService } from './modal-update-receipt-paid.service';

declare var DatePickerPlugin: any;

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
    calendarIdApplicationDate: string = 'applicationDate';
    private _isFormSubmitted: boolean = false;

    constructor(private _modalUpdateReceiptPaidService: ModalUpdateReceiptPaidService) { }

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
            console.log('Guardar pago');
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
            //setTimeout(() => {
                this._initCalendars();
                /*console.log('calendar inicializado!!');
            }, 5000)*/
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
