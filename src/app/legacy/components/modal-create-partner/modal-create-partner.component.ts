import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalCreatePartnerService } from './modal-create-partner.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-create-partner',
    templateUrl: './modal-create-partner.component.html',
    styles: [],
    providers: [ModalCreatePartnerService],
    standalone: false
})
export class ModalCreatePartnerComponent {
    @Input() modalId: string = '';
    @Output() hasCoincidences: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() canCreatePartner: EventEmitter<string> =
        new EventEmitter<string>();
    private _isFormSubmitted: boolean = false;

    constructor(
        private _loadingService: LoadingService,
        private _modalCreatePartnerService: ModalCreatePartnerService
    ) {}

    get model(): ModalCreatePartnerService {
        return this._modalCreatePartnerService;
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    checkHasCoincidences(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            this.model
                .checkHasCoincidences()
                .subscribe((hasCoincidences: boolean) => {
                    this._loadingService.hide();
                    if (hasCoincidences) {
                        this.hasCoincidences.emit(this.model.f.name.value);
                    } else {
                        this.canCreatePartner.emit(this.model.f.name.value);
                    }
                    this._resetForm();
                });
        }
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
        this._resetForm();
    }

    /**
     * Reset the form
     */
    private _resetForm(): void {
        this._isFormSubmitted = false;
        this.model.form.reset();
    }
}
