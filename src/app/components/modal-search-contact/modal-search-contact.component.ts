import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { InputValidatorHelper } from '@helpers/input-validator.helper';

import { ModalSearchContactService } from './modal-search-contact.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-search-contact',
  templateUrl: './modal-search-contact.component.html',
  styles: [
  ],
  providers: [ModalSearchContactService]
})
export class ModalSearchContactComponent {
    @Input() modalId: string = '';
    @Input() actionType: number = 0;
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalSearchContactService,
        private _router: Router
    ) { }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    searchContact(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            ModalPlugin.hide(this.modalId);
            const query: string = this.model.f.query.value.trim();
            this._router.navigate([ROUTES_NAME.listSearchResults], { 
                queryParams: { 
                    contentType: CONTENT_TYPES.CONTACT.ID, 
                    contentTypeName: CONTENT_TYPES.CONTACT.NAME, 
                    query,
                    actionType: this.actionType
                }
            });
        }
    }

}
