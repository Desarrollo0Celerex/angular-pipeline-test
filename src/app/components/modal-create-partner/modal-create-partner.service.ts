import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { PartnerService } from '@services/partner.service';

@Injectable()
export class ModalCreatePartnerService {
    form: UntypedFormGroup = this._buildForm();

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _partnerService: PartnerService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    checkHasCoincidences(): Observable<boolean> {
        return this._partnerService.checkHasCoincidences(this.f.name.value);
    }

    private _buildForm(): UntypedFormGroup {
        return this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]]
        })
    }
}
