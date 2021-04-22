import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { ModalDoCollectionAdjustmentService } from './modal-do-collection-adjustment.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-do-collection-adjustment',
  templateUrl: './modal-do-collection-adjustment.component.html',
  styles: [
  ]
})
export class ModalDoCollectionAdjustmentComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() maxAmount: number = 0;
    @Output() applyEndorsementWithFractionalReceipt: EventEmitter<number> = new EventEmitter<number>();
    @Output() applyEndorsementWithoutFractionalReceipt: EventEmitter<void> = new EventEmitter<void>();
    private _isFormSubmitted: boolean = false;

    constructor(public modalDoCollectionAdjustmentService: ModalDoCollectionAdjustmentService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.maxAmount.currentValue) {
            this.modalDoCollectionAdjustmentService.buildForm(this.maxAmount);
        }
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalDoCollectionAdjustmentService.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalDoCollectionAdjustmentService.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Click event to request apply ensorsement without a fractional receipt
     */
    onClickApplyEndorsementWithoutFractionalReceipt(): void {
        ModalPlugin.hide(this.modalId);
        this.applyEndorsementWithoutFractionalReceipt.emit();
    }

    /**
     * Submit event to request apply ensorsement with a fractional receipt
     */
    onSubmitApplyEndorsementWithFractionalReceipt(): void {
        this._isFormSubmitted = true;
        if(this.modalDoCollectionAdjustmentService.form.valid) {
            ModalPlugin.hide(this.modalId);
            const fractionalReceiptAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.modalDoCollectionAdjustmentService.f.fractionalReceiptAmount.value));
            this.applyEndorsementWithFractionalReceipt.emit(fractionalReceiptAmount);
        }
    }
}
