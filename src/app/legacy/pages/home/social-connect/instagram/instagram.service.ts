import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class InstagramService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _workspaceService: WorkspaceService
    ) {}

    loadWorkspace(): Observable<Workspace> {
        const fields: string = 'instagramUrl';
        return this._workspaceService.getWorkspace(fields);
    }

    buildForm(instagramUrl: string | null): void {
        this.form = this._formBuilder.group({
            instagramUrl: [
                instagramUrl !== null ? instagramUrl : '',
                [Validators.required, ValidatorsHelper.webLinkInstagram],
            ],
        });
        this.isBuiltForm = true;
    }

    updateInstagramUrl(): Observable<void> {
        return this._workspaceService.updateWorkspaceInstagramUrl(
            this.form.get('instagramUrl')!.value
        );
    }
}
