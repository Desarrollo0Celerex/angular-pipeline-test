import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { Currency } from '@interfaces/currency.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterResolution } from '@interfaces/sinister-resolution.interface';
import { CurrencyService } from '@services/currency.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterResolutionService } from '@services/sinister-resolution.service';

@Injectable()
export class FinalizeSinisterService {
    currencies: Currency[] = [];
    sinister: Sinister | null = null;
    sinisterResolutions: SinisterResolution[] = [];
    sinisterForm: UntypedFormGroup = this._buildSinisterForm();

    constructor(
        private _currencyService: CurrencyService,
        private _formBuilder: UntypedFormBuilder,
        private _sinisterService: SinisterService,
        private _sinisterResolutionService: SinisterResolutionService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.sinisterForm.controls;
    }

    /**
     * Finalize the sinister
     * @param  sinisterData The sinister data
     * @return              Notification of action done
     */
    finalizeSinister(sinisterData: SinisterDataSend): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._sinisterService.finalizeSinister(
            sinisterData.contactId,
            sinisterData.policyId,
            sinisterData.sinisterId,
            requestBody
        );
    }

    /**
     * Load the sinister data
     * @param sinisterData The sinister data
     * @return             Notification of action done
     */
    loadSinister(sinisterData: SinisterDataSend): Observable<void> {
        const fields: string =
            'coveredProperty,policyNumber,clientNumber,insurerName,sinisterDate,sinisterNumber,invoice,certificate';
        return this._sinisterService
            .getPolicySinister(
                sinisterData.contactId,
                sinisterData.policyId,
                sinisterData.sinisterId,
                fields
            )
            .pipe(
                tap((res: Sinister) => {
                    this.sinister = res;
                }),
                map(() => {})
            );
    }

    /**
     * Build the sinister form
     * @return The sinister form
     */
    private _buildSinisterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            evidenceFile: [''],
            resolutionDate: ['', [Validators.required, ValidatorsHelper.date]],
        });
    }

    /**
     * Get the request body
     * @return The request body
     */
    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('resolutionDate', this.f.resolutionDate.value);
        return requestBody;
    }
}
