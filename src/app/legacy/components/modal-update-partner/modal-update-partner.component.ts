import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { AlertHelper } from '@core/helpers/alert.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalUpdatePartnerService } from './modal-update-partner.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-update-partner',
    templateUrl: './modal-update-partner.component.html',
    styles: [],
    providers: [ModalUpdatePartnerService],
})
export class ModalUpdatePartnerComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() partnerId: number = 0;
    @Input() partnerName: string = '';
    @Output() partnerNameUpdated: EventEmitter<string> =
        new EventEmitter<string>();
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalUpdatePartnerService,
        private _loadingService: LoadingService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.partnerName && !!changes.partnerName.currentValue) {
            this.model.form.patchValue({
                name: changes.partnerName.currentValue,
            });
        }
    }

    closeModal(): void {
        this.model.form.patchValue({ name: this.partnerName });
        ModalPlugin.hide(this.modalId);
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

    updatePartner(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            this._loadingService.show();
            this.model
                .checkHasCoincidences()
                .subscribe((hasCoincidences: boolean) => {
                    if (hasCoincidences) {
                        this.model.f.name.setErrors({ partnerNameExist: true });
                        this._loadingService.hide();
                    } else {
                        ModalPlugin.hide(this.modalId);
                        this.model
                            .updatePartner(this.partnerId)
                            .subscribe(() => {
                                this.partnerNameUpdated.emit(
                                    this.model.f.name.value
                                );
                                this._loadingService.hide();
                                AlertHelper.partnerUpdated();
                            });
                    }
                });
        }
    }
}
