import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import {
    SINISTER_STATUS,
    FILE_ALL_FORMATS,
    FILE_TYPES,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { FinalizeSinisterService } from './finalize-sinister.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-finalize-sinister',
    templateUrl: './finalize-sinister.page.html',
    styles: [],
})
export class FinalizeSinisterPage implements OnInit {
    calendarIdResolutionDate: string = 'resolutionDate';
    contactDetailsMessage: string =
        'Confirma los datos para finalizar el siniestro de';
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
        public finalizeSinisterService: FinalizeSinisterService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._loadSinister();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.finalizeSinisterService.sinisterForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.finalizeSinisterService.sinisterForm.get(constrolName);
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
        this.finalizeSinisterService.sinisterForm.patchValue({
            evidenceFile: file,
        });
    }

    /**
     * Submit event to finalize the sinister
     */
    onSubmitFinalizeSinister(): void {
        this._isFormSubmitted = true;
        if (
            this.finalizeSinisterService.sinisterForm.valid &&
            !!this.sinisterData
        ) {
            this._loadingService.show();
            this.finalizeSinisterService
                .finalizeSinister(this.sinisterData)
                .subscribe(() => {
                    this._loadingService.hide();
                    AlertHelper.sinisterFinished(
                        this._goToContactFinishedSinisters,
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
    private _goToContactFinishedSinisters(context: FinalizeSinisterPage): void {
        if (!!context.sinisterData) {
            context._router.navigate(
                [
                    '/' +
                        ROUTES_NAME.listContactSinisters(
                            context.sinisterData.contactId
                        ),
                ],
                { queryParams: { contentSubtype: SINISTER_STATUS.FINISHED } }
            );
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdResolutionDate,
            this._onChangeDate,
            this
        );
    }

    /**
     * Load the sinister
     */
    private _loadSinister(): void {
        if (!!this.sinisterData) {
            this.finalizeSinisterService
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
        context: FinalizeSinisterPage
    ): void {
        context.finalizeSinisterService.sinisterForm.patchValue({
            [selectorId]: changedValue,
        });
    }
}
