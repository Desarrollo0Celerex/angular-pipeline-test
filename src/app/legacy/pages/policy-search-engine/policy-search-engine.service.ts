import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class PolicySearchEngineService {
    form: FormGroup = this._buildForm();

    constructor(
        private _formBuilder: FormBuilder,
        private _policyService: PolicyService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    searchWorkspacePolicy(): Observable<HttpResponse> {
        return this._policyService.searchWorkspacePolicy(
            this.f.workspaceId.value,
            this.f.policyNumber.value
        );
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            workspaceId: ['', [Validators.required]],
            policyNumber: ['', [Validators.required]],
        });
    }
}
