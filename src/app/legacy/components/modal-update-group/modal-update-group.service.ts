import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { UpdateGroupDataSend } from '@interfaces/update-group-data-send.interface';
import { GroupService } from '@services/group.service';

@Injectable()
export class ModalUpdateGroupService {
    form: UntypedFormGroup = this._buildForm();

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _groupService: GroupService,
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    checkHasCoincidences(): Observable<boolean> {
        return this._groupService.checkHasCoincidences(this.f.name.value);
    }

    updateGroup(groupId: string): Observable<void> {
        const requestBody: UpdateGroupDataSend = { name: this.f.name.value };
        return this._groupService.updateGroup(groupId, requestBody);
    }

    private _buildForm(): UntypedFormGroup {
        return this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]]
        });
    }
}
