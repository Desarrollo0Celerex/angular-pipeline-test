import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ReceiptsData } from '@interfaces/receipts-data.interface';

import { ModalGenerateReceiptsService } from './modal-generate-receipts.service';

declare var $: any;
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-modal-generate-receipts',
  templateUrl: './modal-generate-receipts.component.html',
  styles: [
  ]
})
export class ModalGenerateReceiptsComponent implements OnInit {
    @Input() modalId: string;
    @Input() amount: number;
    @Input() currencyName: string;
    @Output() generateReceipts: EventEmitter<ReceiptsData>;
    calendarIdPaymentDate: string;
    selectIdPaymentMethod: string;
    selectIdPaymentPlan: string;
    private _isFormSubmitted: boolean;

    constructor(public modalGenerateReceiptsService: ModalGenerateReceiptsService) {
        this.modalId = '';
        this.amount = 0;
        this.currencyName = '';
        this.generateReceipts = new EventEmitter<ReceiptsData>();
        this.calendarIdPaymentDate = 'paymentDate';
        this.selectIdPaymentMethod = 'agt-receipts-payment-method';
        this.selectIdPaymentPlan = 'agt-receipts-payment-plan';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._loadPaymentMethods();
        this._loadPaymentPlans();
        this._initCalendars();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalGenerateReceiptsService.receiptsForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalGenerateReceiptsService.receiptsForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    onClickCloseModal(): void {
        this._closeModal();
    }

    /**
     * Submit event to request generate the receipts
     */
    onSubmitGenerateReceipts(): void {
        this._isFormSubmitted = true;
        if(this.modalGenerateReceiptsService.receiptsForm.valid) {
            this._closeModal();
            this.generateReceipts.emit(this.modalGenerateReceiptsService.receiptsForm.value);
        }
    }

    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
        ModalPlugin.removeFixed();
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdPaymentDate, this._onChangeDate, this);
    }

    /**
     * Load the payment methods
     */
    private _loadPaymentMethods(): void {
        this.modalGenerateReceiptsService.loadPaymentMethods().subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangePaymentMethodId();
        })
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.modalGenerateReceiptsService.loadPaymentPlans().subscribe( () => {
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
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalGenerateReceiptsComponent): void {
        context.modalGenerateReceiptsService.receiptsForm.patchValue({[selectorId]: changedValue});
    }

    /**
     * Event to change the method ID value
     */
    private _onChangePaymentMethodId(): void {
        $('select#'+this.selectIdPaymentMethod).on('change', (element: any) => {
            this.modalGenerateReceiptsService.receiptsForm.patchValue({paymentMethodId: element.currentTarget.value});
        });
    }

    /**
     * Event to change the plan ID value
     */
    private _onChangePaymentPlanId(): void {
        $('select#'+this.selectIdPaymentPlan).on('change', (element: any) => {
            this.modalGenerateReceiptsService.receiptsForm.patchValue({paymentPlanId: element.currentTarget.value});
        });
    }

}
