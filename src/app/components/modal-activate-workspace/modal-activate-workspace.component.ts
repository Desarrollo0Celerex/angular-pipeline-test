import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';

import { ModalActivateWorkspaceService } from './modal-activate-workspace.service'

@Component({
  selector: 'agt-modal-activate-workspace',
  templateUrl: './modal-activate-workspace.component.html',
  styles: [
  ]
})
export class ModalActivateWorkspaceComponent{
    @Input() modalId: string;
    private _isFormSubmitted: boolean;

    constructor(public modalActivateWorkspaceService: ModalActivateWorkspaceService) {
        this.modalId = '';
        this._isFormSubmitted = false;
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalActivateWorkspaceService.licenseForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalActivateWorkspaceService.licenseForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Submit event to activate workspace
     */
    onSubmitActivateWorkspace(): void {
        this._isFormSubmitted = true;
        if(this.modalActivateWorkspaceService.licenseForm.valid) {
            // TODO:  Activate workspace
            console.log('Activar espacio de trabajo');
        }
    }

}
