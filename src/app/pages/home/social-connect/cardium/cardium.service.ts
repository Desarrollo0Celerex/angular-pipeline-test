import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class CardiumService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
      private _formBuilder: FormBuilder,
      private _workspaceService: WorkspaceService,
    ) { }

    loadWorkspace(): Observable<HttpResponse> {
        const fields: string = 'cardiumUrl';
        return this._workspaceService.getWorkspace(fields);
    }

    buildForm(cardiumUrl: string | null): void {
        this.form = this._formBuilder.group({
            cardiumUrl: [(cardiumUrl !== null) ? cardiumUrl : '', [Validators.required, ValidatorsHelper.webLinkCardium ]]
        });
        this.isBuiltForm = true;
    }

    updateCardiumUrl(): Observable<void> {
        return this._workspaceService.updateWorkspaceCardiumUrl(this.form.get('cardiumUrl')!.value);
    }
}
