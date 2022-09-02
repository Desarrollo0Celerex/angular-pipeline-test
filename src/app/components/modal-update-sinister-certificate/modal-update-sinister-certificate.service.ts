import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SHORT_ALPHANUMERIC_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { UpdateSinisterCertificateDataSend } from '@interfaces/update-sinister-certificate-data-send.interface';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ModalUpdateSinisterCertificateService {
    form: FormGroup = this._buildForm();

    constructor(
        private _formBuilder: FormBuilder,
        private _sinisterService: SinisterService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    updatePolicySinisterCertificate(sinisterData: SinisterDataSend): Observable<string> {
        const requestBody: UpdateSinisterCertificateDataSend = this.form.value;
        return this._sinisterService.updatePolicySinisterCertificate(sinisterData, requestBody);
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            certificate: ['', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]]
        });
    }
}
