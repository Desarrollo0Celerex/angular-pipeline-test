import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class TiktokService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _workspaceService: WorkspaceService
    ) {}

    loadWorkspace(): Observable<HttpResponse> {
        const fields: string = 'tiktokUrl';
        return this._workspaceService.getWorkspace(fields);
    }

    buildForm(tiktokUrl: string | null): void {
        this.form = this._formBuilder.group({
            tiktokUrl: [
                tiktokUrl !== null ? tiktokUrl : '',
                [Validators.required, ValidatorsHelper.webLinkTiktok],
            ],
        });
        this.isBuiltForm = true;
    }

    updateTiktokUrl(): Observable<void> {
        return this._workspaceService.updateWorkspaceTiktokUrl(
            this.form.get('tiktokUrl')!.value
        );
    }
}
