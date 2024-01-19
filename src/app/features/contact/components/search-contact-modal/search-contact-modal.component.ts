import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CONTENT_TYPES, FREE_TEXT_LENGTH } from '@constants/global';
import { CONTACTS_ROUTES } from '@contact/constants/routes';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-search-contact-modal',
    templateUrl: './search-contact-modal.component.html',
    styles: [],
})
export class SearchContactModalComponent {
    modalId = 'agt-search-contact-modal';
    form: FormGroup = this._buildSearchForm();
    private _isFormSubmitted = false;
    private _contactAction = 0;

    constructor(private _formBuider: FormBuilder, private _router: Router) {}

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
        this._isFormSubmitted = false;
        this.form.reset();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    openModal(contactAction: CONTACT_ACTIONS): void {
        this._contactAction = contactAction;
        ModalPlugin.show(this.modalId);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            ModalPlugin.hide(this.modalId);
            const query: string = this.form.value.query.trim();
            this.form.reset();
            this._router.navigate([CONTACTS_ROUTES.listSearchResults], {
                queryParams: {
                    contentType: CONTENT_TYPES.CONTACT.ID,
                    contentTypeName: CONTENT_TYPES.CONTACT.NAME,
                    query,
                    actionType: this._contactAction,
                },
            });
        }
    }

    private _buildSearchForm(): FormGroup {
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
