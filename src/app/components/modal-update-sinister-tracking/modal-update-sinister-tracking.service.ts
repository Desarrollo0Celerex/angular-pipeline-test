import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { UpdateSinisterTrackingDataSend } from '@interfaces/update-sinister-tracking-data-send.interface';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ModalUpdateSinisterTrackingService {
    form: FormGroup = this._buildForm();
    sinister: Sinister | null = null;

    constructor(
        private _formBuilder: FormBuilder,
        private _sinisterService: SinisterService
    ) { }

    loadSinister(sinisterData: SinisterDataSend): Observable<Sinister> {
        const fields: string = 'sinisterId,notificationDate,sinisterDate,estimatedResolutionDate';
        return this._sinisterService.getPolicySinister(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, fields).pipe(
            tap((res: Sinister) => {
                this.sinister = res;
            })
        )
    }

    populateForm(sinister: Sinister): void {
        this.form.patchValue({
            notificationDate: sinister.notificationDate,
            sinisterDate: sinister.sinisterDate,
            estimatedResolutionDate: sinister.estimatedResolutionDate
        })
    }

    updateSinisterTracking(sinisterData: SinisterDataSend): Observable<void> {
        const requestBody: UpdateSinisterTrackingDataSend = this.form.value;
        return this._sinisterService.updatePolicySinisterTracking(sinisterData, requestBody);
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            notificationDate: ['', [Validators.required, ValidatorsHelper.date]],
            sinisterDate: ['', [Validators.required, ValidatorsHelper.date]],
            estimatedResolutionDate: ['', [Validators.required, ValidatorsHelper.date]]
        })
    }
}
