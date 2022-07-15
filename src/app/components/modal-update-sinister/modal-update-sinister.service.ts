import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LONG_ALPHANUMERIC_LENGTH, SHORT_ALPHANUMERIC_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { CreateSinister } from '@interfaces/create-sinister.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterType } from '@interfaces/sinister-type.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterService } from '@services/sinister.service';
import { SinisterTypeService } from '@services/sinister-type.service';

import * as moment from 'moment';

@Injectable()
export class ModalUpdateSinisterService {
    sinister: Sinister | null = null;
    sinisterForm: UntypedFormGroup = this._buildSinisterForm();
    sinisterTypes: SinisterType[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _sinisterService: SinisterService,
        private _sinisterTypeService: SinisterTypeService
    ) { }

    /**
     * Load the sinister
     * @param sinisterData The sinister data
     */
    loadSinister(sinisterData: SinisterDataSend): Observable<HttpResponse> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterTypeId,sinisterDate,insuranceId';
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
            sinisterNumber: sinister.sinisterNumber,
            invoice: sinister.invoice,
            certificate: sinister.certificate,
            sinisterTypeId: sinister.sinisterTypeId,
            sinisterDate: moment(sinister.sinisterDate).format('DD/MM/YYYY')
        })
    }

    /**
     * Load the sinister types
     * @param  insuranceId The insurance ID
     * @return             The sinister
     */
    loadSinisterTypes(insuranceId: number): Observable<void> {
        const fields: string = 'sinisterTypeId,name';
        return this._sinisterTypeService.getSinisterTypes(insuranceId, fields).pipe(
            tap((res: HttpResponse) => {
                this.sinisterTypes = res.data;
            }),
            map(() => {})
        )
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
            sinisterNumber: ['', [Validators.required, ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
            invoice: ['', [Validators.required, ValidatorsHelper.alphanumeric, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
            certificate: ['', [Validators.required, ValidatorsHelper.alphanumeric, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX)]],
            sinisterTypeId: ['', [Validators.required]],
            sinisterDate: ['', [Validators.required, ValidatorsHelper.date]]
        });
    }
}
