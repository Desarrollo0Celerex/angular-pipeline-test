import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { CreatePartnerDataSend } from '@interfaces/create-partner-data-send.interface';
import { PartnerService } from '@services/partner.service';

@Injectable()
export class ModalCreatePartnerService {
    form: FormGroup = this._buildForm();

    constructor(
        private _formBuilder: FormBuilder,
        private _partnerService: PartnerService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    createPartner(): Observable<void> {
        const requestBody: CreatePartnerDataSend = { name: this.f.name.value };
        return this._partnerService.createPartner(requestBody)
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]]
        })
    }
}
