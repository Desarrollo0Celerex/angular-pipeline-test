import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Policy } from '@interfaces/policy.interface';
import { LoadingService } from '@services/loading.service';

import { ModalCreateSinisterService } from './modal-create-sinister.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-create-sinister',
  templateUrl: './modal-create-sinister.component.html',
  styles: [
  ]
})
export class ModalCreateSinisterComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() policy: Policy | null = null;
    @Output() sinisterCreated: EventEmitter<void> = new EventEmitter<void>();
    calendarIdSinisterDate: string = 'sinisterDate';
    private _isFormSubmitted: boolean = false;

    constructor(
        public modalCreateSinisterService: ModalCreateSinisterService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.policy.currentValue) {
            this._initCalendars();
            this.modalCreateSinisterService.loadSinisterTypes(changes.policy.currentValue.insuranceId);
        }
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalCreateSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalCreateSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        this._resetSinisterForm();
        ModalPlugin.hide(this.modalId);
    }

    /**
     * Submit event to create a sinister
     */
    onSubmitCreateSinister(): void {
        this._isFormSubmitted = true;
        if(this.modalCreateSinisterService.sinisterForm.valid && !!this.policy) {
            ModalPlugin.hide(this.modalId);
            this._loadingService.show();
            this.modalCreateSinisterService.createSinister(this.policy.contactId, this.policy.policyId).subscribe( () => {
                this._resetSinisterForm();
                this._loadingService.hide();
                AlertHelper.sinisterCreated(this._notifySinisterCreated, this);
            });
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdSinisterDate, this._onChangeDate, this);
    }

    /**
     * Notify that a sinister was created
     * @param context The app context
     */
    private _notifySinisterCreated(context: ModalCreateSinisterComponent): void {
        context.sinisterCreated.emit();
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalCreateSinisterComponent): void {
        context.modalCreateSinisterService.sinisterForm.patchValue({[selectorId]: changedValue});
    }

    /**
     * Reset the sinister form
     */
    private _resetSinisterForm(): void {
        this._isFormSubmitted = false;
        this.modalCreateSinisterService.sinisterForm.reset();
    }
}
