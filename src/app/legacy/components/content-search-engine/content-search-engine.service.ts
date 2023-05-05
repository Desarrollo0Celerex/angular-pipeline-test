import { Injectable } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@core/helpers/validators.helper';

@Injectable()
export class ContentSearchEngineService {
    searchForm: UntypedFormGroup;

    constructor(private _formBuider: UntypedFormBuilder) {
        this.searchForm = this.buildSearchForm();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.searchForm.controls;
    }

    /**
     * Build the search form
     */
    buildSearchForm(): UntypedFormGroup {
        return this._formBuider.group({
            query: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                    ValidatorsHelper.freeText,
                ],
            ],
        });
    }
}
