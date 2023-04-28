import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LONG_ALPHANUMERIC_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { FinalizeSinisterEventDataSend } from '@interfaces/finalize-sinister-event-data-send.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { SinisterEventService } from '@services/sinister-event.service';

@Injectable()
export class ModalFinalizeSinisterEventService {
    form: FormGroup = this._buildForm();

    constructor(
        private _formBuilder: FormBuilder,
        private _sinisterEventService: SinisterEventService
    ) { }

    finalizeSinisterEvent(sinisterEventData: SinisterEventDataSend): Observable<void> {
        const requestBody: FinalizeSinisterEventDataSend = this.form.value;
        return this._sinisterEventService.finalizeSinisterEvent(sinisterEventData, requestBody);
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            finishDate: ['', [Validators.required, ValidatorsHelper.date]],
            finishAmount: ['', [ValidatorsHelper.amount]],
            finishFolio: ['', [ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(30)]],
        });
    }

}
