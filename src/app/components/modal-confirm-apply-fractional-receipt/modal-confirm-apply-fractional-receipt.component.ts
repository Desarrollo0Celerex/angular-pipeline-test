import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { modalConfirmApplyFractionalReceiptService } from './modal-confirm-apply-fractional-receipt.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-apply-fractional-receipt',
  templateUrl: './modal-confirm-apply-fractional-receipt.component.html',
  styles: [
  ],
  providers: [modalConfirmApplyFractionalReceiptService]
})
export class modalConfirmApplyFractionalReceiptComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() maxAmount: number = 0;
    @Output() actionCancelled: EventEmitter<void> = new EventEmitter<void>();
    @Output() actionConfirmed: EventEmitter<number> = new EventEmitter<number>();
    private _isFormSubmitted: boolean = false;

    constructor(public model: modalConfirmApplyFractionalReceiptService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.maxAmount.currentValue) {
            this.model.buildForm(this.maxAmount);
        }
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    cancelAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionCancelled.emit();
    }

    applyEndorsementWithFractionalReceipt(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            ModalPlugin.hide(this.modalId);
            const fractionalReceiptAmount: number = parseFloat(UtilitiesHelper.removeCommasFromQuantity(this.model.f.fractionalReceiptAmount.value));
            this.actionConfirmed.emit(fractionalReceiptAmount);
        }
    }
}
