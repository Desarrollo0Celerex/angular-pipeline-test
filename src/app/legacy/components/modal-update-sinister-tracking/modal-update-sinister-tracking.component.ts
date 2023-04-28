import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@core/services/loading.service';

import { ModalUpdateSinisterTrackingService } from './modal-update-sinister-tracking.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-update-sinister-tracking',
    templateUrl: './modal-update-sinister-tracking.component.html',
    styles: [],
    providers: [ModalUpdateSinisterTrackingService],
})
export class ModalUpdateSinisterTrackingComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;
    calendarIdEstimatedResolutionDate: string = 'estimatedResolutionDate';
    calendarIdNotificationDate: string = 'notificationDate';
    calendarIdSinisterDate: string = 'sinisterDate';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalUpdateSinisterTrackingService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._loadSinister();
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

    updateSinisterTracking(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid && !!this.sinisterData) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            this.model
                .updateSinisterTracking(this.sinisterData)
                .subscribe(() => {
                    this._loadingService.hide();
                    AlertHelper.sinisterTrackingUpdated(this._reloadPage, this);
                });
        }
    }

    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdEstimatedResolutionDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdNotificationDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdSinisterDate,
            this._onChangeDate,
            this
        );
    }

    private _loadSinister(): void {
        if (this.sinisterData) {
            this.model
                .loadSinister(this.sinisterData)
                .subscribe((res: Sinister) => {
                    this.model.populateForm(res);
                    this._initCalendars();
                });
        }
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ModalUpdateSinisterTrackingComponent
    ): void {
        context.model.form.patchValue({ [selectorId]: changedValue });
    }

    private _reloadPage(context: ModalUpdateSinisterTrackingComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if (!!context.sinisterData) {
            context._router.navigate(
                [
                    '/' +
                        ROUTES_NAME.showSinisterHistory(
                            context.sinisterData.contactId,
                            context.sinisterData.policyId,
                            context.sinisterData.sinisterId
                        ),
                ],
                { relativeTo: context._activatedRoute }
            );
        }
    }
}
