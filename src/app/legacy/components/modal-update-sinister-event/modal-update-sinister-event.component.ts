import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
    SINISTER_EVENT_TYPES,
    FILE_ALL_FORMATS,
    FILE_TYPES,
    INSURANCE_GROUPS,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { SinisterEvent } from '@interfaces/sinister-event.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { LoadingService } from '@core/services/loading.service';

import { ModalUpdateSinisterEventService } from './modal-update-sinister-event.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-update-sinister-event',
    templateUrl: './modal-update-sinister-event.component.html',
    styles: [],
})
export class ModalUpdateSinisterEventComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() sinisterEventData: SinisterEventDataSend | null = null;
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    SINISTER_EVENT_TYPES: any = SINISTER_EVENT_TYPES;
    calendarIdProviderDate: string = 'providerDate';
    calendarIdValuationDate: string = 'valuationDate';
    calendarIdAuthorizationDate: string = 'authorizationDate';
    calendarIdInsuredNoticeDate: string = 'insuredNoticeDate';
    calendarIdInsuredAuthorizationDate: string = 'insuredAuthorizationDate';
    calendarIdEstimatedDeliveryDate: string = 'estimatedDeliveryDate';
    calendarIdRepairDate: string = 'repairDate';
    calendarIdDeliveryDate: string = 'deliveryDate';
    calendarIdReadmissionDate: string = 'readmissionDate';
    modalIdSelectEventEvidence: string = 'muse-select-event-evidence';
    modalSelectEvidenceData: ModalSelectFileData = {
        title: 'Cargar Evidencia',
        description:
            'Selecciona el formato digital de la evidencia del evento.',
        buttonLabel: 'Cargar evidencia',
        formats: FILE_ALL_FORMATS,
        fileType: FILE_TYPES.MIXED,
    };
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalUpdateSinisterEventService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
            !!changes.sinisterEventData &&
            !!changes.sinisterEventData.currentValue
        ) {
            this._isFormSubmitted = false;
            this.model.isBuiltForm = false;
            this.model.form.reset();
            this._loadSinisterEvent();
        }
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

    loadEventEvidence(evidenceFile: File): void {
        this.showModalToUpdateSinisterEvent();
        this.model.form.patchValue({ evidenceFile });
    }

    /**
     * Click event to close the modal
     */
    onClickCloseModal(): void {
        this._closeModal();
    }

    showModalToSelectEvidence(): void {
        ModalPlugin.hide(this.modalId);
        ModalPlugin.show(this.modalIdSelectEventEvidence);
    }

    showModalToUpdateSinisterEvent(): void {
        setTimeout(() => {
            ModalPlugin.show(this.modalId);
        }, 350);
    }

    updateSinisterEvent(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid && !!this.sinisterEventData) {
            this._loadingService.show();
            this.model
                .updateSinisterEvent(this.sinisterEventData)
                .subscribe(() => {
                    this._loadingService.hide();
                    this._closeModal();
                    AlertHelper.sinisterEventUpdated(this._reloadPage, this);
                });
        }
    }

    updateProviderPhoneCodeId(providerPhoneCodeId: number): void {
        this.model.form.patchValue({ providerPhoneCodeId });
    }

    /**
     * Close the modal
     */
    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        switch (this.model.sinisterEvent!.sinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.WORKSHOP_AND_SERVICE:
                DatePickerPlugin.initElement(
                    this.calendarIdProviderDate,
                    this._onChangeDate,
                    this
                );
                DatePickerPlugin.initElement(
                    this.calendarIdValuationDate,
                    this._onChangeDate,
                    this
                );
                DatePickerPlugin.initElement(
                    this.calendarIdAuthorizationDate,
                    this._onChangeDate,
                    this
                );
                DatePickerPlugin.initElement(
                    this.calendarIdInsuredNoticeDate,
                    this._onChangeDate,
                    this
                );
                DatePickerPlugin.initElement(
                    this.calendarIdInsuredAuthorizationDate,
                    this._onChangeDate,
                    this
                );
                DatePickerPlugin.initElement(
                    this.calendarIdEstimatedDeliveryDate,
                    this._onChangeDate,
                    this
                );
                DatePickerPlugin.initElement(
                    this.calendarIdRepairDate,
                    this._onChangeDate,
                    this
                );
                DatePickerPlugin.initElement(
                    this.calendarIdDeliveryDate,
                    this._onChangeDate,
                    this
                );
                DatePickerPlugin.initElement(
                    this.calendarIdReadmissionDate,
                    this._onChangeDate,
                    this
                );
                break;

            case SINISTER_EVENT_TYPES.INDEMNIFICATION:
                switch (this.model.sinisterEvent!.insuranceGroupId) {
                    case INSURANCE_GROUPS.VEHICLES:
                        DatePickerPlugin.initElement(
                            this.calendarIdProviderDate,
                            this._onChangeDate,
                            this
                        );
                        DatePickerPlugin.initElement(
                            this.calendarIdValuationDate,
                            this._onChangeDate,
                            this
                        );
                        break;

                    default:
                        DatePickerPlugin.initElement(
                            this.calendarIdProviderDate,
                            this._onChangeDate,
                            this
                        );
                }
                break;

            default:
                DatePickerPlugin.initElement(
                    this.calendarIdProviderDate,
                    this._onChangeDate,
                    this
                );
        }
    }

    /**
     * Load the sinister event
     */
    private _loadSinisterEvent(): void {
        if (!!this.sinisterEventData) {
            this.model
                .getSinisterEvent(this.sinisterEventData)
                .subscribe((res: SinisterEvent) => {
                    this.model.fillForm(res);
                    this._initCalendars();
                    switch (res.sinisterEventTypeId) {
                        case SINISTER_EVENT_TYPES.INDEMNIFICATION:
                            this.model.loadSinisterResolutions();
                            this.model.loadCurrencies();
                            this.model.loadPaymentMethods();
                            break;
                    }
                });
        }
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ModalUpdateSinisterEventComponent
    ): void {
        context.model.form.patchValue({ [selectorId]: changedValue });
    }

    /**
     * Reload the page
     * @param context The app context
     */
    private _reloadPage(context: ModalUpdateSinisterEventComponent): void {
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
