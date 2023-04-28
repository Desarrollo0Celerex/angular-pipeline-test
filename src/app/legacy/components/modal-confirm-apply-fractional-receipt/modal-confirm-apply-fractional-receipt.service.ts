import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ValidatorsHelper } from '@helpers/validators.helper';

@Injectable()
export class modalConfirmApplyFractionalReceiptService {
    form: UntypedFormGroup = this._formBuilder.group({
        fractionalReceiptAmount: ['',[Validators.required, ValidatorsHelper.amount]]
    });

    constructor(private _formBuilder: UntypedFormBuilder) { }

    get f(): {[key: string]: AbstractControl} {
        return this.form.controls;
    }

    /**
     * Build the form
     * @param maxAmount The max amount
     */
    buildForm(maxAmount: number): void {
        this.form = this._formBuilder.group({
            fractionalReceiptAmount: ['',[Validators.required, Validators.max(maxAmount), ValidatorsHelper.amount]]
        })
    }
}
