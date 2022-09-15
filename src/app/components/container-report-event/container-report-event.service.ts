import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { EMAIL_LENGTH, FILE_NAME_LENGTH, LONG_ALPHANUMERIC_LENGTH, MULTITEXT_LENGTH, SINISTER_EVENT_TYPES, OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterEventType } from '@interfaces/sinister-event-type.interface';
import { SinisterService } from '@services/sinister.service';
import { SinisterEventService } from '@services/sinister-event.service';
import { SinisterEventTypeService } from '@services/sinister-event-type.service';

@Injectable()
export class ContainerReportEventService {
    isBuiltForm: boolean = false;
    sinister: Sinister | null = null;
    sinisterEventTypes: SinisterEventType[] = [];
    form: UntypedFormGroup = this._formBuilder.group({});

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _sinisterService: SinisterService,
        private _sinisterEventService: SinisterEventService,
        private _sinisterEventTypeService: SinisterEventTypeService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    /**
     * Build the event form
     * @return The event form
     */
    buildForm(sinisterEventTypeId: number, providerPhoneCodeId: number): void {
        sinisterEventTypeId = parseInt(sinisterEventTypeId.toString());
        switch(sinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.WORKSHOP_AND_SERVICE:
                this.form = this._formBuilder.group({
                    sinisterEventTypeId: [sinisterEventTypeId, [Validators.required]],
                    canNotifyInsured: [0, [Validators.required]],
                    evidenceName: ['', [Validators.minLength(FILE_NAME_LENGTH.MIN), Validators.maxLength(FILE_NAME_LENGTH.MAX), ValidatorsHelper.fileName]],
                    evidenceFile: [''],
                    providerName: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    providerDate: ['', [Validators.required, ValidatorsHelper.date]],
                    valuationDate: ['', [ValidatorsHelper.date]],
                    authorizationDate: ['', [ValidatorsHelper.date]],
                    insuredNoticeDate: ['', [ValidatorsHelper.date]],
                    insuredAuthorizationDate: ['', [ValidatorsHelper.date]],
                    estimatedDeliveryDate: ['', [ValidatorsHelper.date]],
                    readmissionDate: ['', [ValidatorsHelper.date]],
                    providerFolio: ['', [ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
                    providerBill: ['', [ValidatorsHelper.amount]],
                    providerPhoneCodeId: [providerPhoneCodeId],
                    providerPhoneNumber: ['', [ValidatorsHelper.phoneNumber]],
                    providerEmail: ['', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                    observations: ['', [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]]
                });
            break;

            case SINISTER_EVENT_TYPES.CIVIL_WORK:
            case SINISTER_EVENT_TYPES.CRANES_AND_TRANSFER:
            case SINISTER_EVENT_TYPES.LEGAL_PROCESS:
                this.form = this._formBuilder.group({
                    sinisterEventTypeId: [sinisterEventTypeId, [Validators.required]],
                    canNotifyInsured: [0, [Validators.required]],
                    evidenceName: ['', [Validators.minLength(FILE_NAME_LENGTH.MIN), Validators.maxLength(FILE_NAME_LENGTH.MAX), ValidatorsHelper.fileName]],
                    evidenceFile: [''],
                    providerName: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    providerDate: ['', [Validators.required, ValidatorsHelper.date]],
                    providerFolio: ['', [Validators.required, ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
                    providerBill: ['', [ValidatorsHelper.amount]],
                    providerPhoneCodeId: [providerPhoneCodeId],
                    providerPhoneNumber: ['', [ValidatorsHelper.phoneNumber]],
                    providerEmail: ['', [Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
                    observations: ['', [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]]
                });
            break;

            default:
                this.form = this._formBuilder.group({
                    sinisterEventTypeId: [sinisterEventTypeId, [Validators.required]],
                    canNotifyInsured: [0, [Validators.required]],
                    evidenceName: ['', [Validators.minLength(FILE_NAME_LENGTH.MIN), Validators.maxLength(FILE_NAME_LENGTH.MAX), ValidatorsHelper.fileName]],
                    evidenceFile: [''],
                    providerName: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
                    providerDate: ['', [Validators.required, ValidatorsHelper.date]],
                    observations: ['', [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]]
                });
        }
        this.isBuiltForm = true;
    }

    createSinisterEvent(sinisterData: SinisterDataSend): Observable<void> {
        const requestBody: FormData = this._generateRequestBody();
        return this._sinisterEventService.createSinisterEvent(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, requestBody);
    }

    private _generateRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        const sinisterEventTypeId: number = parseInt(this.f.sinisterEventTypeId.value);
        switch(sinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.WORKSHOP_AND_SERVICE:
                requestBody.set('sinisterEventTypeId', this.f.sinisterEventTypeId.value);
                requestBody.set('canNotifyInsured', this.f.canNotifyInsured.value);
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
            case SINISTER_EVENT_TYPES.LEGAL_PROCESS:
                requestBody.set('sinisterEventTypeId', this.f.sinisterEventTypeId.value);
                requestBody.set('canNotifyInsured', this.f.canNotifyInsured.value);
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

            default:
                requestBody.set('sinisterEventTypeId', this.f.sinisterEventTypeId.value);
                requestBody.set('canNotifyInsured', this.f.canNotifyInsured.value);
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set('providerName', this.f.providerName.value);
                requestBody.set('providerDate', this.f.providerDate.value);
                requestBody.set('observations', this.f.observations.value);
        }
        return requestBody;
    }

    /**
     * Load the sinister
     * @param sinisterData The sinister data
     */
    loadSinister(sinisterData: SinisterDataSend): Observable<Sinister> {
        const fields: string = 'sinisterStatusId,insuranceGroupId,workspaceCountryId';
        return this._sinisterService.getPolicySinister(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, fields).pipe(
            tap((sinister: Sinister) => {
                this.sinister = sinister;
            })
        )
    }

    /**
     * Load the sinister event types
     */
    loadSinisterEventTypes(insuranceGroupId: number): Observable<SinisterEventType> {
        const fields: string = 'sinisterEventTypeId,name';
        return this._sinisterEventTypeService.getSinisterEventTypes(insuranceGroupId, fields).pipe(
            tap((res: SinisterEventType[]) => { this.sinisterEventTypes = res }),
            map((res: SinisterEventType[]) => res[0] )
        );
    }
}
