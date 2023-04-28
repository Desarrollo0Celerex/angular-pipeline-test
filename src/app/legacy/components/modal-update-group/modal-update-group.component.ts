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
import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalUpdateGroupService } from './modal-update-group.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-update-group',
    templateUrl: './modal-update-group.component.html',
    styles: [],
    providers: [ModalUpdateGroupService],
})
export class ModalUpdateGroupComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() groupId: string = '';
    @Input() groupName: string = '';
    @Output() groupNameUpdated: EventEmitter<string> =
        new EventEmitter<string>();
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalUpdateGroupService,
        private _loadingService: LoadingService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.groupName && !!changes.groupName.currentValue) {
            this.model.form.patchValue({
                name: changes.groupName.currentValue,
            });
        }
    }

    closeModal(): void {
        this.model.form.patchValue({ name: this.groupName });
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

    updateGroup(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            this._loadingService.show();
            this.model
                .checkHasCoincidences()
                .subscribe((hasCoincidences: boolean) => {
                    if (hasCoincidences) {
                        this.model.f.name.setErrors({ groupNameExist: true });
                        this._loadingService.hide();
                    } else {
                        ModalPlugin.hide(this.modalId);
                        this.model.updateGroup(this.groupId).subscribe(() => {
                            this.groupNameUpdated.emit(this.model.f.name.value);
                            this._loadingService.hide();
                            AlertHelper.groupUpdated();
                        });
                    }
                });
        }
    }
}
