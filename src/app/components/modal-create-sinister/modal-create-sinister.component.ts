import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { ModalCreateSinisterService } from './modal-create-sinister.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-create-sinister',
  templateUrl: './modal-create-sinister.component.html',
  styles: [
  ],
  providers: [ModalCreateSinisterService]
})
export class ModalCreateSinisterComponent implements OnChanges, OnInit {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() insuranceId: number = 0;
    @Output() sinisterCreated: EventEmitter<void> = new EventEmitter<void>();
    calendarIdSinisterDate: string = 'sinisterDate';
    calendarIdResolutionDate: string = 'resolutionDate';
    private _isFormSubmitted: boolean = false;
    private _sinisterId: string = '';

    constructor(
        public modalCreateSinisterService: ModalCreateSinisterService,
        private _loadingService: LoadingService,
        private _router: Router,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.insuranceId && !!changes.insuranceId.currentValue) {
            this.modalCreateSinisterService.loadSinisterTypes(changes.insuranceId.currentValue);
        } else if(!!this.policyId) {
            this._loadPolicyInsuranceId();
        }

        if(!(!!changes.contactId) || !(!!changes.contactId.currentValue) && !!this.policyId) {
            this._loadPolicyCotactId();
        }
    }

    ngOnInit(): void {
        this.modalCreateSinisterService.loadWorkspaceUser();
        this._initCalendars();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalCreateSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalCreateSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        this._resetSinisterForm();
        ModalPlugin.hide(this.modalId);
    }

    /**
     * Submit event to create a sinister
     */
    onSubmitCreateSinister(): void {
        this._isFormSubmitted = true;
        if(this.modalCreateSinisterService.sinisterForm.valid) {
            ModalPlugin.hide(this.modalId);
            this._loadingService.show();
            this.modalCreateSinisterService.createSinister(this.contactId, this.policyId).subscribe( (res: HttpResponse) => {
                this._resetSinisterForm();
                this._loadingService.hide();
                this._sinisterId = res.data;
                AlertHelper.sinisterCreated(this._notifySinisterCreated, this);
            });
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdSinisterDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdResolutionDate, this._onChangeDate, this);
    }

    private _loadPolicyCotactId(): void {
        this.modalCreateSinisterService.getPolicyContactId(this.policyId).subscribe((contactId: string) => {
            this.contactId = contactId;
        });
    }

    private _loadPolicyInsuranceId(): void {
        this.modalCreateSinisterService.getPolicyInsuranceId(this.contactId, this.policyId).subscribe((insuranceId: number) => {
            this.modalCreateSinisterService.loadSinisterTypes(insuranceId);
        });
    }

    /**
     * Notify that a sinister was created
     * @param context The app context
     */
    private _notifySinisterCreated(context: ModalCreateSinisterComponent): void {
        context._router.navigateByUrl(ROUTES_NAME.showSinisterHistory(context.contactId, context.policyId, context._sinisterId));
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalCreateSinisterComponent): void {
        context.modalCreateSinisterService.sinisterForm.patchValue({[selectorId]: changedValue});
        if(selectorId === 'sinisterDate') {
            const resolutionDate: string = moment(changedValue, 'DD/MM/YYYY').add('days', 7).format('DD/MM/YYYY');
            context.modalCreateSinisterService.sinisterForm.patchValue({resolutionDate});
        }
    }

    /**
     * Reset the sinister form
     */
    private _resetSinisterForm(): void {
        this._isFormSubmitted = false;
        this.modalCreateSinisterService.sinisterForm.reset();
    }
}
