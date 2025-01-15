import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalFinalizeSinisterEventService } from './modal-finalize-sinister-event.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-finalize-sinister-event',
    templateUrl: './modal-finalize-sinister-event.component.html',
    styles: [],
    providers: [ModalFinalizeSinisterEventService],
    standalone: false
})
export class ModalFinalizeSinisterEventComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() sinisterEventData: SinisterEventDataSend | null = null;
    calendarIdFinishDate: string = 'finishDate';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalFinalizeSinisterEventService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._initCalendars();
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

    finalizeSinisterEvent(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid && !!this.sinisterEventData) {
            this._loadingService.show();
            this.model
                .finalizeSinisterEvent(this.sinisterEventData)
                .subscribe(() => {
                    this._loadingService.hide();
                    this._closeModal();
                    AlertHelper.sinisterEventFinalized(this._reloadPage, this);
                });
        }
    }

    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdFinishDate,
            this._onChangeDate,
            this
        );
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ModalFinalizeSinisterEventComponent
    ): void {
        context.model.form.patchValue({ [selectorId]: changedValue });
    }

    private _reloadPage(context: ModalFinalizeSinisterEventComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if (!!context.sinisterEventData) {
            context._router.navigate(
                [
                    '/' +
                        ROUTES_NAME.showSinisterHistory(
                            context.sinisterEventData.contactId,
                            context.sinisterEventData.policyId,
                            context.sinisterEventData.sinisterId
                        ),
                ],
                { relativeTo: context._activatedRoute }
            );
        }
    }
}
