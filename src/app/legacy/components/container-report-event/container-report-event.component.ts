import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import {
    FILE_TYPES,
    FILE_ALL_FORMATS,
    SINISTER_EVENT_TYPES,
    SINISTER_STATUS,
    INSURANCE_GROUPS,
} from '@constants/global';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterEventType } from '@interfaces/sinister-event-type.interface';
import { LoadingService } from '@core/services/loading.service';

import { ContainerReportEventService } from './container-report-event.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-report-event',
    templateUrl: './container-report-event.component.html',
    styles: [],
})
export class ContainerReportEventComponent implements OnInit {
    @Input() sinisterData: SinisterDataSend | null = null;
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    SINISTER_EVENT_TYPES: any = SINISTER_EVENT_TYPES;
    SINISTER_STATUS: any = SINISTER_STATUS;
    calendarIdProviderDate: string = 'providerDate';
    calendarIdValuationDate: string = 'valuationDate';
    calendarIdAuthorizationDate: string = 'authorizationDate';
    calendarIdInsuredNoticeDate: string = 'insuredNoticeDate';
    calendarIdInsuredAuthorizationDate: string = 'insuredAuthorizationDate';
    calendarIdEstimatedDeliveryDate: string = 'estimatedDeliveryDate';
    calendarIdRepairDate: string = 'repairDate';
    calendarIdDeliveryDate: string = 'deliveryDate';
    calendarIdReadmissionDate: string = 'readmissionDate';
    defaultPhoneCodeId: number = 0;
    modalIdSelectEventEvidence: string = 'agt-select-event-evidence';
    selectedSinisterEventTypeId: number = 0;
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
        public model: ContainerReportEventService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._loadSinister();
    }

    createEvent(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid && !!this.sinisterData) {
            this._loadingService.show();
            this.model.createSinisterEvent(this.sinisterData).subscribe(() => {
                this._loadingService.hide();
                this._isFormSubmitted = false;
                this.model.form.reset();
                AlertHelper.sinisterEventReported(this._reloadPage, this);
            });
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
        this.model.form.patchValue({ evidenceFile });
    }

    rebuildForm(event: any): void {
        this.selectedSinisterEventTypeId = parseInt(event.target.value);
        this._loadSinisterEventData();
    }

    showModalToSelectEvidence(): void {
        ModalPlugin.show(this.modalIdSelectEventEvidence);
    }

    updateProviderPhoneCodeId(providerPhoneCodeId: number): void {
        this.model.form.patchValue({ providerPhoneCodeId });
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        switch (this.selectedSinisterEventTypeId) {
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
    }

    /**
     * Load the sinister
     */
    private _loadSinister(): void {
        if (!!this.sinisterData) {
            this.model
                .loadSinister(this.sinisterData)
                .subscribe((sinister: Sinister) => {
                    if (
                        !!sinister.sinisterStatusId !==
                            SINISTER_STATUS.FINISHED &&
                        !!sinister.insuranceGroupId
                    ) {
                        this.defaultPhoneCodeId = sinister.workspaceCountryId;
                        this.model
                            .loadSinisterEventTypes(
                                this.sinisterData!,
                                sinister.insuranceGroupId
                            )
                            .subscribe(
                                (sinisterEventType: SinisterEventType) => {
                                    this.selectedSinisterEventTypeId =
                                        sinisterEventType.sinisterEventTypeId;
                                    this._loadSinisterEventData();
                                }
                            );
                    }
                });
        }
    }

    private _loadSinisterEventData(): void {
        this.model.buildForm(
            this.selectedSinisterEventTypeId,
            this.defaultPhoneCodeId
        );
        this._initCalendars();

        switch (this.selectedSinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.INDEMNIFICATION:
                this.model.loadSinisterResolutions();
                this.model.loadCurrencies();
                this.model.loadPaymentMethods();
                break;
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
        context: ContainerReportEventComponent
    ): void {
        context.model.form.patchValue({ [selectorId]: changedValue });
    }

    /**
     * Reload the page
     * @param context The app context
     */
    private _reloadPage(context: ContainerReportEventComponent): void {
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
