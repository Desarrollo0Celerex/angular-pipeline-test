import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ValidatorsHelper } from '@helpers/validators.helper';

@Injectable()
export class ModalActivateWorkspaceService {
    licenseForm: UntypedFormGroup;

    constructor(private _formBuilder: UntypedFormBuilder) {
        this.licenseForm = this._buildLicenseForm();
    }

    /**
     * Build the license form
     * @return License form
     */
    private _buildLicenseForm(): UntypedFormGroup {
        return this._formBuilder.group({
            licenseCode: ['', [Validators.required, ValidatorsHelper.licenseCode]]
        })
    }
}
