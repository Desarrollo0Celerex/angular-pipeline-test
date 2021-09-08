import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { CreateSinister } from '@interfaces/create-sinister.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { SinisterType } from '@interfaces/sinister-type.interface';
import { SinisterTypeService } from '@services/sinister-type.service';

import { SHORT_ALPHANUMERIC_LENGTH, LONG_ALPHANUMERIC_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ModalCreateSinisterService {
    sinisterForm: FormGroup = this._buildSinisterForm();
    sinisterTypes: SinisterType[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _sinisterService: SinisterService,
        private _sinisterTypeService: SinisterTypeService
    ) { }

    /**
     * Create a sinister
     * @param  contactId The contact ID
     * @param  policyId  The policy ID
     * @return           Notice of action done
     */
    createSinister(contactId: string, policyId: string): Observable<void> {
        const requestBody: CreateSinister = this.sinisterForm.value;
        return this._sinisterService.createSinister(contactId, policyId, requestBody);
    }

    /**
     * Load the sinister types
     * @param insuranceId The insurance ID
     */
    loadSinisterTypes(insuranceId: number): void {
        const fields: string = 'sinisterTypeId,name';
        this._sinisterTypeService.getSinisterTypes(insuranceId, fields).subscribe( (res: HttpResponse) => {
            this.sinisterTypes = res.data;
        })
    }

    /**
     * Build the sinister form
     * @return The sinister form
     */
    private _buildSinisterForm(): FormGroup {
        return this._formBuilder.group({
            sinisterNumber: ['', [Validators.required, ValidatorsHelper.alphanumericWithHyphens, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
            invoice: ['', [Validators.required, ValidatorsHelper.alphanumericWithHyphens, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
            certificate: ['', [Validators.required, ValidatorsHelper.alphanumericWithHyphens, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX)]],
            sinisterTypeId: ['', [Validators.required]],
            sinisterDate: [moment().format('DD/MM/YYYY'), [Validators.required, ValidatorsHelper.date]]
        });
    }
}
