import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LONG_ALPHANUMERIC_LENGTH, SHORT_ALPHANUMERIC_LENGTH, FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { UpdateSinisterReportDataSend } from '@interfaces/update-sinister-report-data-send.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterType } from '@interfaces/sinister-type.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ModalUpdateSinisterReportService {
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
    loadSinister(sinisterData: SinisterDataSend): Observable<Sinister> {
        const fields: string = 'sinisterId,internalNumber,manager,sinisterNumber,invoice';
        return this._sinisterService.getPolicySinister(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, fields).pipe(
            tap((res: Sinister) => {
                this.sinister = res;
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
            invoice: sinister.invoice
        })
    }

    /**
     * Update the sinister
     * @param  sinisterData The sinister data
     * @return              Notification of action done
     */
    updateSinister(sinisterData: SinisterDataSend): Observable<void> {
        const requestBody: UpdateSinisterReportDataSend = this.sinisterForm.value;
        return this._sinisterService.updatePolicySinisterReport(sinisterData, requestBody);
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
        });
    }
}
