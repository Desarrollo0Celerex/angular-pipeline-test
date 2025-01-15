import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SelectContactSourceData } from '@interfaces/select-contact-source-data.interface';

import { ModalSelectContactSourceService } from './modal-select-contact-source.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-contact-source',
    templateUrl: './modal-select-contact-source.component.html',
    styles: [],
    providers: [ModalSelectContactSourceService],
    standalone: false
})
export class ModalSelectContactSourceComponent implements OnInit {
    @Input() contactSourceId: number;
    @Input() contactSourceTypeId: number = 0;
    @Input() modalId: string;
    @Output() contactSourceIdSelected: EventEmitter<SelectContactSourceData>;
    private _isFormSubmitted: boolean = false;

    constructor(private _modalSelectContactSourceService: ModalSelectContactSourceService) {
        this.contactSourceId = 0;
        this.modalId = '';
        this.contactSourceIdSelected = new EventEmitter<SelectContactSourceData>();
    }

    ngOnInit(): void {
        this.model.buildContactSourceForm(this.contactSourceId, this.contactSourceTypeId);
        this.model.loadContactSourceTypes(this.contactSourceId);
        this.model.loadContactSources();
    }

    get model(): ModalSelectContactSourceService {
        return this._modalSelectContactSourceService;
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.contactSourceForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.contactSourceForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    loadContactSourceTypes(event: any): void {
        this.model.f.contactSourceTypeId.setValue(null);
        this.model.loadContactSourceTypes(event.target.value);
    }

    /**
     * Event submit to select the contact source
     */
    onSubmitSelectContactSource(): void {
        this._isFormSubmitted = true;
        if(this.model.contactSourceForm.valid) {
            ModalPlugin.hide(this.modalId);
            const data: SelectContactSourceData = {
                contactSourceId: this.model.f.contactSourceId.value,
                contactSourceTypeId: this.model.f.contactSourceTypeId.value
            }
            this.contactSourceIdSelected.emit(data);
        }
    }

}
