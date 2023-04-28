import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import {
    SINISTER_STATUS_OPEN,
    FILE_ALL_FORMATS,
    FILE_TYPES,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@core/services/loading.service';

import { ReactivateSinisterService } from './reactivate-sinister.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-reactivate-sinister',
    templateUrl: './reactivate-sinister.page.html',
    styles: [],
})
export class ReactivateSinisterPage implements OnInit {
    calendarIdReactivationDate: string = 'reactivationDate';
    contactDetailsMessage: string =
        'Confirma los datos para reactivar el siniestro de';
    modalIdUploadEvidence: string = 'agt-upload-evidence';
    modalSelectFileData: ModalSelectFileData = {
        title: 'Adjuntar Evidencia',
        description:
            'Selecciona el formato digital de la evidencia del siniestro.',
        buttonLabel: 'Cargar evidencia',
        formats: FILE_ALL_FORMATS,
        fileType: FILE_TYPES.MIXED,
    };
    sinisterData: SinisterDataSend | null = null;
    private _isFormSubmitted: boolean = false;

    constructor(
        public reactivateSinisterService: ReactivateSinisterService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._loadSinister();
        this.reactivateSinisterService.loadSinisterReactivations();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.reactivateSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.reactivateSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    /**
     * Click event to show modal to upload evidence
     */
    onClickUploadEvidence(): void {
        ModalPlugin.show(this.modalIdUploadEvidence);
    }

    /**
     * Event to save the selected file
     * @param file The selected file
     */
    onFileSelected(file: File): void {
        this.reactivateSinisterService.sinisterForm.patchValue({
            evidenceFile: file,
        });
    }

    /**
     * Submit event to reactivate sinister
     */
    onSubmitReactivateSinister(): void {
        this._isFormSubmitted = true;
        if (
            this.reactivateSinisterService.sinisterForm.valid &&
            !!this.sinisterData
        ) {
            this._loadingService.show();
            this.reactivateSinisterService
                .reactivateSinister(this.sinisterData)
                .subscribe(() => {
                    this._loadingService.hide();
                    AlertHelper.sinisterReactivated(
                        this._goToContactActiveSinisters,
                        this
                    );
                });
        }
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.sinisterData = {
            contactId: this._activatedRoute.snapshot.params.contactId || '',
            policyId: this._activatedRoute.snapshot.params.policyId || '',
            sinisterId: this._activatedRoute.snapshot.params.sinisterId || '',
        };
    }

    /**
     * Navigate to the finished sinisters of the contact
     * @param context The app context
     */
    private _goToContactActiveSinisters(context: ReactivateSinisterPage): void {
        if (!!context.sinisterData) {
            context._router.navigate(
                [
                    '/' +
                        ROUTES_NAME.listContactSinisters(
                            context.sinisterData.contactId
                        ),
                ],
                { queryParams: { contentSubtype: SINISTER_STATUS_OPEN } }
            );
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdReactivationDate,
            this._onChangeDate,
            this
        );
    }

    /**
     * Load the sinister
     */
    private _loadSinister(): void {
        if (!!this.sinisterData) {
            this.reactivateSinisterService
                .loadSinister(this.sinisterData)
                .subscribe(() => {
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
    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ReactivateSinisterPage
    ): void {
        context.reactivateSinisterService.sinisterForm.patchValue({
            [selectorId]: changedValue,
        });
    }
}
