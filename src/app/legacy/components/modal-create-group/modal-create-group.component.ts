import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalCreateGroupService } from './modal-create-group.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-create-group',
    templateUrl: './modal-create-group.component.html',
    styles: [],
    providers: [ModalCreateGroupService],
    standalone: false
})
export class ModalCreateGroupComponent implements OnInit {
    @Input() modalId: string = '';
    @Output() hasCoincidences: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() canCreateGroup: EventEmitter<string> = new EventEmitter<string>();
    private _isFormSubmitted: boolean = false;

    constructor(
        private _loadingService: LoadingService,
        private _modalCreateGroupService: ModalCreateGroupService
    ) {}

    ngOnInit(): void {
        //this._catchQueryParams();
    }

    get model(): ModalCreateGroupService {
        return this._modalCreateGroupService;
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
                    if (hasCoincidences == true) {
                        this.hasCoincidences.emit(this.model.f.name.value);
                    } else {
                        this.canCreateGroup.emit(this.model.f.name.value);
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
