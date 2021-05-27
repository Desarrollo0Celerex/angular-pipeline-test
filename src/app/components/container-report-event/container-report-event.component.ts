import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { SINISTER_STATUS } from '@constants/global';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@services/loading.service'

import { ContainerReportEventService } from './container-report-event.service';

declare var DatePickerPlugin: any;

@Component({
  selector: 'agt-container-report-event',
  templateUrl: './container-report-event.component.html',
  styles: [
  ]
})
export class ContainerReportEventComponent implements OnInit {
    @Input() sinisterData: SinisterDataSend | null = null;
    SINISTER_STATUS: any = SINISTER_STATUS;
    calendarIdEventDate: string = 'eventDate';
    private _isFormSubmitted: boolean = false;

    constructor(
        public containerReportEventService: ContainerReportEventService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._loadSinister();
        this._initCalendars();
        this.containerReportEventService.loadSinisterEventTypes();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.containerReportEventService.eventForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.containerReportEventService.eventForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Event submit to report event
     */
    onSubmitReportEvent(): void {
        this._isFormSubmitted = true;
        if(this.containerReportEventService.eventForm.valid && !!this.sinisterData) {
            this._loadingService.show();
            this.containerReportEventService.reportSinisterEvent(this.sinisterData).subscribe(() => {
                this._loadingService.hide();
                this._isFormSubmitted = false;
                this.containerReportEventService.eventForm.reset();
                AlertHelper.sinisterEventReported(this._reloadPage, this)
            })
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdEventDate, this._onChangeDate, this);
    }

    /**
     * Load the sinister
     */
    private _loadSinister(): void {
        if(!!this.sinisterData) {
            this.containerReportEventService.loadSinister(this.sinisterData);
        }
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ContainerReportEventComponent): void {
        context.containerReportEventService.eventForm.patchValue({[selectorId]: changedValue});
    }

    /**
     * Reload the page
     * @param context The app context
     */
    private _reloadPage(context: ContainerReportEventComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if(!!context.sinisterData) {
            context._router.navigate(['/' + ROUTES_NAME.showSinisterHistory(context.sinisterData.contactId, context.sinisterData.policyId, context.sinisterData.sinisterId)], { relativeTo: context._activatedRoute });
        }
    }
}
