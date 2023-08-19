import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class FacebookService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _workspaceService: WorkspaceService
    ) {}

    loadWorkspace(): Observable<Workspace> {
        const fields: string = 'facebookUrl';
        return this._workspaceService.getWorkspace(fields);
    }

    buildForm(facebookUrl: string | null): void {
        this.form = this._formBuilder.group({
            facebookUrl: [
                facebookUrl !== null ? facebookUrl : '',
                [Validators.required, ValidatorsHelper.webLink],
            ],
        });
        this.isBuiltForm = true;
    }

    updateFacebookUrl(): Observable<void> {
        return this._workspaceService.updateWorkspaceFacebookUrl(
            this.form.get('facebookUrl')!.value
        );
    }
}
