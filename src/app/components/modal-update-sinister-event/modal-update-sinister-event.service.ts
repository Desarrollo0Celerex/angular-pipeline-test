import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EMAIL_LENGTH, FILE_NAME_LENGTH, LONG_ALPHANUMERIC_LENGTH, MULTITEXT_LENGTH, OWN_NAME_LENGTH, SINISTER_EVENT_TYPES } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { ReportEventDataSend } from '@interfaces/report-event-data-send.interface';
import { SinisterEvent } from '@interfaces/sinister-event.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { SinisterEventService } from '@services/sinister-event.service';

@Injectable()
export class ModalUpdateSinisterEventService {
    isBuiltForm: boolean = false;
    form: UntypedFormGroup = this._formBuilder.group({});
    sinisterEvent: SinisterEvent | null = null;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _sinisterEventService: SinisterEventService,
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    /**
     * Get the sinister event
     * @param  sinisterEventData The sinister event data
     * @return                   The sinister event
     */
    getSinisterEvent(sinisterEventData: SinisterEventDataSend): Observable<SinisterEvent> {
        const fields: string = 'sinisterEventTypeId,evidenceName,providerName,providerDate,valuationDate,authorizationDate,insuredNoticeDate,insuredAuthorizationDate,estimatedDeliveryDate,readmissionDate,providerFolio,providerBill,providerPhoneCodeId,providerPhoneNumber,providerEmail,observations';
        return this._sinisterEventService.getSinisterEvent(sinisterEventData, fields).pipe(
            tap((res: SinisterEvent) => {
                this.sinisterEvent = res;
            })
        );
    }

    /**
     * Populate the sinister event form
     * @param sinisterEvent The sinister event
     */
    fillForm(sinisterEvent: SinisterEvent): void {
        sinisterEvent.sinisterEventTypeId = parseInt(sinisterEvent.sinisterEventTypeId.toString());
        switch(sinisterEvent.sinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.WORKSHOP_AND_SERVICE:
                this.form = this._formBuilder.group({
                    evidenceName: [sinisterEvent.evidenceName, [Validators.minLength(FILE_NAME_LENGTH.MIN), Validators.maxLength(FILE_NAME_LENGTH.MAX), ValidatorsHelper.fileName]],
                    evidenceFile: [''],
                    providerName: [sinisterEvent.providerName, [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    providerDate: [sinisterEvent.providerDate, [Validators.required, ValidatorsHelper.date]],
                    valuationDate: [sinisterEvent.valuationDate, [ValidatorsHelper.date]],
                    authorizationDate: [sinisterEvent.authorizationDate, [ValidatorsHelper.date]],
                    insuredNoticeDate: [sinisterEvent.insuredNoticeDate, [ValidatorsHelper.date]],
                    insuredAuthorizationDate: [sinisterEvent.insuredAuthorizationDate, [ValidatorsHelper.date]],
                    estimatedDeliveryDate: [sinisterEvent.estimatedDeliveryDate, [ValidatorsHelper.date]],
                    readmissionDate: [sinisterEvent.readmissionDate, [ValidatorsHelper.date]],
                    providerFolio: [sinisterEvent.providerFolio, [ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
                    providerBill: [sinisterEvent.providerBill, [ValidatorsHelper.amount]],
                    providerPhoneCodeId: [sinisterEvent.providerPhoneCodeId],
                    providerPhoneNumber: [sinisterEvent.providerPhoneNumber, [ValidatorsHelper.phoneNumber]],
                    providerEmail: [sinisterEvent.providerEmail, [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                    observations: [sinisterEvent.observations, [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]]
                });
            break;

            case SINISTER_EVENT_TYPES.CIVIL_WORK:
            case SINISTER_EVENT_TYPES.CRANES_AND_TRANSFER:
                this.form = this._formBuilder.group({
                    evidenceName: [sinisterEvent.evidenceName, [Validators.minLength(FILE_NAME_LENGTH.MIN), Validators.maxLength(FILE_NAME_LENGTH.MAX), ValidatorsHelper.fileName]],
                    evidenceFile: [''],
                    providerName: [sinisterEvent.providerName, [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    providerDate: [sinisterEvent.providerDate, [Validators.required, ValidatorsHelper.date]],
                    providerFolio: [sinisterEvent.providerFolio, [ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
                    providerBill: [sinisterEvent.providerBill, [ValidatorsHelper.amount]],
                    providerPhoneCodeId: [sinisterEvent.providerPhoneCodeId],
                    providerPhoneNumber: [sinisterEvent.providerPhoneNumber, [ValidatorsHelper.phoneNumber]],
                    providerEmail: [sinisterEvent.providerEmail, [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                    observations: [sinisterEvent.observations, [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]]
                });
            break;

            case SINISTER_EVENT_TYPES.LEGAL_PROCESS:
                this.form = this._formBuilder.group({
                    evidenceName: [sinisterEvent.evidenceName, [Validators.minLength(FILE_NAME_LENGTH.MIN), Validators.maxLength(FILE_NAME_LENGTH.MAX), ValidatorsHelper.fileName]],
                    evidenceFile: [''],
                    providerName: [sinisterEvent.providerName, [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    providerDate: [sinisterEvent.providerDate, [Validators.required, ValidatorsHelper.date]],
                    providerFolio: [sinisterEvent.providerFolio, [ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
                    providerPhoneCodeId: [sinisterEvent.providerPhoneCodeId],
                    providerPhoneNumber: [sinisterEvent.providerPhoneNumber, [ValidatorsHelper.phoneNumber]],
                    providerEmail: [sinisterEvent.providerEmail, [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                    observations: [sinisterEvent.observations, [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]]
                });
            break;

            default:
                this.form = this._formBuilder.group({
                    evidenceName: [sinisterEvent.evidenceName, [Validators.minLength(FILE_NAME_LENGTH.MIN), Validators.maxLength(FILE_NAME_LENGTH.MAX), ValidatorsHelper.fileName]],
                    evidenceFile: [''],
                    providerName: [sinisterEvent.providerName, [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    providerDate: [sinisterEvent.providerDate, [Validators.required, ValidatorsHelper.date]],
                    observations: [sinisterEvent.observations, [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]]
                });
        }
        this.isBuiltForm = true;
    }

    /**
     * Update the sinister event
     * @param  sinisterEventData The sinister event data
     * @return                   Notice of action done
     */
    updateSinisterEvent(sinisterEventData: SinisterEventDataSend): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._sinisterEventService.updateSinisterEvent(sinisterEventData, requestBody);
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        this.sinisterEvent!.sinisterEventTypeId = parseInt(this.sinisterEvent!.sinisterEventTypeId.toString());
        switch(this.sinisterEvent!.sinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.WORKSHOP_AND_SERVICE:
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set('providerName', this.f.providerName.value);
                requestBody.set('providerDate', this.f.providerDate.value);
                requestBody.set('valuationDate', this.f.valuationDate.value);
                requestBody.set('authorizationDate', this.f.authorizationDate.value);
                requestBody.set('insuredNoticeDate', this.f.insuredNoticeDate.value);
                requestBody.set('insuredAuthorizationDate', this.f.insuredAuthorizationDate.value);
                requestBody.set('estimatedDeliveryDate', this.f.estimatedDeliveryDate.value);
                requestBody.set('readmissionDate', this.f.readmissionDate.value);
                requestBody.set('providerFolio', this.f.providerFolio.value);
                requestBody.set('providerBill', this.f.providerBill.value);
                requestBody.set('providerPhoneCodeId', this.f.providerPhoneCodeId.value);
                requestBody.set('providerPhoneNumber', this.f.providerPhoneNumber.value);
                requestBody.set('providerEmail', this.f.providerEmail.value);
                requestBody.set('observations', this.f.observations.value);
            break;

            case SINISTER_EVENT_TYPES.CIVIL_WORK:
            case SINISTER_EVENT_TYPES.CRANES_AND_TRANSFER:
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set('providerName', this.f.providerName.value);
                requestBody.set('providerDate', this.f.providerDate.value);
                requestBody.set('providerFolio', this.f.providerFolio.value);
                requestBody.set('providerBill', this.f.providerBill.value);
                requestBody.set('providerPhoneCodeId', this.f.providerPhoneCodeId.value);
                requestBody.set('providerPhoneNumber', this.f.providerPhoneNumber.value);
                requestBody.set('providerEmail', this.f.providerEmail.value);
                requestBody.set('observations', this.f.observations.value);
            break;

            case SINISTER_EVENT_TYPES.LEGAL_PROCESS:
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set('providerName', this.f.providerName.value);
                requestBody.set('providerDate', this.f.providerDate.value);
                requestBody.set('providerFolio', this.f.providerFolio.value);
                requestBody.set('providerPhoneCodeId', this.f.providerPhoneCodeId.value);
                requestBody.set('providerPhoneNumber', this.f.providerPhoneNumber.value);
                requestBody.set('providerEmail', this.f.providerEmail.value);
                requestBody.set('observations', this.f.observations.value);
            break;

            default:
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set('providerName', this.f.providerName.value);
                requestBody.set('providerDate', this.f.providerDate.value);
                requestBody.set('observations', this.f.observations.value);
        }
        return requestBody;
    }
}
