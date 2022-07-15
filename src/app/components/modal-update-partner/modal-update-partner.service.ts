import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { UpdatePartnerDataSend } from '@interfaces/update-partner-data-send.interface';
import { PartnerService } from '@services/partner.service';

@Injectable()
export class ModalUpdatePartnerService {
    form: UntypedFormGroup = this._buildForm();

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _partnerService: PartnerService,
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    checkHasCoincidences(): Observable<boolean> {
        return this._partnerService.checkHasCoincidences(this.f.name.value);
    }

    updatePartner(partnerId: number): Observable<void> {
        const requestBody: UpdatePartnerDataSend = { name: this.f.name.value };
        return this._partnerService.updatePartner(partnerId, requestBody);
    }

    private _buildForm(): UntypedFormGroup {
        return this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]]
        });
    }
}
