import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Payment } from '@interfaces/payment.interface';
import { LoadingService } from '@core/services/loading.service';

import { ModalChangePaymentDateService } from './modal-change-payment-date.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-change-payment-date',
    templateUrl: './modal-change-payment-date.component.html',
    styles: [],
    providers: [ModalChangePaymentDateService],
})
export class ModalChangePaymentDateComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() paymentId: string = '';
    @Output() paymenDateUpdated: EventEmitter<void> = new EventEmitter<void>();
    calendarIdPaymentDate: string = 'paymentDate';
    private _isFormSubmitted: boolean = false;

    constructor(
        private _modalChangePaymentDateService: ModalChangePaymentDateService,
        private _loadingService: LoadingService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.paymentId.currentValue) {
            this._loadPayment(changes.paymentId.currentValue);
        }
    }

    get model(): ModalChangePaymentDateService {
        return this._modalChangePaymentDateService;
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    updatePaymentDate(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            this._loadingService.show();
            this.closeModal();
            this.model.updatePaymentDate(this.paymentId).subscribe(() => {
                this._loadingService.hide();
                this.paymenDateUpdated.emit();
                AlertHelper.paymentDateUpdated();
            });
        }
    }

    private _loadPayment(paymentId: string): void {
        this.model.loadPayment(paymentId).subscribe((res: Payment) => {
            this.model.buildForm(res.paymentDate);
            this._initCalendars();
        });
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdPaymentDate,
            this._onChangeDate,
            this
        );
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
        context: ModalChangePaymentDateComponent
    ): void {
        context.model.form.patchValue({ [selectorId]: changedValue });
    }
}
