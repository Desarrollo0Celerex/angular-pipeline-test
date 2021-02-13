import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { FREE_TEXT_LENGTH } from '@constants/global';

@Injectable()
export class ContentSearchEngineService {
    searchForm: FormGroup;

    constructor(private _formBuider: FormBuilder) {
        this.searchForm = this._formBuider.group({});
    }

    get f(): { [key: string]: AbstractControl; }  {
        return this.searchForm.controls;
    }

    /**
     * Build the search form
     */
    buildSearchForm(query: string): void {
        this.searchForm = this._formBuider.group({
            query: [query, [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX)]]
        })
    }
}
