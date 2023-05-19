import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { GroupService } from '@services/group.service';

@Injectable()
export class ModalCreateGroupService {
    form: UntypedFormGroup = this._buildForm();

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _groupService: GroupService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    checkHasCoincidences(): Observable<boolean> {
        return this._groupService.checkHasCoincidences(this.f.name.value);
    }

    private _buildForm(): UntypedFormGroup {
        return this._formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(OWN_NAME_LENGTH.MIN),
                    Validators.maxLength(OWN_NAME_LENGTH.MAX),
                    ValidatorsHelper.ownName,
                ],
            ],
        });
    }
}
