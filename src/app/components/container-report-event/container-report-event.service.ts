import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { MULTITEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ReportEventDataSend } from '@interfaces/report-event-data-send.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterEventType } from '@interfaces/sinister-event-type.interface';
import { SinisterService } from '@services/sinister.service';
import { SinisterEventService } from '@services/sinister-event.service';
import { SinisterEventTypeService } from '@services/sinister-event-type.service';

@Injectable()
export class ContainerReportEventService {
    sinister: Sinister | null = null;
    sinisterEventTypes: SinisterEventType[] = [];
    eventForm: UntypedFormGroup = this._buildEventForm();

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _sinisterService: SinisterService,
        private _sinisterEventService: SinisterEventService,
        private _sinisterEventTypeService: SinisterEventTypeService
    ) { }

    /**
     * Load the sinister
     * @param sinisterData The sinister data
     */
    loadSinister(sinisterData: SinisterDataSend): void {
        const fields: string = 'sinisterStatusId';
        this._sinisterService.getPolicySinister(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, fields).subscribe((res: Sinister) => {
            this.sinister = res;
        });
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
     * Report the sinister event
     * @param  sinisterData The sinister data
     * @return              Notification of action done
     */
    reportSinisterEvent(sinisterData: SinisterDataSend): Observable<void> {
        const requestBody: ReportEventDataSend = this.eventForm.value;
        return this._sinisterEventService.reportSinisterEvent(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, requestBody);
    }

    /**
     * Build the event form
     * @return The event form
     */
    private _buildEventForm(): UntypedFormGroup {
        return this._formBuilder.group({
            details: ['', [Validators.required, Validators.minLength(MULTITEXT_LENGTH.MIN), Validators.maxLength(MULTITEXT_LENGTH.MAX), ValidatorsHelper.multitext]],
            eventDate: ['', [Validators.required, ValidatorsHelper.date]],
            sinisterEventTypeId: ['', [Validators.required]],
        });
    }
}
