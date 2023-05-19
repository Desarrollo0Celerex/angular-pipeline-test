import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ACTION_TYPES } from '@constants/global';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { PolicyDetailsData } from '@interfaces/policy-details-data.interface';

import { ModalGetPolicyDetailsService } from './modal-get-policy-details.service';

declare var $: any;
declare var ModalPlugin: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-modal-get-policy-details',
  templateUrl: './modal-get-policy-details.component.html',
  styles: [
  ]
})
export class ModalGetPolicyDetailsComponent implements OnChanges {
    @Input() actionType: number = 0;
    @Input() modalId: string = '';
    @Input() insuranceId: number = 0;
    @Output() policyDetailsSelected: EventEmitter<PolicyDetailsData> = new EventEmitter<PolicyDetailsData>();
    ACTION_TYPES: any = ACTION_TYPES;
    selectInsuranceTypeId: string = 'agt-select-insurance-type';
    private _isFormSubmitted: boolean = false;

    constructor(public modalGetPolicyDetailsService: ModalGetPolicyDetailsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.actionType && !!changes.actionType.currentValue) {
            this.modalGetPolicyDetailsService.buildPolicyDetailsForm(this.actionType);
        }

        if(!!changes.insuranceId.currentValue) {
            this._loadInsuranceTypes();
        }
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalGetPolicyDetailsService.policyDetailsForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalGetPolicyDetailsService.policyDetailsForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Submit event to validate policy
     */
    onSubmitSelectPolicyDetails(): void {
        this._isFormSubmitted = true;
        if(this.modalGetPolicyDetailsService.policyDetailsForm.valid) {
            ModalPlugin.hide(this.modalId);
            this.policyDetailsSelected.emit(this.modalGetPolicyDetailsService.policyDetailsForm.value);
        }
    }

    /**
     * Load the insurance types
     * And init the insurance type select
     */
    private _loadInsuranceTypes(): void {
        this._isFormSubmitted = false;
        this.modalGetPolicyDetailsService.policyDetailsForm.reset();
        this.modalGetPolicyDetailsService.loadInsuranceTypes(this.insuranceId).subscribe( () => {
            Select2Plugin.initSelect();
            this._onChangeInsuranceType(this.selectInsuranceTypeId);
        })
    }

    /**
     * Create a change event on select insurance type
     * @param selectId The select ID
     */
    private _onChangeInsuranceType(selectId: string): void {
        $('select#'+selectId).on('change', (element: any) => {
            this.modalGetPolicyDetailsService.policyDetailsForm.patchValue({insuranceTypeId: element.currentTarget.value});
        });
    }
}
