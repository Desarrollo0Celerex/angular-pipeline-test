import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@services/loading.service';

import { ModalCreateQuotationService } from './modal-create-quotation.service';

declare var $: any;
declare var ModalPlugin: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-modal-create-quotation',
  templateUrl: './modal-create-quotation.component.html',
  styles: [
  ]
})
export class ModalCreateQuotationComponent implements OnInit, OnChanges {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() insuranceId: number;
    selectInsuranceTypeId: string;
    private _isFormSubmitted: boolean;

    constructor(
        public modalCreateQuotationService: ModalCreateQuotationService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.contactId = '';
        this.modalId = '';
        this.insuranceId = 0;
        this.selectInsuranceTypeId = 'agt-insurance-type'
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this.modalCreateQuotationService.buildQuotationForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.insuranceId.currentValue) {
            this.modalCreateQuotationService.quotationForm.reset();
            this._isFormSubmitted = false;
            this.modalCreateQuotationService.loadInsuranceTypes(this.insuranceId).subscribe( () => {
                Select2Plugin.init();
                this._onChangeInsuranceType(this.selectInsuranceTypeId);
            })
        }
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalCreateQuotationService.quotationForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalCreateQuotationService.quotationForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Submit event to create the quotation
     */
    onSubmitCreateQuotation(): void {
        this._isFormSubmitted = true;
        if(this.modalCreateQuotationService.quotationForm.valid) {
            this._loadingService.show();
            this.modalCreateQuotationService.createQuotation(this.contactId, this.insuranceId).subscribe( () => {
                this._loadingService.hide();
                ModalPlugin.hide(this.modalId);
                AlertHelper.quotationCreated(this._goToListContactQuotations, this);
            });
        }
    }

    /**
     * Navigates to list the contact quotations
     * @param  context The app context
     */
    private _goToListContactQuotations(context: any): void {
        context._router.navigateByUrl(ROUTES_NAME.listContactQuotations(context.contactId));
    }

    /**
     * Create a change event on select insurance type
     * @param selectId The select ID
     */
    private _onChangeInsuranceType(selectId: string): void {
        $('select#'+selectId).on('change', (element: any) => {
            this.modalCreateQuotationService.quotationForm.patchValue({insuranceTypeId: element.currentTarget.value});
        });
    }

}
