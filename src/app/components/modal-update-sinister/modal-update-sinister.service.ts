import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LONG_ALPHANUMERIC_LENGTH, SHORT_ALPHANUMERIC_LENGTH, FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { CreateSinister } from '@interfaces/create-sinister.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterType } from '@interfaces/sinister-type.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterService } from '@services/sinister.service';

import * as moment from 'moment';

@Injectable()
export class ModalUpdateSinisterService {
    sinister: Sinister | null = null;
    sinisterForm: UntypedFormGroup = this._buildSinisterForm();
    sinisterTypes: SinisterType[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _sinisterService: SinisterService
    ) { }

    /**
     * Load the sinister
     * @param sinisterData The sinister data
     */
    loadSinister(sinisterData: SinisterDataSend): Observable<HttpResponse> {
        const fields: string = 'sinisterId,internalNumber,manager,sinisterNumber,invoice,sinisterDate,estimatedResolutionDate';
        return this._sinisterService.getPolicySinister(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, fields).pipe(
            tap((res: HttpResponse) => {
                this.sinister = res.data;
            })
        )
    }

    /**
     * Fill the sinister form
     * @param sinister The sinister data
     */
    fillSinisterForm(sinister: Sinister): void {
        this.sinisterForm.patchValue({
            internalNumber: sinister.internalNumber,
            manager: sinister.manager,
            sinisterNumber: sinister.sinisterNumber,
            invoice: sinister.invoice,
            sinisterDate: moment(sinister.sinisterDate).format('DD/MM/YYYY'),
            estimatedResolutionDate: moment(sinister.estimatedResolutionDate).format('DD/MM/YYYY'),
        })
    }

    /**
     * Update the sinister
     * @param  sinisterData The sinister data
     * @return              Notification of action done
     */
    updateSinister(sinisterData: SinisterDataSend): Observable<void> {
        const requestBody: CreateSinister = this.sinisterForm.value;
        return this._sinisterService.updatePolicySinister(sinisterData, requestBody);
    }

    /**
     * Build the sinister form
     * @return The sinister form
     */
    private _buildSinisterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            internalNumber: ['', [Validators.required, ValidatorsHelper.alphanumericWithHyphens, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX)]],
            manager: ['', [Validators.required, ValidatorsHelper.freeText, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX)]],
            sinisterNumber: ['', [Validators.required, ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
            invoice: ['', [Validators.required, ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
            sinisterDate: ['', [Validators.required, ValidatorsHelper.date]],
            estimatedResolutionDate: ['', [Validators.required, ValidatorsHelper.date]]
        });
    }
}
