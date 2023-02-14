import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl } from '@angular/forms';

import { FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';

@Injectable()
export class ModalSearchContactService {
    form: UntypedFormGroup = this._buildSearchForm();

    constructor(private _formBuider: UntypedFormBuilder) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    private _buildSearchForm(): UntypedFormGroup {
        return this._formBuider.group({
            query: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
        });
    }
}
