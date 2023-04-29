import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class LinkedinService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _workspaceService: WorkspaceService
    ) {}

    loadWorkspace(): Observable<Workspace> {
        const fields: string = 'linkedinUrl';
        return this._workspaceService.getWorkspace(fields);
    }

    buildForm(linkedinUrl: string | null): void {
        this.form = this._formBuilder.group({
            linkedinUrl: [
                linkedinUrl !== null ? linkedinUrl : '',
                [Validators.required, ValidatorsHelper.webLinkLinkedin],
            ],
        });
        this.isBuiltForm = true;
    }

    updateLinkedinUrl(): Observable<void> {
        return this._workspaceService.updateWorkspaceLinkedinUrl(
            this.form.get('linkedinUrl')!.value
        );
    }
}
