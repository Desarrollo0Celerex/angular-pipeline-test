import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';

@Injectable()
export class ContentSearchEngineService {
    searchForm: FormGroup;

    constructor(private _formBuider: FormBuilder) {
        this.searchForm = this.buildSearchForm();
    }

    get f(): { [key: string]: AbstractControl; }  {
        return this.searchForm.controls;
    }

    /**
     * Build the search form
     */
    buildSearchForm(): FormGroup {
        return this._formBuider.group({
            query: ['', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
        })
    }
}
