import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class TwitterService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _workspaceService: WorkspaceService
    ) {}

    loadWorkspace(): Observable<Workspace> {
        const fields: string = 'twitterUrl';
        return this._workspaceService.getWorkspace(fields);
    }

    buildForm(twitterUrl: string | null): void {
        this.form = this._formBuilder.group({
            twitterUrl: [
                twitterUrl !== null ? twitterUrl : '',
                [Validators.required, ValidatorsHelper.webLink],
            ],
        });
        this.isBuiltForm = true;
    }

    updateTwitterUrl(): Observable<void> {
        return this._workspaceService.updateWorkspaceTwitterUrl(
            this.form.get('twitterUrl')!.value
        );
    }
}
