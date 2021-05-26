import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { ModalUpdateSinisterEventService } from './modal-update-sinister-event.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-update-sinister-event',
  templateUrl: './modal-update-sinister-event.component.html',
  styles: [
  ]
})
export class ModalUpdateSinisterEventComponent implements OnChanges, OnInit {
    @Input() modalId: string = '';
    @Input() sinisterEventData: SinisterEventDataSend | null = null;
    calendarIdEventDate: string = 'eventDate';
    private _isFormSubmitted: boolean = false;

    constructor(
        public modalUpdateSinisterEventService: ModalUpdateSinisterEventService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.sinisterEventData && !!changes.sinisterEventData.currentValue) {
            this._isFormSubmitted = false;
            this.modalUpdateSinisterEventService.sinisterEventForm.reset();
            this._loadSinisterEvent();
        }
    }

    ngOnInit(): void {
        this.modalUpdateSinisterEventService.loadSinisterEventTypes();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.modalUpdateSinisterEventService.sinisterEventForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.modalUpdateSinisterEventService.sinisterEventForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Click event to close the modal
     */
    onClickCloseModal(): void {
        this._closeModal();
    }

    /**
     * Submit event to update the sinister event
     */
    onSubmitUpdateSinisterEvent(): void {
        this._isFormSubmitted = true;
        if(this.modalUpdateSinisterEventService.sinisterEventForm.valid && !!this.sinisterEventData) {
            this._loadingService.show();
            this.modalUpdateSinisterEventService.updateSinisterEvent(this.sinisterEventData).subscribe(() => {
                this._loadingService.hide();
                this._closeModal();
                AlertHelper.sinisterEventUpdated(this._reloadPage, this)
            })
        }
    }

    /**
     * Close the modal
     */
    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
        ModalPlugin.removeFixed();
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdEventDate, this._onChangeDate, this);
    }

    /**
     * Load the sinister event
     */
    private _loadSinisterEvent(): void {
        if(!!this.sinisterEventData) {
            this.modalUpdateSinisterEventService.getSinisterEvent(this.sinisterEventData).subscribe((res: HttpResponse) => {
                this.modalUpdateSinisterEventService.populateSinisterEventForm(res.data);
                this._initCalendars();
            });
        }
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalUpdateSinisterEventComponent): void {
        context.modalUpdateSinisterEventService.sinisterEventForm.patchValue({[selectorId]: changedValue});
    }

    /**
     * Reload the page
     * @param context The app context
     */
    private _reloadPage(context: ModalUpdateSinisterEventComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if(!!context.sinisterEventData) {
            context._router.navigate(['/' + ROUTES_NAME.showSinisterHistory(context.sinisterEventData.contactId, context.sinisterEventData.policyId, context.sinisterEventData.sinisterId)], { relativeTo: context._activatedRoute });
        }
    }
}
