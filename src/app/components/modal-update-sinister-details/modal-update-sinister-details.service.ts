import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterType } from '@interfaces/sinister-type.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { UpdateSinisterDetailsDataSend } from '@interfaces/update-sinister-details-data-send.interface';
import { SinisterService } from '@services/sinister.service';
import { SinisterTypeService } from '@services/sinister-type.service';

@Injectable()
export class ModalUpdateSinisterDetailsService {
    sinister: Sinister | null = null;
    form: UntypedFormGroup = this._buildSinisterDetailsForm();
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
    loadSinister(sinisterData: SinisterDataSend): Observable<Sinister> {
        const fields: string = 'sinisterId,sinisterTypeId,affectedCoverage,location,affectedName,insuranceId,timeReport,timeResponse,sinisterCause';
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
        this.form.patchValue({
            timeReport: sinister.timeReport,
            timeResponse: sinister.timeResponse,
            sinisterTypeId: sinister.sinisterTypeId,
            sinisterCause: sinister.sinisterCause,
            affectedCoverage: sinister.affectedCoverage,
            affectedName: sinister.affectedName,
            location: sinister.location,
        })
    }

    /**
     * Load the sinister types
     * @param  insuranceId The insurance ID
     * @return             The sinister
     */
    loadSinisterTypes(insuranceId: number): void {
        const fields: string = 'sinisterTypeId,name';
        this._sinisterTypeService.getSinisterTypes(insuranceId, fields).subscribe((res: HttpResponse) => {
            this.sinisterTypes = res.data;
        });
    }

    /**
     * Update the sinister
     * @param  sinisterData The sinister data
     * @return              Notification of action done
     */
    updateSinisterDetails(sinisterData: SinisterDataSend): Observable<void> {
        const requestBody: UpdateSinisterDetailsDataSend = this.form.value;
        return this._sinisterService.updatePolicySinisterDetails(sinisterData, requestBody);
    }

    /**
     * Build the sinister form
     * @return The sinister form
     */
    private _buildSinisterDetailsForm(): UntypedFormGroup {
        return this._formBuilder.group({
            timeReport: ['', [ValidatorsHelper.time]],
            timeResponse: ['', [ValidatorsHelper.time]],
            sinisterTypeId: ['', [Validators.required]],
            sinisterCause: ['', [Validators.required, ValidatorsHelper.freeText, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(75)]],
            affectedCoverage: ['', [Validators.required, ValidatorsHelper.freeText, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX)]],
            affectedName: ['', [Validators.required, ValidatorsHelper.freeText, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX)]],
            location: ['', [Validators.required, ValidatorsHelper.freeText, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX)]],
        });
    }
}
