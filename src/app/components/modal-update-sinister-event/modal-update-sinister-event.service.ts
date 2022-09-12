import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { MULTITEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ReportEventDataSend } from '@interfaces/report-event-data-send.interface';
import { SinisterEvent } from '@interfaces/sinister-event.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { SinisterEventType } from '@interfaces/sinister-event-type.interface';
import { SinisterEventService } from '@services/sinister-event.service';
import { SinisterEventTypeService } from '@services/sinister-event-type.service';

import * as moment from 'moment';

@Injectable()
export class ModalUpdateSinisterEventService {
    sinisterEventForm: UntypedFormGroup = this._buildSinisterEventForm();
    sinisterEventTypes: SinisterEventType[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _sinisterEventService: SinisterEventService,
        private _sinisterEventTypeService: SinisterEventTypeService
    ) { }

    /**
     * Get the sinister event
     * @param  sinisterEventData The sinister event data
     * @return                   The sinister event
     */
    getSinisterEvent(sinisterEventData: SinisterEventDataSend): Observable<HttpResponse> {
        const fields: string = 'providerDate,sinisterEventTypeId,details';
        return this._sinisterEventService.getSinisterEvent(sinisterEventData, fields);
    }

    /**
     * Load the sinister event types
     */
    loadSinisterEventTypes(): void {
        const fields: string = 'sinisterEventTypeId,name';
        const insuranceGroupId: number = 0;
        this._sinisterEventTypeService.getSinisterEventTypes(insuranceGroupId, fields).subscribe((res: SinisterEventType[]) => {
            this.sinisterEventTypes = res;
        })
    }

    /**
     * Populate the sinister event form
     * @param sinisterEvent The sinister event
     */
    populateSinisterEventForm(sinisterEvent: SinisterEvent): void {
        this.sinisterEventForm.patchValue({
            details: sinisterEvent.details,
            providerDate: moment(sinisterEvent.providerDate).format('DD/MM/YYYY'),
            sinisterEventTypeId: sinisterEvent.sinisterEventTypeId
        });
    }

    /**
     * Update the sinister event
     * @param  sinisterEventData The sinister event data
     * @return                   Notice of action done
     */
    updateSinisterEvent(sinisterEventData: SinisterEventDataSend): Observable<void> {
        const requestBody: ReportEventDataSend = this.sinisterEventForm.value;
        return this._sinisterEventService.updateSinisterEvent(sinisterEventData, requestBody);
    }

    /**
     * Build the sinister event form
     * @return The sinister event form
     */
    private _buildSinisterEventForm(): UntypedFormGroup {
        return this._formBuilder.group({
            details: ['', [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]],
            providerDate: ['', [Validators.required, ValidatorsHelper.date]],
            sinisterEventTypeId: ['', [Validators.required]],
        })
    }
}
