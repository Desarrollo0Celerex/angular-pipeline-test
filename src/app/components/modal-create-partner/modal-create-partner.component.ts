import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@services/loading.service';

import { ModalCreatePartnerService } from './modal-create-partner.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-create-partner',
  templateUrl: './modal-create-partner.component.html',
  styles: [
  ],
  providers: [ModalCreatePartnerService]
})
export class ModalCreatePartnerComponent implements OnInit {
    @Input() modalId: string = '';
    private _isFormSubmitted: boolean = false;

    constructor(
        private _loadingService: LoadingService,
        private _modalCreatePartnerService: ModalCreatePartnerService
    ) { }

    ngOnInit(): void {
    }

    get model(): ModalCreatePartnerService {
        return this._modalCreatePartnerService;
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    createPartner(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            this._loadingService.show();
            this.model.createPartner().subscribe(() => {
                ModalPlugin.hide(this.modalId);
                this._loadingService.hide();
                AlertHelper.partnerCreated();
            })
        }
    }

}
