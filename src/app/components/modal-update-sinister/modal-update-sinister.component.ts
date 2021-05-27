import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { ModalUpdateSinisterService } from './modal-update-sinister.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-update-sinister',
  templateUrl: './modal-update-sinister.component.html',
  styles: [
  ]
})
export class ModalUpdateSinisterComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;
    calendarIdSinisterDate: string = 'sinisterDate';
    private _isFormSubmitted: boolean = false;

    constructor(
        public modalUpdateSinisterService: ModalUpdateSinisterService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._loadSinister();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalUpdateSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalUpdateSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Submit event to update the sinister
     */
    onSubmitUpdateSinister(): void {
        this._isFormSubmitted = true;
        if(this.modalUpdateSinisterService.sinisterForm.valid && !!this.sinisterData) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            this.modalUpdateSinisterService.updateSinister(this.sinisterData).subscribe(() => {
                this._loadingService.hide();
                AlertHelper.sinisterUpdated(this._reloadPage, this)
            });
        }
    }

    /**
     * Reload the page
     * @param context The app context
     */
    private _reloadPage(context: ModalUpdateSinisterComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if(!!context.sinisterData) {
            context._router.navigate(['/' + ROUTES_NAME.showSinisterHistory(context.sinisterData.contactId, context.sinisterData.policyId, context.sinisterData.sinisterId)], { relativeTo: context._activatedRoute });
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdSinisterDate, this._onChangeDate, this);
    }

    /**
     * Load the sinister
     */
    private _loadSinister(): void {
        if(this.sinisterData) {
            this.modalUpdateSinisterService.loadSinister(this.sinisterData).subscribe( (res: HttpResponse) => {
                this.modalUpdateSinisterService.fillSinisterForm(res.data);
                this._loadSinisterTypes(res.data.insuranceId);
            })
        }
    }

    /**
     * Load the sinister types
     * @param insuranceId The insurance ID
     */
    private _loadSinisterTypes(insuranceId: number): void {
        this.modalUpdateSinisterService.loadSinisterTypes(insuranceId).subscribe(() => {
            this._initCalendars();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalUpdateSinisterComponent): void {
        context.modalUpdateSinisterService.sinisterForm.patchValue({[selectorId]: changedValue});
    }

}
