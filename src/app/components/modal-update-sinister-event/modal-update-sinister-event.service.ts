import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    sinisterEventForm: FormGroup = this._buildSinisterEventForm();
    sinisterEventTypes: SinisterEventType[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _sinisterEventService: SinisterEventService,
        private _sinisterEventTypeService: SinisterEventTypeService
    ) { }

    /**
     * Get the sinister event
     * @param  sinisterEventData The sinister event data
     * @return                   The sinister event
     */
    getSinisterEvent(sinisterEventData: SinisterEventDataSend): Observable<HttpResponse> {
        const fields: string = 'eventDate,sinisterEventTypeId,details';
        return this._sinisterEventService.getSinisterEvent(sinisterEventData, fields);
    }

    /**
     * Load the sinister event types
     */
    loadSinisterEventTypes(): void {
        const fields: string = 'sinisterEventTypeId,name';
        this._sinisterEventTypeService.getSinisterEventTypes(fields).subscribe((res: HttpResponse) => {
            this.sinisterEventTypes = res.data;
        })
    }

    /**
     * Populate the sinister event form
     * @param sinisterEvent The sinister event
     */
    populateSinisterEventForm(sinisterEvent: SinisterEvent): void {
        this.sinisterEventForm.patchValue({
            details: sinisterEvent.details,
            eventDate: moment(sinisterEvent.eventDate).format('DD/MM/YYYY'),
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
    private _buildSinisterEventForm(): FormGroup {
        return this._formBuilder.group({
            details: ['', [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]],
            eventDate: ['', [Validators.required, ValidatorsHelper.date]],
            sinisterEventTypeId: ['', [Validators.required]],
        })
    }
}
